"use client";
import { useEffect, useMemo, useState, type ReactNode } from "react";

const inp = "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-ink focus:border-mint focus:outline-none";
const btn = "rounded-lg bg-mint px-4 py-2 text-sm font-semibold text-white hover:opacity-90";
const num = (v: string) => (isFinite(parseFloat(v)) ? parseFloat(v) : 0);
const money = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const F = ({ l, children }: { l: string; children: ReactNode }) => (
  <label className="block text-sm font-medium text-ink">{l}<div className="mt-1">{children}</div></label>
);
const Stat = ({ l, v }: { l: string; v: string }) => (
  <div className="rounded-xl border border-border bg-surface2 p-4"><div className="text-xs text-muted">{l}</div><div className="mt-1 font-display text-xl font-bold text-ink">{v}</div></div>
);
const PrintCss = () => (
  <style>{`@media print{body *{visibility:hidden}#print-area,#print-area *{visibility:visible}#print-area{position:absolute;left:0;top:0;width:100%;border:0}}`}</style>
);

function Invoice() {
  const [f, setF] = useState({ from: "Your Business\nyou@email.com", to: "Client Name\nclient@email.com", no: "INV-001", cur: "$", tax: "0" });
  const [items, setItems] = useState([{ d: "Service", q: "1", p: "100" }]);
  const sub = items.reduce((s, i) => s + num(i.q) * num(i.p), 0);
  const tax = (sub * num(f.tax)) / 100;
  const set = (i: number, k: string, v: string) => setItems(items.map((it, x) => (x === i ? { ...it, [k]: v } : it)));
  return (
    <div className="grid gap-6 lg:grid-cols-2"><PrintCss />
      <div className="space-y-3">
        <F l="From"><textarea className={inp} rows={3} value={f.from} onChange={(e) => setF({ ...f, from: e.target.value })} /></F>
        <F l="Bill to"><textarea className={inp} rows={3} value={f.to} onChange={(e) => setF({ ...f, to: e.target.value })} /></F>
        <div className="grid grid-cols-3 gap-3">
          <F l="Invoice no."><input className={inp} value={f.no} onChange={(e) => setF({ ...f, no: e.target.value })} /></F>
          <F l="Currency"><input className={inp} value={f.cur} onChange={(e) => setF({ ...f, cur: e.target.value })} /></F>
          <F l="Tax %"><input className={inp} value={f.tax} onChange={(e) => setF({ ...f, tax: e.target.value })} /></F>
        </div>
        {items.map((it, i) => (
          <div key={i} className="grid grid-cols-[1fr_60px_80px] gap-2">
            <input className={inp} placeholder="Description" value={it.d} onChange={(e) => set(i, "d", e.target.value)} />
            <input className={inp} placeholder="Qty" value={it.q} onChange={(e) => set(i, "q", e.target.value)} />
            <input className={inp} placeholder="Price" value={it.p} onChange={(e) => set(i, "p", e.target.value)} />
          </div>
        ))}
        <div className="flex gap-2">
          <button className="rounded-lg border border-border px-4 py-2 text-sm" onClick={() => setItems([...items, { d: "", q: "1", p: "0" }])}>Add item</button>
          <button className={btn} onClick={() => window.print()}>Download PDF</button>
        </div>
      </div>
      <div id="print-area" className="rounded-xl border border-border bg-white p-6 text-sm text-ink">
        <div className="flex justify-between"><h3 className="font-display text-2xl font-bold">INVOICE</h3><span>{f.no}</span></div>
        <div className="mt-4 grid grid-cols-2 gap-4"><pre className="whitespace-pre-wrap font-body">{f.from}</pre><pre className="whitespace-pre-wrap font-body">{f.to}</pre></div>
        <table className="mt-6 w-full text-left"><thead><tr className="border-b border-border"><th className="py-2">Item</th><th>Qty</th><th>Price</th><th className="text-right">Total</th></tr></thead>
          <tbody>{items.map((i, x) => (<tr key={x} className="border-b border-border"><td className="py-2">{i.d}</td><td>{i.q}</td><td>{f.cur}{money(num(i.p))}</td><td className="text-right">{f.cur}{money(num(i.q) * num(i.p))}</td></tr>))}</tbody></table>
        <div className="mt-4 ml-auto w-48 space-y-1"><div className="flex justify-between"><span>Subtotal</span><span>{f.cur}{money(sub)}</span></div><div className="flex justify-between"><span>Tax</span><span>{f.cur}{money(tax)}</span></div><div className="flex justify-between font-bold"><span>Total</span><span>{f.cur}{money(sub + tax)}</span></div></div>
      </div>
    </div>
  );
}

