"use client";

import { motion } from 'framer-motion';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Calculator, Warehouse, Users, WalletCards, FileText, Search, Bell, ShieldCheck, Printer } from 'lucide-react';

const afn = (n: number) => `${new Intl.NumberFormat('fa-AF').format(n)} افغانۍ`;

const cards = [
  ['ټوله موجودي', 2850000, 'ګدام او نغدې موجودي'],
  ['ټول عاید', 1425000, 'د میاشتې عاید'],
  ['ټول مصارف', 438000, 'عملیاتي مصارف'],
  ['خالصه ګټه', 987000, 'اتومات محاسبه'],
  ['ټول طلبونه', 315000, 'پر مشتریانو پاتې'],
  ['ټول بدهکاري', 185000, 'پر شرکت پاتې'],
  ['د نن ورځې عاید', 56000, 'نن ثبت شوی'],
  ['د نن ورځې مصارف', 12000, 'نن مصرف شوی'],
  ['د ګدام موجودي', 8200, 'کیلو ګرامه'],
  ['د کارکوونکو معاشونه', 164000, 'دا میاشت']
];

const months = ['حمل','ثور','جوزا','سرطان','اسد','سنبله'];
const chartData = months.map((m, i) => ({ میاشت: m, عاید: [220,310,420,390,510,650][i], مصارف: [80,110,160,140,190,210][i], ګټه: [140,200,260,250,320,440][i] }));

const modules = [
  { title: 'پلورونکو صورت حساب', icon: WalletCards, fields: ['موټروان نوم','پلورونکي نوم','بار وزن','فی قیمت','فی کمیشن','مجموعه کمیشن','مجموعه قیمت','رسیدات','باقي مانده','نېټه','یادښت'] },
  { title: 'ګدام وارده صورت حساب', icon: Warehouse, fields: ['موټروان نوم','پلورونکي نوم','بار وزن','فی قیمت','مجموعه قیمت','رسیدات','باقي مانده','خالي وزن','ضایعات','کرایه','مصارف','ګدام مصارف','کمیشن','اضافه ګټه','تمام شد قیمت'] },
  { title: 'ګدام صادره صورت حساب', icon: Calculator, fields: ['د مشتری نوم','ګدام موجودي','ګدام اخراج','بار وزن','فی قیمت','مجموعه قیمت','رسیدات','باقي مانده','نېټه'] },
  { title: 'کارکوونکي', icon: Users, fields: ['نوم','د پلار نوم','دنده','ټیلیفون','پته','د استخدام نېټه','میاشتنی معاش','حالت'] },
  { title: 'معاشونه', icon: FileText, fields: ['کارکوونکی','میاشت','میاشتنی معاش','ورکړل شوې اندازه','پاتې اندازه','نېټه'] }
];

const reports = ['ورځنی راپور','اوونیز راپور','میاشتنی راپور','کلنی راپور','د ګټې راپور','د مصارفو راپور','د پلور راپور','د ګدام راپور','د معاشونو راپور','د طلبونو راپور','د بدهکارۍ راپور'];
const rows = [
  ['احمد ولي','عبدالله سوداګر','۱،۲۵۰','۸۵','۱۰۶،۲۵۰','۶۰،۰۰۰','۴۶،۲۵۰'],
  ['نور خان','حبیب شرکت','۸۶۰','۹۰','۷۷،۴۰۰','۴۰،۰۰۰','۳۷،۴۰۰'],
  ['جمال','رحمت الله','۱،۰۳۰','۸۸','۹۰،۶۴۰','۸۵،۰۰۰','۵،۶۴۰']
];

