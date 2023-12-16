import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import Footer from './components/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BizonByte | Leading AI & Tech Solutions in the Netherlands',
  description: 'Empowering businesses and individuals in the Netherlands with innovative AI and technology solutions. Dive into the future of digital transformation with us.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
