import prisma from '@/prisma/client';
import { BuildingStorefrontIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import DeleteUnit from './delete-unit';
import UpdateUnit from './update-unit';

import Pagination from '../../invoices/pagination-original';
import Search from '../../search';
import { filter } from '@/app/lib/filter';
// import Pagination from './pagination';

interface Props {
  searchParams?: {
    query?: string;
    page?: string;
    // page?: string | '1';
  };
}

const ITEMS_PER_PAGE = 5;
export default async function Unit({ searchParams }: Props) {
  // const query = 'a101';

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = Math.ceil(
    (await prisma.unit.count({
      where: {
        name: {
          contains: query,
          mode: 'insensitive', // This makes the search case-insensitive
        },
      },
    })) / ITEMS_PER_PAGE,
  );
  const totalUnits = Math.ceil(
    await prisma.unit.count({
      where: {
        // Add a condition to filter units based on the 'name' field
        name: {
          contains: query,
          mode: 'insensitive', // This makes the search case-insensitive
        },
      },
    }),
  );

  const units = await prisma.unit.findMany({
    // where: {
    //   OR: [
    //     {
    //       name: {
    //         contains: query,
    //         mode: 'insensitive',
    //       },
    //     },
    //     {
    //       building: {
    //         name: {
    //           contains: query,
    //           mode: 'insensitive',
    //         },
    //       },
    //     },
    //   ],
    // },
    where: {
      name: {
        contains: query,
        mode: 'insensitive', // This makes the search case-insensitive
      },
    },
    orderBy: {
      name: 'asc', // Sort by 'name' in ascending order
    },
    include: {
      building: true,
    },
    // skip: (currentPage - 1) * ITEMS_PER_PAGE,
    // take: ITEMS_PER_PAGE,
  });

  return (
    <>
      <div className="w-full">
        <div className="flex flex-col rounded-lg bg-gray-50 px-6 pb-4 pt-8 shadow-lg shadow-slate-300">
          <div className={`mb-3 flex flex-row items-center text-2xl`}>
            <BuildingStorefrontIcon className="pointer-events-none h-[24px] w-[24px]  text-gray-500 peer-focus:text-gray-900" />
            <h1>Units ({totalUnits})</h1>
            <Link href="/dashboard/settings/unit" className="ml-auto">
              <PlusIcon width={24} height={24} />
            </Link>
          </div>
          <Search placeholder="Search Units..." />
          {units.length === 0 && <div>There are no Units</div>}
          {units.length > 0 &&
            units.map((unit) => (
              <div key={unit.id} className="relative flex">
                <input
                  name="building"
                  type="text"
                  value={unit.building.name}
                  className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
                  disabled
                />

                <input
                  name="block"
                  type="text"
                  value={unit.block}
                  className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
                  disabled
                />
                <input
                  name="status"
                  type="text"
                  value={unit.status}
                  className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
                  disabled
                />
                <input
                  name="type"
                  type="text"
                  value={unit.type}
                  className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
                  disabled
                />
                <input
                  name="name"
                  type="text"
                  value={unit.name}
                  className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
                  disabled
                />
                <div className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
                  <UpdateUnit id={unit.id} />
                  <DeleteUnit id={unit.id} />
                </div>
              </div>
            ))}
          <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} currentPage={currentPage} />
          </div>
        </div>
      </div>
    </>
  );
}
