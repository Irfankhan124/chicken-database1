import React from 'react';
import './styles.css';

export const metadata = {
  title: 'د افغانستان سوداګریز ERP',
  description: 'پښتو حسابداري، ګدام، پلور، مالي مدیریت او راپورونه'
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return React.createElement('html', { lang: 'ps', dir: 'rtl' }, React.createElement('body', null, props.children));
}
