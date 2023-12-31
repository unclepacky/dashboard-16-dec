'use server';
import prisma from '@/prisma/client';
import { Block, UnitStatus, UnitType } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addUnit(formData: FormData) {
  // When Adding a unit we have to Create in the Unit table
  // and then we have to create equivalent entry in the rateHistory.

  const buildingId = formData.get('buildingId') as string;
  const block = formData.get('block') as Block;
  const content = formData.get('unit') as string;
  const status = formData.get('status') as UnitStatus;
  const type = formData.get('type') as UnitType;
  const currId = formData.get('currency') as string;
  const dailyRate = Number(formData.get('defaultDailyRate'));
  const monthlyRate = Number(formData.get('defaultMonthlyRate'));

  const newUnit = await prisma.unit.create({
    data: {
      buildingId: buildingId,
      block: block,
      status: status,
      type: type,
      name: content,
      currencyId: currId,
      dailyRate: dailyRate,
      monthlyRate: monthlyRate,
    },
  });

  await prisma.rateHistory.create({
    data: {
      unitId: newUnit.id,
      newDailyRate: dailyRate,
      newMonthRate: monthlyRate,
      currencyId: currId,
    },
  });

  revalidatePath(`/dashboard/settings/unit`);
  redirect('/dashboard/dummy');
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
  const content = formData.get('name') as string;
  const buildingId = formData.get('buildingId') as string; //hidden
  const building = formData.get('building') as string;
  const block = formData.get('block') as Block;
  const status = formData.get('status') as UnitStatus;
  const type = formData.get('type') as UnitType;
  const currId = formData.get('currency') as string;
  const dailyRate = Number(formData.get('defaultDailyRate'));
  const monthlyRate = Number(formData.get('defaultMonthlyRate'));

  const bld = await prisma.building.findUnique({
    where: {
      name: building,
    },
  });

  const unit = await prisma.unit.findUnique({
    where: {
      id: id,
    },
  });

  let isRateChanged = false;

  if (unit?.dailyRate != dailyRate || unit.monthlyRate != monthlyRate) {
    isRateChanged = true;
  }

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
      currencyId: currId,
      dailyRate: dailyRate,
      monthlyRate: monthlyRate,
    },
  });

  if (isRateChanged) {
    await prisma.rateHistory.create({
      data: {
        unitId: id,
        newDailyRate: dailyRate,
        currencyId: currId,
        newMonthRate: monthlyRate,
      },
    });
  }

  revalidatePath(`/dashboard/settings/unit/${id}`);
  redirect('/dashboard/dummy');
}

export async function updateRate(formData: FormData) {
  // When updating the rate of a unit then we have to update the Unit table
  // and then we have to create equivalent entry in the rateHistory.

  const unitId = formData.get('id') as string; //hidden
  const dailyRate = Number(formData.get('defaultDailyRate'));
  const monthlyRate = Number(formData.get('defaultMonthlyRate'));
  const currId = formData.get('currency') as string;

  const updatedUnit = await prisma.unit.update({
    where: {
      id: unitId,
    },
    data: {
      dailyRate: dailyRate,
      monthlyRate: monthlyRate,
    },
  });

  await prisma.rateHistory.create({
    data: {
      unitId: unitId,
      newDailyRate: dailyRate,
      currencyId: currId,
      newMonthRate: monthlyRate,
    },
  });

  revalidatePath(`/dashboard/settings/unit/rate/daily/${unitId}`);
  redirect('/dashboard/dummy');
}
