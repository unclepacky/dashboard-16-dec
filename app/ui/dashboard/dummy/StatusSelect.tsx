'use client';
import { UnitStatus } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';

const NO_FILTER = 'All';

export default function StatusSelect({ status }: { status: UnitStatus }) {
  const searchParams = useSearchParams();

  const statuses = Object.values(UnitStatus);
  const temp = statuses.includes(status) ? status : undefined;

  const router = useRouter();
  return (
    <div className="flex w-1/2 gap-4">
      <select
        defaultValue={
          statuses.includes(status)
            ? searchParams.get('status')?.toString()
            : NO_FILTER
        }
        // defaultValue={temp}
        name="statuses"
        className="_dropDown flex-1"
        onChange={(e) => {
          const status = e.target.value;
          let query = '';
          if (status === NO_FILTER) {
            query = '';
          } else {
            query = status ? `?status=${status}` : '';
          }
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

// Select Box Classes.
// className="peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"

// 'use client';
// import { UnitStatus } from '@prisma/client';
// import { useRouter } from 'next/navigation';
// import React from 'react';

// const statusesOptTwo: { label: string; value?: UnitStatus }[] = [
//   { label: 'All' },
//   { label: 'Vacant', value: 'VACANT' },
//   { label: 'Occupied', value: 'OCCUPIED' },
//   { label: 'Maintenance', value: 'MAINTENANCE' },
// ];

// const NO_FILTER = 'All';

// export default function StatusSelect() {
//   const router = useRouter();
//   return (
//     <div className="flex w-1/2 gap-4">
//       <select
//         name="statuses"
//         className="_dropDown flex-1"
//         onChange={(e) => {
//           const status = e.target.value;
//           let query = '';
//           if (status === NO_FILTER) {
//             query = '';
//           } else {
//             query = status ? `?status=${status}` : '';
//           }
//           router.push(`/dashboard/dummy${query}`);
//         }}
//       >
//         <option value={NO_FILTER}>Filter by Status...</option>
//         {Object.values(UnitStatus).map((status) => (
//           <option key={status} value={status}>
//             {status}
//           </option>
//         ))}
//       </select>

//       {/* <select
//         className=" _dropDown flex-1"
//         onChange={(e) => {
//           const status = e.target.value;
//           const query = status ? `?status=${status}` : '';
//           router.push(`/dashboard/dummy${query}`);
//         }}
//       >
//         {statusesOptTwo.map((status) => (
//           <option key={`${status.value}x`} value={status.value || ''}>
//             {status.label}
//           </option>
//         ))}
//       </select> */}
//     </div>
//   );
// }

// // Select Box Classes.
// // className="peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
