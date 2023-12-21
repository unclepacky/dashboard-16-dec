'use server';
import prisma from '@/prisma/client';
import { Block, UnitStatus, UnitType } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addUnit(formData: FormData) {
  const content = formData.get('unit') as string;
  const buildingId = formData.get('buildingId') as string;
  const status = formData.get('status') as UnitStatus;
  const type = formData.get('type') as UnitType;

  await prisma.unit.create({
    data: {
      name: content,
      buildingId: buildingId,
      status: status,
      type: type,
    },
  });

  revalidatePath(`/dashboard/settings/unit`);
  redirect('/dashboard/settings');
}

export async function deleteUnit(id: string) {
  await prisma.unit.delete({
    where: {
      id: id,
    },
  });
  revalidatePath(`/dashboard/settings/`);
  // redirect('/dashboard/settings');
}

export async function updateUnit(formData: FormData) {
  const id = formData.get('id') as string; //hidden
  const buildingId = formData.get('buildingId') as string; //hidden
  const building = formData.get('building') as string;
  const block = formData.get('block') as Block;
  const status = formData.get('status') as UnitStatus;
  const type = formData.get('type') as UnitType;
  const content = formData.get('name') as string;

  const bld = await prisma.building.findUnique({
    where: {
      name: building,
    },
  });

  await prisma.unit.update({
    where: {
      id: id,
    },
    data: {
      buildingId: bld?.id,
      block: block,
      status: status,
      type: type,
      name: content,
    },
  });
  revalidatePath(`/dashboard/settings/unit/${id}`);
  redirect('/dashboard/settings');
}
