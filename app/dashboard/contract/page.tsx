import { searchParamsProps } from '@/app/lib/interfaces';
import { isKeyOfUnit } from '@/app/lib/type-guard';
import ListUnitsV2 from '@/app/ui/dashboard/dummy/ListUnits-v2';
import StatusSelect from '@/app/ui/dashboard/dummy/StatusSelect';
import ContractsNav from '@/app/ui/dashboard/settings/ClientForm/ContractsNav';
import ListActiveContracts from '@/app/ui/dashboard/settings/ClientForm/ListActiveContracts';
import ListVacantUnits from '@/app/ui/dashboard/settings/ClientForm/ListVacantUnits';
import Pagination from '@/app/ui/invoices/pagination-original';
import prisma from '@/prisma/client';
import { Unit, UnitStatus } from '@prisma/client';
import React from 'react';

// interface searchParamsProps {
//   searchParams: {
//     status: UnitStatus;
//     orderBy: keyof Unit;
//   };
// }

export default async function ContractsPage({
  searchParams,
}: searchParamsProps) {
  //   const statuses = Object.values(UnitStatus);
  //   const status = statuses.includes(searchParams.status)
  //     ? searchParams.status
  //     : undefined;
  const status: UnitStatus = 'VACANT';

  let orderBy =
    searchParams.orderBy && isKeyOfUnit(searchParams.orderBy)
      ? { [searchParams.orderBy]: 'asc' }
      : undefined;

  if (!searchParams.orderBy) {
    orderBy = { ['name']: 'asc' };
  }

  // const orderBy = searchParams.orderBy
  //   ? { [searchParams.orderBy]: 'asc' }
  //   : undefined;

  const units = await prisma.unit.findMany({
    where: {
      status: status,
    },
    orderBy: orderBy,
    include: {
      building: true,
      currency: true,
    },
  });

  const contracts = await prisma.contract.findMany({
    where: {
      type: 'ACTIVE',
    },
    include: {
      currency: true,
      unit: true,
      customer: true,
    },
  });

  return (
    <>
      {/* <StatusSelect status={searchParams.status || undefined} /> */}
      <ContractsNav />
      {/* <ListUnitsV2 units={units} searchParams={searchParams} /> */}
      <ListVacantUnits units={units} searchParams={searchParams} />
      <ListActiveContracts contracts={contracts} searchParams={searchParams} />
    </>
  );
}
