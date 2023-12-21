'use server';
import prisma from '@/prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addBuilding(formData: FormData) {
  const content = formData.get('building') as string;
  const propertyId = formData.get('propertyId') as string;

  await prisma.building.create({
    data: {
      name: content,
      propertyId: propertyId,
    },
  });
  revalidatePath(`/dashboard/settings/property/building`);
  redirect('/dashboard/settings');
}

export async function deleteBuilding(id: string) {
  await prisma.building.delete({
    where: {
      id: id,
    },
  });
  revalidatePath(`/dashboard/settings/`);
  // redirect('/dashboard/settings');
}

export async function updateBuilding(formData: FormData) {
  const content = formData.get('building') as string;
  const id = formData.get('id') as string;

  await prisma.building.update({
    where: {
      id: id,
    },
    data: {
      name: content,
    },
  });
  revalidatePath(`/dashboard/settings/building/${id}`);
  redirect('/dashboard/settings');
}
