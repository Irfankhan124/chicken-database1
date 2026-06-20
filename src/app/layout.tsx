import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'د افغانستان سوداګریز ERP',
  description: 'پښتو حسابداري، ګدام، پلور، مالي مدیریت او راپورونه'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ps" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
