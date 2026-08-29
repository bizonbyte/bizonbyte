'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter as useCompatRouter } from 'next/compat/router';
import { isDutchPath } from '@/lib/locale';

export default function LocaleAttribute() {
  const appPathname = usePathname();
  const compatRouter = useCompatRouter();
  const pathname = appPathname || compatRouter?.asPath?.split(/[?#]/)[0] || '/';

  useEffect(() => {
    document.documentElement.lang = isDutchPath(pathname) ? 'nl' : 'en';
  }, [pathname]);

  return null;
}
