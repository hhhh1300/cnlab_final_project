import './globals.css';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Database Final',
  description: 'Our final project for database.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-tw">
      <body className={font.className}>
        <div className="p-0 m-0">{children}</div>
      </body>
    </html>
  );
}
