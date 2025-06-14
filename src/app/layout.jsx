import { Inter } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '../context/StoreContext'

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
