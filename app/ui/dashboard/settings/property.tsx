import { addProperty } from '@/action/property';
import {
  ArrowRightIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/outline';
import { Button } from '../../button';

export default function Property() {
  return (
    <form
      action={addProperty}
      className="md:w-1/3 md:min-w-max md:max-w-sm md:flex-1"
    >
      <div className="flex flex-col rounded-lg bg-gray-50 px-6 pb-4 pt-8 shadow-lg shadow-slate-300">
        <h1 className={`mb-3 text-2xl`}>Please Create a Property.</h1>
        <div className="w-full">
          <div>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="property"
                type="text"
                name="property"
                placeholder="Enter property name"
                required
              />
              <BuildingOffice2Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <CreatePropertyButton />
      </div>
    </form>
  );
}

function CreatePropertyButton() {
  // const { pending } = useFormStatus();

  return (
    //   <Button className="mt-4 w-full" aria-disabled={pending}>
    <Button className="mt-4 w-full">
      Create <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
