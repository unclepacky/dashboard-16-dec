import { Unit, UnitStatus } from '@prisma/client';

export interface searchParamsProps {
  searchParams: {
    status: UnitStatus;
    orderBy: keyof Unit;
  };
}
