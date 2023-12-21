import ListUnitsV2 from '@/app/ui/dashboard/dummy/ListUnits-v2';
import StatusSelect from '@/app/ui/dashboard/dummy/StatusSelect';
import prisma from '@/prisma/client';
import { UnitStatus } from '@prisma/client';
import React from 'react';

interface Props {
  searchParams: {
    status: UnitStatus;
  };
}

export default async function DummyPage({ searchParams }: Props) {
  const statuses = Object.values(UnitStatus);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const units = await prisma.unit.findMany({
    where: {
      status: status,
    },
    include: {
      building: true,
    },
  });

  return (
    <>
      <StatusSelect status={searchParams.status || undefined} />
      <div>Dummy Page: query is: {searchParams.status}</div>
      <ListUnitsV2 units={units} />
    </>
  );
}

// import ListUnits from '@/app/ui/dashboard/dummy/ListUnits';
// import StatusSelect from '@/app/ui/dashboard/dummy/StatusSelect';
// import prisma from '@/prisma/client';
// import React from 'react';

// interface Props {
//   searchParams: {
//     query?: string;
//   };
// }

// export default async function DummyPage({ searchParams }: Props) {
//   const units = await prisma.unit.findMany();
//   console.log(searchParams);
//   return (
//     <>
//       <StatusSelect />
//       <div>Dummy Page: query is: {searchParams.query}</div>
//       <ListUnits query={searchParams.query || ''} />
//     </>
//   );
// }
