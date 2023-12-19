import Footer from '@/app/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { AppProps } from 'next/app';
import '@/app/globals.css'
import '@/app/blog.css'

const inter = Inter({ subsets: ['latin'] })
 
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
        <main className="flex min-h-screen flex-col items-center justify-between px-24 pt-16">
          <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Bizon Logo"
                width={84}
                height={37}
                priority
              />
            </Link>
          </div>
            <Component {...pageProps} />
          <Footer />
        </main>
  )
}