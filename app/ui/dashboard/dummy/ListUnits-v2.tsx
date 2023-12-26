import UpdateUnit from './update-unit-dummy';
import DeleteUnit from './delete-unit-dummy';
import { Block, Unit, UnitStatus, UnitType } from '@prisma/client';
import Link from 'next/link';
import {
  ArrowUpIcon,
  PlusIcon,
  PresentationChartLineIcon,
} from '@heroicons/react/24/outline';
import UpdateRate from './update-daily-rate-dummy';

interface Props {
  units: ({
    currency: {
      id: string;
      code: string;
      createdAt: Date;
    } | null;
    building: {
      id: string;
      name: string;
      propertyId: string;
    };
  } & {
    id: string;
    name: string;
    type: UnitType;
    status: UnitStatus;
    block: Block;
    buildingId: string;
    currencyId: string;

    monthlyRate: number;
    dailyRate: number;
  })[];
  searchParams: {
    status?: UnitStatus;
    orderBy?: keyof Unit;
  };
}

export default function ListUnitsV2({ units, searchParams }: Props) {
  const columns: { label: string; value: keyof Unit }[] = [
    // { label: 'Unit ID', value: 'id' },
    { label: 'Bldg', value: 'buildingId' },
    { label: 'Block', value: 'block' },
    { label: 'Status', value: 'status' },
    { label: 'Type', value: 'type' },
    { label: 'Name', value: 'name' },
    { label: 'Currency', value: 'currencyId' },
    { label: 'Monthly', value: 'monthlyRate' },
    { label: 'Daily', value: 'dailyRate' },
  ];
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
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
            <th>
              <Link href="/dashboard/settings/unit">
                <PlusIcon width={30} height={30} />
              </Link>
            </th>
          </tr>
        </thead>
        {units.map((unit, index) => (
          <tbody key={unit.id}>
            <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <td className="px-3 py-3">{unit.building.name}</td>
              <td className="px-3 py-3">{unit.block}</td>
              <td className="px-3 py-3">{unit.status}</td>
              <td className="px-3 py-3">{unit.type}</td>
              <td className="px-3 py-3">{unit.name}</td>
              <td className="px-3 py-3">{unit.currency?.code}</td>
              <td className="px-3 py-3">{unit.monthlyRate}</td>
              <td className="px-3 py-3">{unit.dailyRate}</td>
              <td className="px-3 py-3">
                <div className="flex space-x-5">
                  <UpdateUnit id={unit.id} />
                  <DeleteUnit id={unit.id} />
                  <UpdateRate id={unit.id} />
                </div>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
