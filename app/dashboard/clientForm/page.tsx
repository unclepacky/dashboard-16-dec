import ClientFormNav from '@/app/ui/dashboard/settings/ClientForm/ClientFormNav';
import ListInquiryForms from '@/app/ui/dashboard/settings/ClientForm/ListInquiryForms';
import React from 'react';

export default function ClientFormPage() {
  return (
    <div>
      <ClientFormNav />
      <ListInquiryForms />
    </div>
  );
}
