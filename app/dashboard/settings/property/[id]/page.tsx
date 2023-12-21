import { updateProperty } from '@/action/property';
import prisma from '@/prisma/client';

export default async function EditPropertyPage({
  params,
}: {
  params: { id: string };
}) {
  const property = await prisma.property.findUnique({
    where: {
      id: params.id,
    },
  });

  return (
    <form action={updateProperty} className=" space-x-3">
      <input type="text" value={property?.id} name="id" hidden />
      <input type="text" defaultValue={property?.name} name="property" />
      <button className=" border-2 p-2">Update</button>
    </form>
  );
}
