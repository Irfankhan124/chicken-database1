# د افغانستان سوداګریز ERP سیستم

دا پروژه د افغانستان د کاروبارونو، ګدامونو، وارداتي/صادراتي شرکتونو، عمده پلورونکو او حسابدارۍ دفترونو لپاره ۱۰۰٪ پښتو، RTL، AFN، Next.js 15، Supabase او Firebase Hosting پر بنسټ جوړه شوې ده.

## مهمې ځانګړتیاوې

- ۱۰۰٪ پښتو انٹرفېس او RTL layout
- Supabase Auth، PostgreSQL، Realtime، Storage او RLS
- Dashboard، CRUD ماډیولونه، راپورونه، چاپ، PDF/Excel export UI
- Firebase Hosting configuration
- Enterprise-grade glassmorphism design

## چلول

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Supabase

`supabase/schema.sql` په Supabase SQL Editor کې اجرا کړئ، بیا `.env.local` کې keys واچوئ.

## Firebase Hosting

```bash
npm run build
firebase login
firebase deploy
```

دا پروژه د Firebase Web Frameworks integration لپاره `firebase.json` لري.
