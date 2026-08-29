'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter as useCompatRouter } from 'next/compat/router';
import { getAlternateLocalePath, isDutchPath } from '@/lib/locale';

export default function LanguageToggle() {
  const appPathname = usePathname();
  const compatRouter = useCompatRouter();
  const pathname = appPathname || compatRouter?.asPath?.split(/[?#]/)[0] || '/';
  const dutch = isDutchPath(pathname);
  const href = getAlternateLocalePath(pathname);

  return (
    <Link
      href={href}
      hrefLang={dutch ? 'en-NL' : 'nl-NL'}
      className="rounded-lg px-2.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-text-muted transition-colors duration-200 hover:bg-primary-500/10 hover:text-primary-200"
      aria-label={dutch ? 'Switch to English' : 'Schakel naar Nederlands'}
    >
      {dutch ? 'EN' : 'NL'}
    </Link>
  );
}
