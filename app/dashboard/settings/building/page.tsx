import { addBuilding } from '@/action/building';
import { Button } from '@/app/ui/button';
import prisma from '@/prisma/client';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default async function BuildingPage() {
  const property = await prisma.property.findMany({
    include: {
      building: true,
    },
  });

  return (
    <form
      action={addBuilding}
      className="flex flex-col gap-2 rounded-lg bg-gray-50 px-6 pb-4 pt-8 shadow-lg shadow-slate-300 md:w-full"
    >
      <h1 className={`mb-3 text-2xl`}>
        Building Form - Allows you to add Buildings to your property
      </h1>
      <div className="w-1/2">
        <select
          required
          name="propertyId"
          id="propertyId"
          className="peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
        >
          {property.length > 0 &&
            property.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>
      </div>
      <div className="relative w-1/2">
        <input
          required
          name="building"
          placeholder="Enter Building"
          className="peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
        />
        <CreateBuildingButton />
        {/* <UpdateProperty id={'10'} />
          <DeleteProperty id={'10'} /> */}
      </div>
    </form>
  );
}

function CreateBuildingButton() {
  // const { pending } = useFormStatus();

  return (
    //   <Button className="mt-4 w-full" aria-disabled={pending}>
    <Button className="mt-4 w-full">
      Create <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
