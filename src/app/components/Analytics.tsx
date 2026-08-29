'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-4R7V57RQV0';
const CONSENT_STORAGE_KEY = 'bizonbyte_analytics_consent';

type EventParams = Record<string, string | number | boolean | undefined>;

type Gtag = {
  (command: 'consent', action: 'default' | 'update', params: Record<string, string | number>): void;
  (command: 'js', date: Date): void;
  (command: 'config', measurementId: string, params?: Record<string, unknown>): void;
  (command: 'event', eventName: string, params?: EventParams): void;
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: Gtag;
  }
}

function hasAnalyticsConsent() {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY) === 'granted';
  } catch {
    return false;
  }
}

export function trackEvent(eventName: string, params?: EventParams) {
  if (!hasAnalyticsConsent() || typeof window === 'undefined' || !window.gtag) {
    return;
  }

  try {
    window.gtag('event', eventName, params);
  } catch {
    // Analytics must never interrupt navigation or form submission.
  }
}

function updateConsent(value: 'granted' | 'denied') {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // The banner should still dismiss if browser storage is unavailable.
  }

  try {
    window.gtag?.('consent', 'update', {
      analytics_storage: value,
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  } catch {
    // GA may not have finished loading when the visitor clicks.
  }
}

export default function Analytics() {
  const [consent, setConsent] = useState<'granted' | 'denied' | null>(null);

  useEffect(() => {
    let savedConsent: string | null = null;
    try {
      savedConsent = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    } catch {
      // Keep the banner visible when browser storage is unavailable.
    }
    if (savedConsent === 'granted' || savedConsent === 'denied') {
      setConsent(savedConsent);
      if (savedConsent === 'granted') {
        updateConsent('granted');
      }
    }

    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const element = target?.closest<HTMLElement>('[data-analytics-event]');
      if (!element) {
        return;
      }

      trackEvent(element.dataset.analyticsEvent || 'interaction', {
        location: element.dataset.analyticsLocation,
      });
    };

    const viewed = new WeakSet<Element>();
    const viewObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || viewed.has(entry.target)) {
            return;
          }

          viewed.add(entry.target);
          const element = entry.target as HTMLElement;
          trackEvent(element.dataset.analyticsView || 'view');
        });
      },
      { threshold: 0.25 }
    );

    document.addEventListener('click', onClick);
    document
      .querySelectorAll<HTMLElement>('[data-analytics-view]')
      .forEach((element) => viewObserver.observe(element));

    return () => {
      document.removeEventListener('click', onClick);
      viewObserver.disconnect();
    };
  }, []);

  const chooseConsent = (value: 'granted' | 'denied') => {
    setConsent(value);
    updateConsent(value);
  };

  return (
    <>
      <Script id="google-consent-default" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});`}
      </Script>
      <Script
        id="google-analytics"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-config" strategy="afterInteractive">
        {`gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });`}
      </Script>
      {consent === null && (
        <div
          role="dialog"
          aria-label="Analytics consent"
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-sm rounded-xl border border-primary-900/50 bg-surface-950/95 p-3 shadow-[0_20px_60px_rgb(0_0_0_/_0.35)] backdrop-blur-md motion-safe:animate-[consent-fade-in_240ms_ease-out] sm:inset-x-auto sm:right-5 sm:bottom-5"
        >
          <p className="text-xs leading-5 text-text-secondary">
            We use optional Google Analytics to understand which pages and campaigns help people find bizonbyte.nl. You can accept or decline.
          </p>
          <div className="mt-2.5 flex gap-2">
            <button
              type="button"
              onClick={() => chooseConsent('denied')}
              className="button-secondary min-h-9 px-3 py-1.5 text-xs"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => chooseConsent('granted')}
              className="button-primary min-h-9 px-3 py-1.5 text-xs"
            >
              Accept analytics
            </button>
          </div>
        </div>
      )}
    </>
  );
}
