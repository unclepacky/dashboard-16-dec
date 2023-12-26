import { updateCustomer } from '@/action/customer';
import prisma from '@/prisma/client';
import { CustomerStatus } from '@prisma/client';

interface Props {
  params: { id: string };
}

export default async function UpdateCustomerPage({ params }: Props) {
  const customer = await prisma.customer.findUnique({
    where: {
      id: params.id,
    },
  });

  return (
    <div className="relative overflow-x-auto">
      <form action={updateCustomer}>
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <caption>Update Customer</caption>
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-3">
                Name
              </th>
              <th scope="col" className="px-3 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <td className="px-3 py-3">
                <input
                  type="text"
                  name="customerId"
                  defaultValue={customer?.id}
                  hidden
                />
                <input
                  defaultValue={customer?.name}
                  required
                  name="customerName"
                  type="text"
                  placeholder="Enter Customer Name"
                  className="peer block rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 md:w-1/2"
                />
              </td>
              <td className="px-3 py-3">
                <select
                  defaultValue={customer?.status}
                  required
                  name="customerStatus"
                  className="peer block rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 md:w-1/2"
                >
                  {Object.values(CustomerStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>
                <button type="submit" className="w-full bg-amber-300 px-3 py-3">
                  Update
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </form>
    </div>
  );
}
