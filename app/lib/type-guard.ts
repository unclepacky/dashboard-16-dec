import { Unit } from '@prisma/client';

const dummyUnit: Unit = {
  id: '',
  name: '',
  type: 'STUDIO',
  status: 'VACANT',
  block: 'A',
  buildingId: '',
};

export function isKeyOfUnit(key: any): key is keyof Unit {
  const unitKeys = Object.keys(dummyUnit) as Array<keyof Unit>;
  return unitKeys.includes(key);
}
