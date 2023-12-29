'use server';

import prisma from '@/prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addContract(formData: FormData) {
  console.log(formData);
}
export async function createUnitContract(formData: FormData) {
  console.log(formData);

  // TODO when creating a contract
  // - Make unit Occupied
  // - Customer to become Tenant

  const unitId = formData.get('id') as string;
  const customerId = formData.get('customer') as string;
  const startDate = new Date(formData.get('startDate') as string);
  const endDate = new Date(formData.get('endDate') as string);
  const currencyId = formData.get('currency') as string;
  // const currency = Number(formData.get("currency") );
  const amount = Number(formData.get('amount'));
  const deposit = Number(formData.get('deposit'));

  const newContract = await prisma.contract.create({
    data: {
      unitId: unitId,
      customerId: customerId,
      startDate: startDate,
      endDate: endDate,
      currencyId: currencyId,
      amount: amount,
      deposit: deposit,
      type: 'ACTIVE',
    },
  });

  const unit = await prisma.unit.update({
    where: {
      id: unitId,
    },
    data: {
      status: 'OCCUPIED',
    },
  });

  const customer = await prisma.customer.update({
    where: {
      id: customerId,
    },
    data: {
      status: 'TENANT',
    },
  });
  revalidatePath(`/dashboard/contract/unit/${unitId}`);
  redirect('/dashboard/contract');
}

export async function releaseContract({ id }: { id: string }) {
  console.log('ID IN RELEASE IS : ', id);
  const contract = await prisma.contract.update({
    where: {
      id: id,
    },
    data: {
      type: 'RELEASED',
    },
  });

  // Tenant to become extenant in case no other contract
  // Search in all the active contracts if the tenant exists

  const contractWithTenantID = await prisma.contract.findFirst({
    where: {
      customerId: contract.customerId,
      type: 'ACTIVE',
      id: {
        not: id, // Exclude the current contract
      },
    },
  });

  if (!contractWithTenantID) {
    const tenant = await prisma.customer.update({
      where: {
        id: contract.customerId || undefined,
      },
      data: {
        status: 'EX_TENANT',
      },
    });
  }

  // unit set to Vacant
  const unit = await prisma.unit.update({
    where: {
      id: contract.unitId,
    },
    data: {
      status: 'VACANT',
    },
  });
  revalidatePath('/dashboard/contract');
}