function Profit() {
  const [c, setC] = useState("20"); const [p, setP] = useState("50"); const [fee, setFee] = useState("3"); const [ship, setShip] = useState("0"); const [t, setT] = useState("40");
  const cost = num(c) + num(ship) + (num(p) * num(fee)) / 100; const profit = num(p) - cost;
  const need = (num(c) + num(ship)) / (1 - num(fee) / 100 - num(t) / 100);
  return (<div className="grid gap-6 lg:grid-cols-2"><div className="grid grid-cols-2 gap-3">
    <F l="Product cost"><input className={inp} value={c} onChange={(e) => setC(e.target.value)} /></F>
    <F l="Selling price"><input className={inp} value={p} onChange={(e) => setP(e.target.value)} /></F>
    <F l="Fees %"><input className={inp} value={fee} onChange={(e) => setFee(e.target.value)} /></F>
    <F l="Shipping cost"><input className={inp} value={ship} onChange={(e) => setShip(e.target.value)} /></F>
    <F l="Target margin %"><input className={inp} value={t} onChange={(e) => setT(e.target.value)} /></F></div>
    <div className="grid grid-cols-2 gap-3"><Stat l="Profit per sale" v={money(profit)} /><Stat l="Margin" v={`${p && num(p) ? money((profit / num(p)) * 100) : "0.00"}%`} />
      <Stat l="Markup" v={`${cost ? money((profit / cost) * 100) : "0.00"}%`} /><Stat l="Price for target margin" v={isFinite(need) && need > 0 ? money(need) : "n/a"} /></div></div>);
}

function Qr() {
  const [txt, setTxt] = useState("https://www.makemystore.online"); const [size, setSize] = useState("300"); const [src, setSrc] = useState("");
  useEffect(() => { let ok = true; import("qrcode").then((q) => q.toDataURL(txt || " ", { width: num(size) || 300, margin: 2 })).then((u) => ok && setSrc(u)).catch(() => {}); return () => { ok = false; }; }, [txt, size]);
  return (<div className="grid gap-6 lg:grid-cols-2"><div className="space-y-3">
    <F l="Link or text"><textarea className={inp} rows={3} value={txt} onChange={(e) => setTxt(e.target.value)} /></F>
    <F l="Size (px)"><select className={inp} value={size} onChange={(e) => setSize(e.target.value)}>{["200", "300", "500", "1000"].map((s) => <option key={s}>{s}</option>)}</select></F>
    <a className={`${btn} inline-block`} href={src} download="qr-code.png">Download PNG</a></div>
    <div className="flex items-center justify-center rounded-xl border border-border p-6">{/* eslint-disable-next-line @next/next/no-img-element */}{src && <img src={src} alt="Generated QR code" className="h-auto max-w-full" width={240} height={240} />}</div></div>);
}

function Cv() {
  const [d, setD] = useState({ name: "Your Name", title: "Job Title", email: "you@email.com", phone: "+00 000 000 000", sum: "Short summary of your experience and strengths.", exp: "Company, Role, 2022-Present\nDid something measurable", edu: "University, Degree, 2018", skills: "Skill one, Skill two" });
  const k = (x: keyof typeof d, l: string, rows = 0) => (<F l={l}>{rows ? <textarea className={inp} rows={rows} value={d[x]} onChange={(e) => setD({ ...d, [x]: e.target.value })} /> : <input className={inp} value={d[x]} onChange={(e) => setD({ ...d, [x]: e.target.value })} />}</F>);
  const L = ({ t, v }: { t: string; v: string }) => (<div className="mt-4"><h4 className="border-b border-border font-bold">{t}</h4>{v.split("\n").map((x, i) => <p key={i} className="mt-1">{x}</p>)}</div>);
  return (<div className="grid gap-6 lg:grid-cols-2"><PrintCss /><div className="space-y-3">{k("name", "Name")}{k("title", "Job title")}{k("email", "Email")}{k("phone", "Phone")}{k("sum", "Summary", 3)}{k("exp", "Experience (one per line)", 4)}{k("edu", "Education", 2)}{k("skills", "Skills", 2)}<button className={btn} onClick={() => window.print()}>Download PDF</button></div>
    <div id="print-area" className="rounded-xl border border-border bg-white p-6 text-sm text-ink"><h3 className="font-display text-2xl font-bold">{d.name}</h3><p>{d.title}</p><p className="text-muted">{d.email} | {d.phone}</p><L t="Summary" v={d.sum} /><L t="Experience" v={d.exp} /><L t="Education" v={d.edu} /><L t="Skills" v={d.skills} /></div></div>);
}

