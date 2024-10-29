'use client';

import Link from 'next/link';
import { useTransition } from 'react';
import clsx from 'clsx';
import { useLocale } from 'next-intl';
import { usePathname, useRouter, Locale } from '@/i18n/routing';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文' },
];

export default function LocaleSwitch() {
  const pathname = usePathname();
  const router = useRouter();
  const currLocale = useLocale();
  const [isPending, startTransition] = useTransition();

  function onSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = e.target.value;
    startTransition(() => {
      router.replace(
        `/${pathname}`,
        { locale: nextLocale as Locale }
      )
    });
  }

  return (
    <div className='grid items-center'>
      <div>
        <GlobeAltIcon className="w-6 h-6 inline-block" />
        <label
          className={clsx(
            'relative text-gray-600',
            isPending && 'transition-opacity [&:disabled]:opacity-30'
          )}
        >
          <select
            className="inline-flex appearance-none bg-transparent py-2 pl-2 pr-8 border-none"
            defaultValue={currLocale}
            disabled={isPending}
            onChange={onSelectChange}
            name='locale_switch'
          >
            {languages.map((lang) => (
              <option key={`${lang.code}_${lang.label}`} value={lang.code}>{lang.label}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
