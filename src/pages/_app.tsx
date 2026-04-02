import Footer from '@/app/components/Footer'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { AppProps } from 'next/app';
import '@/app/globals.css'
import '@/app/blog.css'

const inter = Inter({ subsets: ['latin'] })
 
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="flex min-h-screen flex-col items-stretch justify-between pt-16">
      <div className="w-full px-4 md:px-12 lg:px-24">
        <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
          <Link href="/">
            <img src="/logo.svg" alt="Bizon Logo" width={84} height={37} />
          </Link>
        </div>
        <Component {...pageProps} />
      </div>
      <Footer />
    </main>
  )
}