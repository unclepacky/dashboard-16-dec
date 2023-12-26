import { PresentationChartLineIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function UpdateRate({ id }: { id: string }) {
  return (
    <Link href={`/dashboard/settings/unit/rate/daily/${id}`}>
      <PresentationChartLineIcon className="h-[18px] w-[18px] translate-y-1/2 cursor-pointer text-gray-500 peer-focus:text-gray-900" />
    </Link>
  );
}
