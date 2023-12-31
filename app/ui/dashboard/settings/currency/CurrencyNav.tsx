import { CurrencyDollarIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';

const currencyNavLinks = [
  { name: 'Create', href: '/dashboard/currency/create' },
  { name: 'Rate', href: '/dashboard/currency/create/conversion' },
];

export default function CurrencyNav() {
  return (
    <div className=" flex flex-col flex-wrap gap-2 md:flex-row">
      <div className="w-full">
        <div className="flex flex-col rounded-lg bg-gray-50 px-6 pb-4 pt-8 shadow-lg shadow-slate-300">
          <div className={`gap- mb-3 flex flex-row items-center text-2xl`}>
            <CurrencyDollarIcon className="pointer-events-none h-[24px] w-[24px]  text-gray-500 peer-focus:text-gray-900" />
            <h1>Curerncy</h1>
            <Link href="/dashboard/currency/add" className="ml-auto">
              <PlusIcon width={24} height={24} />
            </Link>
          </div>
          <nav>
            <ul className="flex flex-row space-x-3">
              {currencyNavLinks.map((item) => (
                <Link key={item.name} href={item.href}>
                  {item.name}
                </Link>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
