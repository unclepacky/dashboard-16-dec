import prisma from '@/prisma/client';
import UpdateUnit from '../update-unit';
import DeleteUnit from '../delete-unit';

export default async function Currency() {
  const currency = await prisma.currency.findMany({
    include: {
      conversionRateLogs: true, // Include conversion rate logs
    },
  });

  return (
    <div className="w-full">
      <div className="flex flex-col rounded-lg bg-gray-50 px-6 pb-4 pt-8 shadow-lg shadow-slate-300">
        {currency.length === 0 && <div>There are no Currencies</div>}
        {currency.length > 0 &&
          currency.map((curr) => (
            <div key={curr.id} className="relative flex">
              <span className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
                {curr.code}
              </span>
              <span className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
                {curr.createdAt.toDateString()}
              </span>
              <span className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
                {/* {curr.conversionRateLogs} */}
                {/* {curr.conversionRateLogs.length > 0
                  ? curr.conversionRateLogs[curr.conversionRateLogs.length - 1]
                      .rate
                  : 'No rate data'} */}
                {curr.conversionRateLogs.length > 0
                  ? curr.conversionRateLogs.sort(
                      (a, b) =>
                        new Date(b.recordedAt).getTime() -
                        new Date(a.recordedAt).getTime(),
                    )[0].rate
                  : 'No rate data'}
              </span>
              <div className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
                <UpdateUnit id={curr.id} />
                <DeleteUnit id={curr.id} />
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
