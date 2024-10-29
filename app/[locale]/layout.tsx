import '@/app/ui/global.css';
import { lusitana } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import LocaleSwitch from '@/app/ui/locale-switch';

export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html>
        <body className={`${lusitana.className} antialiased overflow-hidden`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <div className='text-right p-2'>
            <LocaleSwitch />
          </div>
          <main className='h-[calc(100vh-56px)] overflow-auto'>
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
