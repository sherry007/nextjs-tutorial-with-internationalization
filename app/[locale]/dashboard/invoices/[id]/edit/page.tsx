import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Invoice',
}
 
export default async function Page({ params }: { params: { id: string }}) {
  const id = params.id;
  const t = await getTranslations('Invoices');
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(), 
  ]);
  if (!invoice) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: t('title'), href: '/dashboard/invoices' },
          {
            label: t('editInvoice'),
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}