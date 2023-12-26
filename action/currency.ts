'use server';

import prisma from '@/prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addCurrency(formData: FormData) {
  const code = formData.get('currency') as string;

  const currency = await prisma.currency.create({
    data: {
      code: code,
    },
  });
}
export async function addConversionRate(formData: FormData) {
  const rate = Number(formData.get('rate'));
  const currencyId = formData.get('currencyId') as string;

  const conversionRate = await prisma.currencyConversionRate.create({
    data: {
      rate: rate,
      currencyId: currencyId,
    },
  });
  revalidatePath('/dashboard/currency/create/conversion');
  redirect('/dashboard/currency');
}

export async function deleteConversionRate(id: string) {
  await prisma.currencyConversionRate.delete({
    where: {
      id: id,
    },
  });
  revalidatePath(`/dashboard/currency`);
  // redirect('/dashboard/currency');
}
