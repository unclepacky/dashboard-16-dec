'use server';

import prisma from '@/prisma/client';
import { TransactionType } from '@prisma/client';

export async function createTransaction(formData: FormData) {
  const date = new Date(formData.get('date') as string);
  const amount = Number(formData.get('amount'));
  const description = formData.get('description') as string;
  const contractId = formData.get('contractId') as string;
  const type = formData.get('type') as TransactionType;

  const newTransaction = await prisma.transaction.create({
    data: {
      date: date,
      amount: amount,
      description: description,
      contractId: contractId,
      type: type,
    },
  });
}
