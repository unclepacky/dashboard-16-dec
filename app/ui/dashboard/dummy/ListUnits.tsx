import prisma from '@/prisma/client';
import { UnitStatus } from '@prisma/client';
import UpdateUnit from './update-unit-dummy';
import DeleteUnit from './delete-unit-dummy';

export default async function ListUnits({ query }: { query: string }) {
  const units = await prisma.unit.findMany({
    where: {
      status: (query as UnitStatus) || undefined,
    },
    include: {
      building: true,
    },
  });
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Building
            </th>
            <th scope="col" className="px-6 py-3">
              Block
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Unit
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        {units.map((unit, index) => (
          <tbody key={unit.id}>
            <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <td className="px-6 py-4">{unit.building.name}</td>
              <td className="px-6 py-4">{unit.block}</td>
              <td className="px-6 py-4">{unit.status}</td>
              <td className="px-6 py-4">{unit.type}</td>
              <td className="px-6 py-4">{unit.name}</td>
              <td className="px-6 py-4">
                <div className="flex space-x-5">
                  <UpdateUnit id={unit.id} />
                  <DeleteUnit id={unit.id} />
                </div>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

// import prisma from '@/prisma/client';
// import { UnitStatus } from '@prisma/client';
// import UpdateUnit from './update-unit-dummy';
// import DeleteUnit from './delete-unit-dummy';

// export default async function ListUnits({ query }: { query: string }) {
//   console.log('From List Units', query);

//   const statuses = Object.values(UnitStatus);

//   const units = await prisma.unit.findMany({
//     where: {
//       status: (query as UnitStatus) || undefined,
//     },
//     include: {
//       building: true,
//     },
//   });
//   return (
//     <div className="relative overflow-x-auto">
//       <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
//         <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
//           <tr>
//             <th scope="col" className="px-6 py-3">
//               Building
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Block
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Status
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Type
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Unit
//             </th>
//             <th scope="col" className="px-6 py-3"></th>
//           </tr>
//         </thead>
//         {units.map((unit, index) => (
//           <tbody key={unit.id}>
//             <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
//               <td className="px-6 py-4">{unit.building.name}</td>
//               <td className="px-6 py-4">{unit.block}</td>
//               <td className="px-6 py-4">{unit.status}</td>
//               <td className="px-6 py-4">{unit.type}</td>
//               <td className="px-6 py-4">{unit.name}</td>
//               <td className="px-6 py-4">
//                 <div className="flex space-x-5">
//                   <UpdateUnit id={unit.id} />
//                   <DeleteUnit id={unit.id} />
//                 </div>
//               </td>
//             </tr>
//           </tbody>
//         ))}
//       </table>
//     </div>
//   );
// }
