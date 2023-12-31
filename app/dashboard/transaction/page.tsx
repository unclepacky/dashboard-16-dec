import { createTransaction } from '@/action/transaction';
import prisma from '@/prisma/client';
import { TransactionType } from '@prisma/client';
import { data } from 'autoprefixer';
import React from 'react';

export default async function TransactionPage() {
  const contracts = await prisma.contract.findMany({
    // where: {
    //   type: 'ACTIVE',
    // },
    include: {
      unit: true,
      customer: true,
    },
  });

  return (
    <form action={createTransaction} className="flex w-1/2 flex-col gap-4">
      {/* <input name="transactionId" type="text" placeholder="Transaction ID" /> */}
      <input
        required
        name="date"
        type="date"
        defaultValue={new Date().toISOString().split('T')[0]}
      />
      <input
        required
        name="amount"
        type="number"
        placeholder="Transaction amount"
      />
      <input name="description" type="text" placeholder="Description" />
      <select
        required
        name="contractId"
        className="rounded-md border border-gray-300 bg-gray-100 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        defaultValue=""
      >
        <option value="" disabled>
          Select a contract ...
        </option>
        {contracts.map((contract) => (
          <option key={contract.id} value={contract.id}>
            {contract.customer?.name} {contract.unit.name} {contract.type}{' '}
          </option>
        ))}
      </select>
      <select required name="type">
        {Object.values(TransactionType).map((trans) => (
          <option key={trans} value={trans}>
            {trans}
          </option>
        ))}
      </select>
      <button type="submit" className=" border-2 border-amber-400 p-2 ">
        Create Transaction
      </button>
    </form>
  );
}
