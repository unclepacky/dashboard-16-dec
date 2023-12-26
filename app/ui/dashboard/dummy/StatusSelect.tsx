'use client';
import { UnitStatus } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';

const NO_FILTER = 'All';

export default function StatusSelect({ status }: { status: UnitStatus }) {
  const searchParams = useSearchParams();

  const statuses = Object.values(UnitStatus);
  // const temp = statuses.includes(status) ? status : undefined;

  const router = useRouter();
  return (
    <div className="flex w-1/2 gap-4">
      <select
        defaultValue={
          statuses.includes(status)
            ? searchParams.get('status') || ''
            : // ? searchParams.get('status')?.toString()
              NO_FILTER
        }
        name="statuses"
        className="_dropDown flex-1"
        onChange={(e) => {
          const selectedStatus = e.target.value;
          const params = new URLSearchParams();
          if (selectedStatus) params.append('status', selectedStatus);
          if (searchParams.get('orderBy')) {
            params.append('orderBy', searchParams.get('orderBy') || '');
          }

          const query = params.size ? `?${params.toString()}` : '';
          router.push(`/dashboard/dummy${query}`);
        }}
      >
        <option value={NO_FILTER}>Filter by Status...</option>
        {Object.values(UnitStatus).map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
}
