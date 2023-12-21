import { updateUnit } from '@/action/unit';
import { Button } from '@/app/ui/button';
import Building from '@/app/ui/dashboard/settings/building';
import prisma from '@/prisma/client';
import {
  ArrowRightIcon,
  BuildingStorefrontIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { Block, UnitStatus, UnitType } from '@prisma/client';
import Link from 'next/link';

export default async function EditUnitPage({
  params,
}: {
  params: { id: string };
}) {
  const buildings = await prisma.building.findMany();
  const unit = await prisma.unit.findUnique({
    where: {
      id: params.id,
    },
    include: {
      building: true,
    },
  });
  return (
    <>
      <div className="w-full">
        <div className="flex flex-col rounded-lg bg-gray-50 px-6 pb-4 pt-8 shadow-lg shadow-slate-300">
          <div className={`mb-3 flex flex-row items-center text-2xl`}>
            <BuildingStorefrontIcon className="pointer-events-none h-[24px] w-[24px]  text-gray-500 peer-focus:text-gray-900" />
            <h1>Update Unit</h1>
            <Link href="/dashboard/settings/unit" className="ml-auto">
              <PlusIcon width={24} height={24} />
            </Link>
          </div>
          <form action={updateUnit} className="w-full">
            <div className="relative flex flex-col">
              <input name="id" type="text" defaultValue={unit?.id} hidden />
              <input
                name="buildingId"
                type="text"
                defaultValue={unit?.building.id}
                hidden
              />
              <select
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
              <input
                name="name"
                type="text"
                defaultValue={unit?.name}
                className="peer block rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 md:w-1/2"
              />
              {/* <div className="peer block w-1/6 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500">
                <UpdateUnit id={unit.id} />
                <DeleteUnit id={unit.id} />
              </div> */}

              {/* <input
                  value={unit.name}
                  disabled
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
                /> */}
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
