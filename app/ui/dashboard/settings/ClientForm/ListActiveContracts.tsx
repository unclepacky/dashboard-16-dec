import React from 'react';
import CreateUnitContract from './create-contract';
import { ArrowUpIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import {
  Block,
  Contract,
  ContractType,
  CustomerStatus,
  Unit,
  UnitStatus,
  UnitType,
} from '@prisma/client';
import ReleaseContract from './release-contract';

// interface Props {
//   contracts: ({
//     unit: {
//       id: string;
//       name: string;
//       type: UnitType;
//       status: UnitStatus;
//       block: Block;
//       monthlyRate: number;
//       dailyRate: number;
//       currencyId: string;
//       buildingId: string;
//     };
//     currency: {
//       id: string;
//       code: string;
//       createdAt: Date;
//     };
//     customer: {
//       id: string;
//       name: string;
//       status: CustomerStatus;
//     } | null;
//   } & {
//     id: string;
//     type: ContractType;
//     startDate: Date;
//     endDate: Date;
//     deposit: number;
//     amount: number;
//     currencyId: string;
//     unitId: string;
//     customerId: string | null;
//     createdAt: Date;
//   })[];
//   searchParams: {
//     status?: UnitStatus;
//     orderBy?: keyof Unit;
//   };
// }

// A simpler implementation of the Interface than above
interface UnitProps {
  id: string;
  name: string;
  type: UnitType;
  status: UnitStatus;
  block: Block;
  monthlyRate: number;
  dailyRate: number;
  currencyId: string;
  buildingId: string;
}

interface CurrencyProps {
  id: string;
  code: string;
  createdAt: Date;
}

interface CustomerProps {
  id: string;
  name: string;
  status: CustomerStatus;
}

interface ContractProps {
  id: string;
  type: ContractType;
  startDate: Date;
  endDate: Date;
  deposit: number;
  amount: number;
  currencyId: string;
  unitId: string;
  customerId: string | null;
  createdAt: Date;
  unit: UnitProps;
  currency: CurrencyProps;
  customer: CustomerProps | null;
}

interface SearchParams {
  status?: UnitStatus;
  orderBy?: keyof UnitProps;
}

interface Props {
  contracts: ContractProps[];
  searchParams: SearchParams;
}

export default function ListActiveContracts({
  contracts,
  searchParams,
}: Props) {
  const columns: { label: string; value: keyof ContractProps }[] = [
    // { label: 'Unit ID', value: 'id' },
    { label: 'Created', value: 'createdAt' },
    { label: 'Unit', value: 'unitId' },
    { label: 'From', value: 'startDate' },
    { label: 'To', value: 'endDate' },
    { label: 'Tenant', value: 'customerId' },
    { label: 'Amount', value: 'amount' },
    { label: 'Currency', value: 'currencyId' },
    { label: 'Deposit', value: 'deposit' },
  ];

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <caption className="my-7 text-2xl">List active contracts</caption>
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((col) => (
              <th key={col.value} scope="col" className="px-3 py-3">
                {/* <Link href={`/dashboard/dummy?orderBy=${col.value}`}> */}
                <Link
                  href={{
                    query: { ...searchParams, orderBy: col.value },
                  }}
                >
                  {col.label}
                </Link>
                {col.value === searchParams.orderBy && (
                  <ArrowUpIcon width={15} height={15} className=" inline" />
                )}
              </th>
            ))}
            {/* <th>
              <Link href="/dashboard/settings/unit">
                <PlusIcon width={30} height={30} />
              </Link>
            </th> */}
          </tr>
        </thead>
        {contracts.map((contract, index) => (
          <tbody key={contract.id}>
            <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <td className="px-3 py-3">{contract.createdAt.toDateString()}</td>
              <td className="px-3 py-3">{contract.unit.name}</td>
              <td className="px-3 py-3">{contract.startDate.toDateString()}</td>
              <td className="px-3 py-3">{contract.endDate.toDateString()}</td>
              <td className="px-3 py-3">{contract.customer?.name}</td>
              <td className="px-3 py-3">{contract.amount}</td>
              <td className="px-3 py-3">{contract.currency.code}</td>
              <td className="px-3 py-3">{contract.deposit}</td>
              <td className="px-3 py-3">
                <div className="flex space-x-5">
                  <ReleaseContract id={contract.id} />
                </div>
              </td>
              {/* <td className="px-3 py-3">
                <div className="flex space-x-5">
                  <ReleaseContract id={contract.id} />
                </div>
              </td> */}
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