const PRE = ["Nova", "Pure", "Bright", "Urban", "Swift", "Prime", "Bold", "Zen", "Luma", "True", "Neo", "Alpha"];
const SUF = ["ly", "ify", "hub", "works", "nest", "mart", "labs", "co", "base", "loop", "stack", "ora"];
function Names() {
  const [w, setW] = useState("coffee"); const [seed, setSeed] = useState(1);
  const list = useMemo(() => { const b = (w.trim() || "brand").replace(/\s+/g, ""); const cap = b[0].toUpperCase() + b.slice(1); const r = (i: number) => (i * 7919 + seed * 104729) % 9973;
    return Array.from({ length: 12 }, (_, i) => { const a = PRE[r(i) % PRE.length], s = SUF[r(i + 50) % SUF.length]; return [a + cap, cap + s, a + cap + s][i % 3]; }); }, [w, seed]);
  return (<div className="space-y-4"><div className="flex gap-2"><input className={inp} value={w} onChange={(e) => setW(e.target.value)} placeholder="Keyword" /><button className={btn} onClick={() => setSeed(seed + 1)}>Generate</button></div>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{list.map((n, i) => <div key={i} className="rounded-xl border border-border bg-surface2 p-3 text-center font-display font-semibold text-ink">{n}</div>)}</div></div>);
}

const FB: Record<string, number> = { USD: 1, GBP: 0.76, EUR: 0.87, AED: 3.67, PKR: 280, AUD: 1.5, CAD: 1.38, INR: 83, SAR: 3.75 };
function Currency() {
  const [rates, setRates] = useState(FB); const [a, setA] = useState("100"); const [from, setFrom] = useState("USD"); const [to, setTo] = useState("PKR");
  useEffect(() => { fetch("https://open.er-api.com/v6/latest/USD").then((r) => r.json()).then((j) => j?.rates && setRates(j.rates)).catch(() => {}); }, []);
  const out = (num(a) / (rates[from] || 1)) * (rates[to] || 1); const keys = Object.keys(rates).sort();
  const Sel = ({ v, s }: { v: string; s: (x: string) => void }) => <select className={inp} value={v} onChange={(e) => s(e.target.value)}>{keys.map((k) => <option key={k}>{k}</option>)}</select>;
  return (<div className="grid gap-6 lg:grid-cols-2"><div className="grid grid-cols-3 gap-3"><F l="Amount"><input className={inp} value={a} onChange={(e) => setA(e.target.value)} /></F><F l="From"><Sel v={from} s={setFrom} /></F><F l="To"><Sel v={to} s={setTo} /></F></div>
    <Stat l={`${a} ${from} equals`} v={`${money(out)} ${to}`} /></div>);
}

function Roi() {
  const [ch, setCh] = useState("1000"); const [mins, setMins] = useState("5"); const [rate, setRate] = useState("10"); const [share, setShare] = useState("70"); const [bot, setBot] = useState("50");
  const hrs = (num(ch) * num(mins) * num(share)) / 100 / 60; const save = hrs * num(rate);
  return (<div className="grid gap-6 lg:grid-cols-2"><div className="grid grid-cols-2 gap-3">
    <F l="Chats per month"><input className={inp} value={ch} onChange={(e) => setCh(e.target.value)} /></F><F l="Minutes per chat"><input className={inp} value={mins} onChange={(e) => setMins(e.target.value)} /></F>
    <F l="Staff cost per hour"><input className={inp} value={rate} onChange={(e) => setRate(e.target.value)} /></F><F l="Handled by bot %"><input className={inp} value={share} onChange={(e) => setShare(e.target.value)} /></F>
    <F l="Bot monthly cost"><input className={inp} value={bot} onChange={(e) => setBot(e.target.value)} /></F></div>
    <div className="grid grid-cols-2 gap-3"><Stat l="Hours saved / month" v={money(hrs)} /><Stat l="Gross saving / month" v={money(save)} /><Stat l="Net saving / month" v={money(save - num(bot))} /><Stat l="Net saving / year" v={money((save - num(bot)) * 12)} /></div></div>);
}

