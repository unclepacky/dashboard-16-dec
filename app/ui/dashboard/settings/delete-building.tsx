import { deleteBuilding } from '@/action/building';
import { deleteProperty } from '@/action/property';
import { TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';

export default function DeleteBuilding({ id }: { id: string }) {
  const deleteBuildingWithId = deleteBuilding.bind(null, id);

  return (
    <form action={deleteBuildingWithId}>
      <button>
        {/* <span className="sr-only">Delete</span> */}
        <TrashIcon className="absolute right-1 top-1/3 h-[18px] w-[18px] -translate-y-1/2 cursor-pointer text-gray-500 peer-focus:text-gray-900" />
      </button>
    </form>
  );
}
