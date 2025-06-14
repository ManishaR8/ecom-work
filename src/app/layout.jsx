import { Inter } from 'next/font/google'
import './globals.css'
import { StoreProvider } from '../context/StoreContext'
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
        </StoreProvider>
      </body>
    </html>
  )
}
