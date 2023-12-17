import Footer from '@/app/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })
 
export default function MyApp({ Component, pageProps }) {
  return (
        <main className="flex min-h-screen flex-col items-center justify-between px-24 pt-16">
          <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Bizon Logo"
                width={84}
                height={37}
                priority
              />
            </Link>
            <div>
              <Link href="/" className="hover:text-[#FA5700] transition-colors duration-200">Home</Link>
              <Link href="/blog" className="hover:text-[#FA5700] ml-4 transition-colors duration-200">Blog</Link>
            </div>
          </div>
            <Component {...pageProps} />
          <Footer />
        </main>
  )
}