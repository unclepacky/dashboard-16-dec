import prisma from '@/prisma/client';
import { updateUnit } from '@/action/unit';
import { Button } from '@/app/ui/button';
import {
  ArrowRightIcon,
  BuildingStorefrontIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { Block, UnitStatus, UnitType } from '@prisma/client';
import Link from 'next/link';
import { createUnitContract } from '@/action/contract';

interface Props {
  params: { id: string };
}

const NO_FILTER = 'All';

export default async function UnitContract({ params }: Props) {
  const currencies = await prisma.currency.findMany({
    include: { conversionRateLogs: true },
  });
  const customers = await prisma.customer.findMany();
  const buildings = await prisma.building.findMany();
  const unit = await prisma.unit.findUnique({
    where: {
      id: params.id,
    },
    include: {
      building: true,
      currency: true,
      rateHistory: true,
    },
  });

  if (!unit) return;

  return (
    <>
      <div className="w-full">
        <div className="flex flex-col rounded-lg bg-gray-50 px-6 pb-4 pt-8 shadow-lg shadow-slate-300">
          <div className={`mb-3 flex flex-col text-2xl`}>
            <h1>Create contract for : </h1>
            <div className="flex gap-4 text-lg">
              <span>{unit.name}</span>
              <span>{unit.type}</span>
              <span>Monthly: {`${unit.monthlyRate}${unit.currency.code}`}</span>
              <span>
                Daily: {unit.dailyRate}${unit.currency.code}
              </span>
            </div>
          </div>
          <form action={createUnitContract} className="w-full">
            <div className="relative flex flex-col">
              <input name="id" type="text" defaultValue={unit?.id} hidden />
              {/* CUSTOMER NAME */}
              <select
                required
                name="customer"
                defaultValue=""
                className="peer block rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 md:w-1/2"
              >
                <option value="" disabled>
                  Select Customer...
                </option>

                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
              {/* START / END DATES */}
              <div className="flex w-1/2 justify-between">
                <div>
                  <label className="px-2 text-sm">Starting date: </label>
                  <input
                    required
                    name="startDate"
                    type="date"
                    // defaultValue={}
                    className="peer block rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 md:w-full"
                  />
                </div>
                <div>
                  <label className="px-2 text-sm">Ending date: </label>
                  <input
                    required
                    name="endDate"
                    type="date"
                    // defaultValue={}
                    className="peer block rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 md:w-full"
                  />
                </div>
              </div>

              {/* AMOUNT AND CURRENCY */}

              <div className="flex w-1/2 justify-between">
                <div>
                  <label className="px-2 text-sm">Currency:</label>
                  <select
                    required
                    name="currency"
                    defaultValue={unit?.currency.code}
                    className="peer block rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 md:w-full"
                  >
                    {currencies.map((curr) => (
                      <option key={curr.id} value={curr.id}>
                        {curr.code}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="px-2 text-sm">Amount: </label>
                  <input
                    required
                    name="amount"
                    type="number"
                    defaultValue={unit.monthlyRate}
                    className="peer block rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 md:w-full"
                  />
                </div>
                <div>
                  <label className="px-2 text-sm">Deposit: </label>
                  <input
                    required
                    name="deposit"
                    type="number"
                    defaultValue={unit.monthlyRate}
                    className="peer block rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 md:w-full"
                  />
                </div>
              </div>
              <CreateUnitButton />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
function CreateUnitButton() {
  // const { pending } = useFormStatus();

  return (
    //   <Button className="mt-4 w-full" aria-disabled={pending}>
    <Button className="mt-4 w-1/2">
      Update <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}

{
  /* <select
required
name="building"
defaultValue={unit?.building.name}
className="peer block rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 md:w-1/2"
>
{buildings.map((building) => (
  <option key={building.id}>{building.name}</option>
))}
</select> 

<select
required
name="block"
defaultValue={unit?.block}
className="peer block rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 md:w-1/2"
>
{Object.values(Block).map((block) => (
    <option key={block} value={block}>
    {block}
    </option>
))}
</select>
<select
required
name="status"
defaultValue={unit?.status}
className="peer block rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 md:w-1/2"
>
{Object.values(UnitStatus).map((status) => (
    <option key={status} value={status}>
    {status}
    </option>
))}
</select>

<select
required
name="type"
defaultValue={unit?.type}
className="peer block rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 md:w-1/2"
>
{Object.values(UnitType).map((type) => (
    <option key={type} value={type}>
    {type}
    </option>
))}
</select>


*/
}
