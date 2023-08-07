import { Switch } from './components/locale-switcher';
import type { Metadata } from 'next'
import Link from 'next/link';
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '矿池 - 首页',
  description: '矿池挖矿首选',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Switch />
        <ul>
          <li>
            <Link href="/">Go to /</Link>
          </li>
          <li>
            <Link href="/subpage">Go to /subpage</Link>
          </li>
          <li>
            <Link href="/client">Go to /client</Link>
          </li>
        </ul>
        {children}
      </body>
    </html>
  )
}
