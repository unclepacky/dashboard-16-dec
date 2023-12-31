import prisma from '@/prisma/client';
import { Customer } from '@prisma/client';
import DeleteCustomer from './delete-customer';
import UpdateCustomer from './update-customer';

export default async function ListCustomers() {
  const columns: { label: string; value: keyof Customer }[] = [
    // { label: 'ID', value: 'id' },
    { label: 'Name', value: 'name' },
    { label: 'Status', value: 'status' },
  ];

  const customers = await prisma.customer.findMany();

  if (customers.length < 1) {
    return <div>There are no customers</div>;
  }

  return (
    <div className="relative overflow-x-auto">
      <table className="w-1/2 text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <caption className="text-left">List of Customers</caption>

        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((col) => (
              <th key={col.value} scope="col" className="px-3 py-3">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        {customers.map((cus) => (
          <tbody key={cus.id}>
            <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <td className="px-3 py-3">{cus.name}</td>
              <td className="px-3 py-3">{cus.status}</td>
              <td className="px-3 py-3">
                <div className="flex space-x-5">
                  <UpdateCustomer id={cus.id} />
                  <DeleteCustomer id={cus.id} />
                </div>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
