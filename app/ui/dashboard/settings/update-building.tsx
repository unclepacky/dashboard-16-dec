import { PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';

export default function UpdateBuilding({ id }: { id: string }) {
  return (
    <Link href={`/dashboard/settings/building/${id}`}>
      <PencilIcon className="absolute right-8 top-1/3 h-[18px] w-[18px] -translate-y-1/2 cursor-pointer text-gray-500 peer-focus:text-gray-900" />
    </Link>
  );
}
