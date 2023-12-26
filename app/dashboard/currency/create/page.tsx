import { addBuilding } from '@/action/building';
import { addCurrency } from '@/action/currency';
import { Button } from '@/app/ui/button';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default async function CreateCurrencyPage() {
  return (
    <form
      action={addCurrency}
      className="flex flex-col gap-2 rounded-lg bg-gray-50 px-6 pb-4 pt-8 shadow-lg shadow-slate-300 md:w-full"
    >
      <h1 className={`mb-3 text-2xl`}>
        Currency Form - Allows you to add Currency{' '}
      </h1>
      <div className="relative w-1/2">
        <input
          required
          name="currency"
          placeholder="Enter Currency"
          className="peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
        />
        <CreateCurrencyButton />
        {/* <UpdateProperty id={'10'} />
          <DeleteProperty id={'10'} /> */}
      </div>
    </form>
  );
}

function CreateCurrencyButton() {
  // const { pending } = useFormStatus();

  return (
    //   <Button className="mt-4 w-full" aria-disabled={pending}>
    <Button className="mt-4 w-full">
      Create <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
