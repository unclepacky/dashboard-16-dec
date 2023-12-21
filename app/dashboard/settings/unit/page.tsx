import { addUnit } from '@/action/unit';
import { Button } from '@/app/ui/button';
import prisma from '@/prisma/client';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Block, UnitStatus, UnitType } from '@prisma/client';

export default async function UnitPage() {
  const buildings = await prisma.building.findMany({
    include: {
      Unit: true,
    },
  });

  return (
    <form
      action={addUnit}
      className="flex flex-col gap-2 rounded-lg bg-gray-50 px-6 pb-4 pt-8 shadow-lg shadow-slate-300 md:w-full"
    >
      <h1 className={`mb-3 text-2xl`}>
        Unit Form - Allows you to add Units to your Building
      </h1>
      <div className="w-1/2">
        <select
          required
          name="buildingId"
          className="peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
        >
          {buildings.length > 0 &&
            buildings.map((building) => (
              <option key={building.id} value={building.id}>
                {building.name}
              </option>
            ))}
        </select>
      </div>
      <div className="w-1/2">
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
      </div>
      <div className="w-1/2">
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
      </div>
      <div className="w-1/2">
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
      </div>

      <div className="relative w-1/2">
        <input
          required
          name="unit"
          placeholder="Enter Unit"
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
