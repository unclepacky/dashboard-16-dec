'use client';

import { releaseContract } from '@/action/contract';
import {
  AcademicCapIcon,
  BackspaceIcon,
  FolderMinusIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { LiaFileContractSolid } from 'react-icons/lia';
import { string } from 'zod';

export default function ReleaseContract({ id }: { id: string }) {
  return (
    <button type="button" onClick={async () => await releaseContract({ id })}>
      {/* <Link href={`/dashboard/contract/unit/${id}`}> */}
      <FolderMinusIcon width={20} height={20} className="text-2xl" />
      {/* </Link> */}
    </button>
  );
}
