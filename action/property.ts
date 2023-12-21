'use server';

import prisma from '@/prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// Validate Data With Zod in Server Actions Next.js (Client-Side + Server-Side)
// https://www.youtube.com/watch?v=tLhcyBfljYo
const schema = z.object({
  property: z.string().min(3, 'Error min from Claude'),
});

export async function addProperty(formData: FormData) {
  //   const validated = schema.safeParse('property')
  const content = formData.get('property');

  await prisma.property.create({
    data: {
      name: content as string,
    },
  });
  revalidatePath(`/dashboard/settings`);
}

export async function updateProperty(formData: FormData) {
  const content = formData.get('property') as string;
  const id = formData.get('id') as string;

  await prisma.property.update({
    where: {
      id: id,
    },
    data: {
      name: content,
    },
  });
  revalidatePath(`/dashboard/settings/property/${id}`);
  redirect('/dashboard/settings');
}

export async function deleteProperty(id: string) {
  await prisma.property.delete({
    where: {
      id: id,
    },
  });
  revalidatePath(`/dashboard/settings/property/${id}`);
  redirect('/dashboard/settings');
}
