import { addConversionRate } from '@/action/currency';
import { addUnit } from '@/action/unit';
import { Button } from '@/app/ui/button';
import prisma from '@/prisma/client';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Block, UnitStatus, UnitType } from '@prisma/client';

export default async function CreateRateConversionPage() {
  const currencies = await prisma.currency.findMany();
  const conversionRate = await prisma.currencyConversionRate.findMany({
    include: {
      currency: true,
    },
  });

  return (
    <form
      action={addConversionRate}
      className="flex flex-col gap-2 rounded-lg bg-gray-50 px-6 pb-4 pt-8 shadow-lg shadow-slate-300 md:w-full"
    >
      <h1 className={`mb-3 text-2xl`}>
        Rate Conversion Form - Allows you to add Currency Conversion Rate. The
        Base Rate is USD
      </h1>
      <div className="flex w-full">
        <span className="_inputBox w-1/4">1 USD</span>
        <span className="_inputBox w-1/4">To</span>
        <select required name="currencyId" className="_dropDown w-1/4">
          {currencies.length > 0 &&
            currencies.map((curr) => (
              <option key={curr.id} value={curr.id}>
                {curr.code}
              </option>
            ))}
        </select>
        <div className="relative w-1/2">
          <input
            required
            type="number"
            step="0.01"
            min="0"
            max="1000000"
            name="rate"
            placeholder="Enter Conversion Rate"
            className="_inputBox w-full"
          />

          {/* <UpdateProperty id={'10'} />
          <DeleteProperty id={'10'} /> */}
        </div>
      </div>
      <CreateBuildingButton />

      {/* <div className="w-1/2">
        <select
          required
          name="status"
          className="peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
        >
          {Object.values(UnitStatus).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div> */}
      {/* <div className="w-1/2">
        <select
          required
          name="block"
          className="peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
        >
          {Object.values(Block).map((block) => (
            <option key={block} value={block}>
              {block}
            </option>
          ))}
        </select>
      </div> */}
      {/* <div className="w-1/2">
        <select
          required
          name="type"
          className="peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
        >
          {Object.values(UnitType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div> */}

      {/* <div className="relative w-1/2">
        <input
          required
          name="unit"
          placeholder="Enter Unit"
          className="peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
        />

        <CreateBuildingButton />
        <UpdateProperty id={'10'} />
          <DeleteProperty id={'10'} />
      </div> */}
    </form>
  );
}

function CreateBuildingButton() {
  // const { pending } = useFormStatus();

  return (
    //   <Button className="mt-4 w-full" aria-disabled={pending}>
    <Button className="mt-4 w-full">
      Create ! <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}

{
  /* <select name="unitStatus">
{Object.values(UnitStatus).map((status) => (
  <option key={status} value={status}>
    {status}
  </option>
))}
</select> */
}
