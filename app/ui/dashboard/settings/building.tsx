import prisma from '@/prisma/client';
import {
  BuildingOfficeIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import UpdateProperty from './update-property';
import DeleteProperty from './delete-property';
import DeleteBuilding from './delete-building';
import UpdateBuilding from './update-building';

export default async function Building() {
  const buildings = await prisma.building.findMany();

  return (
    <>
      <div className="md:w-1/3 md:min-w-max md:max-w-sm md:flex-1">
        <div className="flex flex-col rounded-lg bg-gray-50 px-6 pb-4 pt-8 shadow-lg shadow-slate-300">
          <div className={`mb-3 flex flex-row items-center text-2xl`}>
            <BuildingOfficeIcon className="pointer-events-none h-[24px] w-[24px]  text-gray-500 peer-focus:text-gray-900" />
            <h1>Building</h1>
            <Link href="/dashboard/settings/building" className="ml-auto">
              <PlusIcon width={24} height={24} />
            </Link>
          </div>
          {buildings.length === 0 && <div>There are no Buildings</div>}
          {buildings.length > 0 &&
            buildings.map((building) => (
              // <div key={building.id}>{building.name}</div>
              <div key={building.id} className="relative">
                <input
                  value={building.name}
                  disabled
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
                />
                <UpdateBuilding id={building.id} />
                <DeleteBuilding id={building.id} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
