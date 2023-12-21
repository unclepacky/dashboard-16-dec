import { deleteProperty } from '@/action/property';
import { TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';

export default function DeleteProperty({ id }: { id: string }) {
  const deletePropertyWithId = deleteProperty.bind(null, id);

  return (
    <form action={deletePropertyWithId}>
      <button>
        {/* <span className="sr-only">Delete</span> */}
        <TrashIcon className="absolute right-1 top-1/3 h-[18px] w-[18px] -translate-y-1/2 cursor-pointer text-gray-500 peer-focus:text-gray-900" />
      </button>
    </form>
  );
}
