'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from '@/i18n/routing';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

export default function NavLinks() {
  const t = useTranslations('Home');
  const pathname = usePathname();
  // Map of links to display in the side navigation.
  // Depending on the size of the application, this would be stored in a database.
  const links = [
    { name: t('title'), href: '/dashboard', icon: HomeIcon },
    {
      name: t('invoices'),
      href: '/dashboard/invoices',
      icon: DocumentDuplicateIcon,
    },
    { name: t('customers'), href: '/dashboard/customers', icon: UserGroupIcon },
  ];
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue': pathname === link.href
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