export default function Page() {
  return (
    <main style={{ minHeight:'100vh', direction:'rtl', background:'radial-gradient(circle at top right,#0f766e55,transparent 35%),linear-gradient(135deg,#04130f,#0b1f33 55%,#111827)', color:'white', fontFamily:'Tahoma, Arial, sans-serif', padding:24 }}>
      <section style={{ maxWidth:1440, margin:'0 auto' }}>
        <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} style={{ display:'grid', gridTemplateColumns:'280px 1fr', gap:22 }}>
          <aside style={panel({position:'sticky', top:24, height:'calc(100vh - 48px)'})}>
            <div style={{fontSize:26, fontWeight:900, lineHeight:1.6}}>د افغانستان سوداګریز ERP</div>
            <div style={{color:'#fde68a', marginTop:8}}>حسابداري، ګدام، پلور او مالي راپورونه</div>
            {['ډشبورډ','پلورونکي','ګدام وارده','ګدام صادره','کارکوونکي','معاشونه','راپورونه','تنظیمات'].map((x,i)=><div key={x} style={{marginTop:14,padding:'13px 14px',borderRadius:18,background:i===0?'linear-gradient(90deg,#059669,#1d4ed8)':'rgba(255,255,255,.06)',fontWeight:700}}>{x}</div>)}
            <div style={{marginTop:26, padding:16, borderRadius:22, background:'rgba(245,197,66,.12)', border:'1px solid rgba(245,197,66,.32)'}}><ShieldCheck size={22}/> د رولونو خوندي لاسرسی: مدیر، مسؤل، کارکوونکی</div>
          </aside>

          <div>
            <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:16,marginBottom:22}}>
              <div><h1 style={{fontSize:42, margin:0}}>ډشبورډ</h1><p style={{color:'#cbd5e1'}}>پریمیم افغاني ERP، ۱۰۰٪ پښتو او AFN</p></div>
              <div style={{display:'flex', gap:12}}><button style={btn()}><Search size={18}/> چټک لټون</button><button style={btn(true)}><Bell size={18}/> خبرتیاوې</button></div>
            </header>

            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))',gap:16}}>
              {cards.map(([t,v,s],i)=><motion.div key={String(t)} initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:i*.03}} style={panel({})}><div style={{color:'#cbd5e1'}}>{t}</div><div style={{fontSize:26,fontWeight:900,marginTop:8}}>{typeof v==='number' && i!==8 ? afn(v) : `${v} کیلو`}</div><div style={{color:'#86efac',fontSize:13,marginTop:8}}>{s}</div></motion.div>)}
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18,marginTop:18}}>
              <section style={panel({height:360})}><h2>د عایداتو او مصارفو ګراف</h2><ResponsiveContainer width="100%" height={280}><AreaChart data={chartData}><CartesianGrid strokeDasharray="3 3" stroke="#ffffff22"/><XAxis dataKey="میاشت" stroke="#cbd5e1"/><YAxis stroke="#cbd5e1"/><Tooltip/><Area type="monotone" dataKey="عاید" stroke="#34d399" fill="#34d39955"/><Area type="monotone" dataKey="مصارف" stroke="#60a5fa" fill="#60a5fa44"/></AreaChart></ResponsiveContainer></section>
              <section style={panel({height:360})}><h2>د ګټې ګراف</h2><ResponsiveContainer width="100%" height={280}><BarChart data={chartData}><CartesianGrid strokeDasharray="3 3" stroke="#ffffff22"/><XAxis dataKey="میاشت" stroke="#cbd5e1"/><YAxis stroke="#cbd5e1"/><Tooltip/><Bar dataKey="ګټه" fill="#facc15" radius={[12,12,0,0]}/></BarChart></ResponsiveContainer></section>
            </div>

            <section style={panel({marginTop:18})}><h2>اصلي ماډیولونه</h2><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:14}}>{modules.map(m=>{const Icon=m.icon;return <div key={m.title} style={{padding:18,borderRadius:22,background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.12)'}}><Icon/><h3>{m.title}</h3><div style={{display:'flex',flexWrap:'wrap',gap:8}}>{m.fields.map(f=><span key={f} style={{fontSize:12,padding:'6px 10px',borderRadius:999,background:'rgba(255,255,255,.08)'}}>{f}</span>)}</div></div>})}</div></section>

            <section style={panel({marginTop:18, overflowX:'auto'})}><h2>پلورونکو صورت حساب</h2><table style={{width:'100%',borderCollapse:'collapse',minWidth:760}}><thead><tr>{['موټروان','پلورونکی','بار وزن','فی قیمت','مجموعه قیمت','رسیدات','باقي'].map(h=><th key={h} style={th()}>{h}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={i}>{r.map(c=><td key={c} style={td()}>{c}</td>)}</tr>)}</tbody></table></section>

            <section style={panel({marginTop:18})}><h2>راپورونه او صادرات</h2><div style={{display:'flex',flexWrap:'wrap',gap:10}}>{reports.map(r=><button key={r} style={btn()}>{r}</button>)}<button style={btn(true)}>PDF صادرول</button><button style={btn(true)}>Excel صادرول</button><button style={btn(true)}><Printer size={18}/> چاپ کول</button></div></section>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

function panel(extra: React.CSSProperties){ return { background:'rgba(255,255,255,.08)', border:'1px solid rgba(255,255,255,.16)', borderRadius:28, padding:20, boxShadow:'0 24px 80px rgba(0,0,0,.25)', backdropFilter:'blur(18px)', ...extra } as React.CSSProperties; }
function btn(primary=false){ return { display:'inline-flex', alignItems:'center', gap:8, border:0, borderRadius:16, padding:'12px 16px', color:'white', fontWeight:800, background: primary?'linear-gradient(90deg,#059669,#1d4ed8)':'rgba(255,255,255,.10)', cursor:'pointer' } as React.CSSProperties; }
function th(){ return {textAlign:'right', padding:14, color:'#fde68a', borderBottom:'1px solid rgba(255,255,255,.18)'} as React.CSSProperties; }
function td(){ return {padding:14, borderBottom:'1px solid rgba(255,255,255,.10)'} as React.CSSProperties; }
