import Building from '@/app/ui/dashboard/settings/building';
import DeleteProperty from '@/app/ui/dashboard/settings/delete-property';
import Property from '@/app/ui/dashboard/settings/property';
import Unit from '@/app/ui/dashboard/settings/unit';
import UpdateProperty from '@/app/ui/dashboard/settings/update-property';
import prisma from '@/prisma/client';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { BuildingOffice2Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';

interface Props {
  searchParams: {
    page: string;
    query: string;
    // page: string | '1';
  };
}

export default async function SettingsPage({ searchParams }: Props) {
  const property = await prisma.property.findMany();
  return (
    <>
      <div className=" flex flex-col flex-wrap gap-2 md:flex-row">
        {property.length > 0 &&
          property.map((item) => (
            <div
              key={item.id}
              className="flex flex-col rounded-lg bg-gray-50 px-6 pb-4 pt-8 shadow-lg shadow-slate-300 md:w-1/3"
            >
              <h1 className={`mb-3 text-2xl`}>Property Name</h1>
              <div className="w-full">
                <div>
                  <div className="relative">
                    <input
                      value={item.name}
                      disabled
                      className="peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
                    />
                    <UpdateProperty id={item.id} />
                    <DeleteProperty id={item.id} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        {property.length < 1 && <Property />}
        <Building />
      </div>
      {/* <Unit /> */}
      <Unit
        searchParams={{ page: searchParams.page, query: searchParams.query }}
      />
    </>
  );
}
