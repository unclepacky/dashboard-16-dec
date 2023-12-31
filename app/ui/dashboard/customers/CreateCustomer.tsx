import { addCustomer } from '@/action/customer';
import { CustomerStatus } from '@prisma/client';
import React from 'react';

export default function CreateCustomer() {
  return (
    <div className="relative overflow-x-auto">
      <form action={addCustomer}>
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <caption className="text-left">Create a Customer</caption>
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
                  required
                  name="customerName"
                  type="text"
                  placeholder="Enter Customer Name"
                  className="peer block rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 md:w-1/2"
                />
              </td>
              <td className="px-3 py-3">
                <select
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
                  Submit
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </form>
    </div>
  );
}

{
  /* <input
name="name"
type="text"
defaultValue={unit?.name}
className="peer block rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 md:w-1/2"
/>

<select
required
name="currency"
defaultValue={unit?.currency.code}
className="peer block rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 md:w-1/2"
>
{currencies.map((curr) => (
  <option key={curr.id} value={curr.id}>
    {curr.code}
  </option>
))}
</select> */
}
