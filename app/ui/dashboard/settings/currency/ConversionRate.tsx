import prisma from '@/prisma/client';
import DeleteWithId from '../delete-with-id';
import { deleteConversionRate } from '@/action/currency';

export default async function ConversioRate() {
  const conversionRates = await prisma.currencyConversionRate.findMany({
    include: {
      currency: true,
    },
  });

  return (
    <div className="w-full">
      <div className="flex flex-col rounded-lg bg-gray-50 px-6 pb-4 pt-8 shadow-lg shadow-slate-300">
        {conversionRates.length === 0 && (
          <div>There are no Conversion Rates</div>
        )}
        {conversionRates.length > 0 &&
          conversionRates.map((conv) => (
            <div key={conv.id} className="relative flex">
              <span className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
                {conv.currency.code}
              </span>
              <span className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
                {new Intl.NumberFormat().format(conv.rate)}
              </span>
              <span className="peer block w-1/4 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
                {/* {conv.recordedAt.toDateString()} */}
                {`${conv.recordedAt.toDateString()} ${conv.recordedAt.toLocaleString(
                  'en-US',
                  {
                    // year: 'numeric',
                    // month: 'numeric',
                    // day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  },
                )}`}

                {/* {conv.recordedAt.toLocaleString()} */}
              </span>
              <div className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
                {/* <UpdateUnit id={conv.id} /> */}
                {/* <DeleteUnit id={conv.id} deleteId={deleteConversionRate} /> */}
                <DeleteWithId id={conv.id} func1={deleteConversionRate} />
              </div>
            </div>
          ))}
        <div className="mt-5 flex w-full justify-center">
          {/* <Pagination totalPages={totalPages} currentPage={currentPage} /> */}
        </div>
      </div>
    </div>
  );
}

// <div className="w-full">
// <div className="flex flex-col rounded-lg bg-gray-50 px-6 pb-4 pt-8 shadow-lg shadow-slate-300">
//   {/* <div className={`mb-3 flex flex-row items-center text-2xl`}>
//       <BuildingStorefrontIcon className="pointer-events-none h-[24px] w-[24px]  text-gray-500 peer-focus:text-gray-900" />
//       <h1>Units ({totalUnits})</h1>
//       <Link href="/dashboard/settings/unit" className="ml-auto">
//         <PlusIcon width={24} height={24} />
//       </Link>
//     </div> */}
//   {/* <Search placeholder="Search Units..." /> */}
//   {conversion.length === 0 && <div>There are no Currencies</div>}
//   {conversion.length > 0 &&
//     conversion.map((conv) => (
//       <div key={conv.id} className="relative flex">
//         <span className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
//           {conv.rate}
//         </span>
//         <span className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
//           {conv.recordedAt.toDateString()}
//         </span>
//         <span className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
//           {conv.currency.id}
//         </span>
//         <span className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
//           {conv.currency.code}
//         </span>
//         {/* <span className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
//           {unit.name}
//         </span> */}
//         <div className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
//           {/* <UpdateUnit id={unit.id} />
//             <DeleteUnit id={unit.id} /> */}
//         </div>
//       </div>
//     ))}
//   <div className="mt-5 flex w-full justify-center">
//     {/* <Pagination totalPages={totalPages} currentPage={currentPage} /> */}
//   </div>
// </div>
// </div>
