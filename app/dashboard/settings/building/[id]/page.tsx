import { updateBuilding } from '@/action/building';
import { updateProperty } from '@/action/property';
import prisma from '@/prisma/client';

export default async function EditBuildingPage({
  params,
}: {
  params: { id: string };
}) {
  const building = await prisma.building.findUnique({
    where: {
      id: params.id,
    },
  });

  return (
    <form action={updateBuilding} className=" space-x-3">
      <input type="text" value={building?.id} name="id" hidden />
      <input type="text" defaultValue={building?.name} name="building" />
      <button className=" border-2 p-2">Update</button>
    </form>
  );
}