function Compress() {
  const [q, setQ] = useState(75); const [file, setFile] = useState<File | null>(null); const [out, setOut] = useState<{ url: string; size: number } | null>(null);
  useEffect(() => { if (!file) return; const img = new Image(); const u = URL.createObjectURL(file);
    img.onload = () => { const c = document.createElement("canvas"); c.width = img.width; c.height = img.height; const x = c.getContext("2d"); if (!x) return; x.fillStyle = "#fff"; x.fillRect(0, 0, c.width, c.height); x.drawImage(img, 0, 0);
      c.toBlob((b) => b && setOut({ url: URL.createObjectURL(b), size: b.size }), "image/jpeg", q / 100); URL.revokeObjectURL(u); }; img.src = u; }, [file, q]);
  const kb = (n: number) => `${(n / 1024).toFixed(1)} KB`;
  return (<div className="space-y-4"><input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className={inp} />
    <F l={`Quality: ${q}%`}><input type="range" min={20} max={95} value={q} onChange={(e) => setQ(+e.target.value)} className="w-full" /></F>
    {file && out && (<div className="grid grid-cols-3 gap-3"><Stat l="Original" v={kb(file.size)} /><Stat l="Compressed" v={kb(out.size)} /><Stat l="Saved" v={`${Math.max(0, Math.round((1 - out.size / file.size) * 100))}%`} /></div>)}
    {out && <a className={`${btn} inline-block`} href={out.url} download="compressed.jpg">Download image</a>}</div>);
}

function Shopify() {
  const [p, setP] = useState("50"); const [c, setC] = useState("15"); const [pct, setPct] = useState("2.9"); const [fix, setFix] = useState("0.30"); const [tx, setTx] = useState("0"); const [sh, setSh] = useState("4"); const [ad, setAd] = useState("8");
  const fees = (num(p) * (num(pct) + num(tx))) / 100 + num(fix); const profit = num(p) - num(c) - fees - num(sh) - num(ad);
  return (<div className="grid gap-6 lg:grid-cols-2"><div className="grid grid-cols-2 gap-3">
    <F l="Selling price"><input className={inp} value={p} onChange={(e) => setP(e.target.value)} /></F><F l="Product cost"><input className={inp} value={c} onChange={(e) => setC(e.target.value)} /></F>
    <F l="Payment fee %"><input className={inp} value={pct} onChange={(e) => setPct(e.target.value)} /></F><F l="Fixed fee per order"><input className={inp} value={fix} onChange={(e) => setFix(e.target.value)} /></F>
    <F l="Extra transaction fee %"><input className={inp} value={tx} onChange={(e) => setTx(e.target.value)} /></F><F l="Shipping cost"><input className={inp} value={sh} onChange={(e) => setSh(e.target.value)} /></F>
    <F l="Ad cost per order"><input className={inp} value={ad} onChange={(e) => setAd(e.target.value)} /></F></div>
    <div className="grid grid-cols-2 gap-3"><Stat l="Total fees" v={money(fees)} /><Stat l="Net profit per order" v={money(profit)} /><Stat l="Net margin" v={`${num(p) ? money((profit / num(p)) * 100) : "0.00"}%`} /><Stat l="Profit per 100 orders" v={money(profit * 100)} /></div></div>);
}

function Cod() {
  const [p, setP] = useState("40"); const [c, setC] = useState("12"); const [sh, setSh] = useState("3"); const [cod, setCod] = useState("2"); const [ret, setRet] = useState("25"); const [rs, setRs] = useState("3"); const [ad, setAd] = useState("6");
  const r = Math.min(100, Math.max(0, num(ret))) / 100; const profit = (1 - r) * (num(p) - num(c) - (num(p) * num(cod)) / 100) - num(sh) - r * num(rs) - num(ad);
  return (<div className="grid gap-6 lg:grid-cols-2"><div className="grid grid-cols-2 gap-3">
    <F l="Selling price"><input className={inp} value={p} onChange={(e) => setP(e.target.value)} /></F><F l="Product cost"><input className={inp} value={c} onChange={(e) => setC(e.target.value)} /></F>
    <F l="Delivery fee"><input className={inp} value={sh} onChange={(e) => setSh(e.target.value)} /></F><F l="COD handling fee %"><input className={inp} value={cod} onChange={(e) => setCod(e.target.value)} /></F>
    <F l="Returned parcels %"><input className={inp} value={ret} onChange={(e) => setRet(e.target.value)} /></F><F l="Return shipping fee"><input className={inp} value={rs} onChange={(e) => setRs(e.target.value)} /></F>
    <F l="Ad cost per order"><input className={inp} value={ad} onChange={(e) => setAd(e.target.value)} /></F></div>
    <div className="grid grid-cols-2 gap-3"><Stat l="Profit per order" v={money(profit)} /><Stat l="Profit per 100 orders" v={money(profit * 100)} /><Stat l="Delivered parcels" v={`${money((1 - r) * 100)}%`} /><Stat l="Status" v={profit > 0 ? "Profitable" : "Losing money"} /></div></div>);
}

