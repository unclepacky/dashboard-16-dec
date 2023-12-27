import prisma from '@/prisma/client';

export default async function ListInquiryForms() {
  const inquiriesForm = await prisma.contract.findMany({
    // where: {
    //   type: 'ACTIVE',
    // },
    include: {
      unit: true,
      customer: true,
    },
  });

  return (
    <div className="w-full">
      <div className="flex flex-col rounded-lg bg-gray-50 px-6 pb-4 pt-8 shadow-lg shadow-slate-300">
        <div className=" text-center">Contract</div>
        {inquiriesForm.map((inquiry) => (
          <div key={inquiry.id} className="relative flex">
            <span className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
              {inquiry.startDate.toDateString()}
            </span>
            <span className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
              {inquiry.endDate.toDateString()}
            </span>
            <span className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
              {inquiry.createdAt.toDateString()}
            </span>
            <span className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
              {inquiry.type}
            </span>
            <span className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
              {inquiry.deposit}
            </span>
            <span className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
              {inquiry.customer?.name}
            </span>
            <span className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
              {inquiry.unit.name}
            </span>
            <div className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
              {/* <UpdateUnit id={inquiry.id} />
              <DeleteUnit id={inquiry.id} /> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
