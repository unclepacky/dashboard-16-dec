import UpdateUnit from './update-unit-dummy';
import DeleteUnit from './delete-unit-dummy';
import { Block, Unit, UnitStatus, UnitType } from '@prisma/client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

interface Props {
  units: ({
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
  })[];
  searchParams: {
    status?: UnitStatus;
    orderBy?: keyof Unit;
  };
}

export default function ListUnitsV2({ units, searchParams }: Props) {
  console.log(searchParams);

  const columns: { label: string; value: keyof Unit }[] = [
    // { label: 'Unit ID', value: 'id' },
    { label: 'Building', value: 'buildingId' },
    { label: 'Block', value: 'block' },
    { label: 'Status', value: 'status' },
    { label: 'Type', value: 'type' },
    { label: 'Name', value: 'name' },
  ];
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((col) => (
              <th key={col.value} scope="col" className="px-6 py-3">
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
          </tr>
        </thead>
        {units.map((unit, index) => (
          <tbody key={unit.id}>
            <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <td className="px-6 py-4">{unit.building.name}</td>
              <td className="px-6 py-4">{unit.block}</td>
              <td className="px-6 py-4">{unit.status}</td>
              <td className="px-6 py-4">{unit.type}</td>
              <td className="px-6 py-4">{unit.name}</td>
              <td className="px-6 py-4">
                <div className="flex space-x-5">
                  <UpdateUnit id={unit.id} />
                  <DeleteUnit id={unit.id} />
                </div>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
