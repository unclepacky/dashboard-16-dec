'use server';

import prisma from '@/prisma/client';
import { CustomerStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addCustomer(formData: FormData) {
  const customerName = formData.get('customerName') as string;
  const status = formData.get('customerStatus') as CustomerStatus;

  const newCustomer = await prisma.customer.create({
    data: {
      name: customerName,
      status: status,
    },
  });
  revalidatePath('/dashboard/customers');
}

export async function deleteCustomer(id: string) {
  await prisma.customer.delete({
    where: {
      id: id,
    },
  });
  revalidatePath(`/dashboard/customers/`);
  // redirect('/dashboard/settings');
}

export async function updateCustomer(formData: FormData) {
  const customerId = formData.get('customerId') as string;
  const customerName = formData.get('customerName') as string;
  const status = formData.get('customerStatus') as CustomerStatus;

  await prisma.customer.update({
    where: {
      id: customerId,
    },
    data: {
      name: customerName,
      status: status,
    },
  });
  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}
