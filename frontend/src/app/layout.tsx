import './globals.css';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import ToasterContext from '@/context/ToasterProvider';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EngageNTU',
  description: 'Our Final project.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-tw">
      <head>
        <link rel="icon" href="/images/logo.png"/>
      </head>
      <body className={font.className}>
        <ToasterContext />
        <div className="p-0 m-0">{children}</div>
      </body>
    </html>
  );
}