function Meta() {
  const [t, setT] = useState("Free invoice generator"); const [b, setB] = useState("create and download PDF invoices in seconds"); const [a, setA] = useState("No sign-up needed."); const [title, setTitle] = useState("Free Invoice Generator | MakeMyStore");
  const draft = `${t}: ${b}. ${a}`.replace(/\s+/g, " ").trim(); const [edit, setEdit] = useState<string | null>(null); const d = edit ?? draft;
  const tag = (n: number, max: number) => <span className={n > max ? "text-red-600" : "text-mint"}>{n}/{max}</span>;
  return (<div className="grid gap-6 lg:grid-cols-2"><div className="space-y-3">
    <F l="Page topic"><input className={inp} value={t} onChange={(e) => { setT(e.target.value); setEdit(null); }} /></F>
    <F l="Main benefit"><input className={inp} value={b} onChange={(e) => { setB(e.target.value); setEdit(null); }} /></F>
    <F l="Call to action"><input className={inp} value={a} onChange={(e) => { setA(e.target.value); setEdit(null); }} /></F>
    <F l="Page title"><input className={inp} value={title} onChange={(e) => setTitle(e.target.value)} /></F><p className="text-xs text-muted">Title length {tag(title.length, 60)}</p></div>
    <div className="space-y-3"><F l="Meta description (editable)"><textarea className={inp} rows={4} value={d} onChange={(e) => setEdit(e.target.value)} /></F><p className="text-xs text-muted">Description length {tag(d.length, 160)}</p>
      <div className="rounded-xl border border-border bg-white p-4"><div className="text-xs text-muted">www.makemystore.online</div><div className="text-lg text-blue-700">{title.slice(0, 60)}</div><div className="text-sm text-ink">{d.slice(0, 160)}</div></div></div></div>);
}

function Rate() {
  const [g, setG] = useState("3000"); const [ex, setEx] = useState("500"); const [tax, setTax] = useState("20"); const [h, setH] = useState("25"); const [off, setOff] = useState("5");
  const yearly = ((num(g) + num(ex)) * 12) / (1 - Math.min(num(tax), 90) / 100); const hours = num(h) * Math.max(1, 52 - num(off)); const rate = hours ? yearly / hours : 0;
  return (<div className="grid gap-6 lg:grid-cols-2"><div className="grid grid-cols-2 gap-3">
    <F l="Target monthly take-home"><input className={inp} value={g} onChange={(e) => setG(e.target.value)} /></F><F l="Monthly expenses"><input className={inp} value={ex} onChange={(e) => setEx(e.target.value)} /></F>
    <F l="Tax %"><input className={inp} value={tax} onChange={(e) => setTax(e.target.value)} /></F><F l="Billable hours / week"><input className={inp} value={h} onChange={(e) => setH(e.target.value)} /></F>
    <F l="Weeks off per year"><input className={inp} value={off} onChange={(e) => setOff(e.target.value)} /></F></div>
    <div className="grid grid-cols-2 gap-3"><Stat l="Hourly rate" v={money(rate)} /><Stat l="Day rate (6 billable hrs)" v={money(rate * 6)} /><Stat l="Yearly revenue needed" v={money(yearly)} /><Stat l="Billable hours / year" v={String(Math.round(hours))} /></div></div>);
}

export const widgets: Record<string, () => JSX.Element> = {
  "invoice-generator": Invoice, "profit-margin-calculator": Profit, "qr-code-generator": Qr, "cv-builder": Cv,
  "business-name-generator": Names, "currency-converter": Currency, "chatbot-roi-calculator": Roi, "image-compressor": Compress, "shopify-fee-calculator": Shopify, "cod-profit-calculator": Cod, "meta-description-generator": Meta, "freelance-rate-calculator": Rate,
};
