import ConversioRate from '@/app/ui/dashboard/settings/currency/ConversionRate';
import Currency from '@/app/ui/dashboard/settings/currency/Currency';
import CurrencyNav from '@/app/ui/dashboard/settings/currency/CurrencyNav';
import { CurrencyDollarIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function CurrencyPage() {
  return (
    <>
      <CurrencyNav />
      <Currency />;
      <ConversioRate />
    </>
  );
}
