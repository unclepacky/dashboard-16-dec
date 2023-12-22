import { searchParamsProps } from '@/app/lib/interfaces';
import { isKeyOfUnit } from '@/app/lib/type-guard';
import ListUnitsV2 from '@/app/ui/dashboard/dummy/ListUnits-v2';
import StatusSelect from '@/app/ui/dashboard/dummy/StatusSelect';
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

export default async function DummyPage({ searchParams }: searchParamsProps) {
  const statuses = Object.values(UnitStatus);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy =
    searchParams.orderBy && isKeyOfUnit(searchParams.orderBy)
      ? { [searchParams.orderBy]: 'asc' }
      : undefined;

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
    },
  });

  return (
    <>
      <StatusSelect status={searchParams.status || undefined} />
      <div>Dummy Page: query is: {searchParams.status}</div>
      <ListUnitsV2 units={units} searchParams={searchParams} />
    </>
  );
}

// import ListUnits from '@/app/ui/dashboard/dummy/ListUnits';
// import StatusSelect from '@/app/ui/dashboard/dummy/StatusSelect';
// import prisma from '@/prisma/client';
// import React from 'react';

// interface Props {
//   searchParams: {
//     query?: string;
//   };
// }

// export default async function DummyPage({ searchParams }: Props) {
//   const units = await prisma.unit.findMany();
//   console.log(searchParams);
//   return (
//     <>
//       <StatusSelect />
//       <div>Dummy Page: query is: {searchParams.query}</div>
//       <ListUnits query={searchParams.query || ''} />
//     </>
//   );
// }
