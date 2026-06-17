import { Link } from 'react-router';

export function meta() {
  return [
    { title: 'React Project Template' },
    { name: 'description', content: 'React Project Template' },
  ];
}

export default function Home() {
  return (
    <>
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
        React Project Template
      </h1>

      <p className="text-lg text-slate-400">
        這是使用 React Router v7 建立的基礎頁面
      </p>

      <div className="mt-8 flex flex-col justify-center gap-4">
        <Link to="/example-1" className="font-semibold underline transition-colors">
          [example-01] useState
        </Link>
        <Link to="/example-2" className="font-semibold underline transition-colors">
          [example-02] useEffect
        </Link>
        <Link to="/example-3" className="font-semibold underline transition-colors">
          [example-03] AJAX with useEffect  Component
        </Link>
        <Link to="/example-4" className="font-semibold underline transition-colors">
          [example-04] AJAX with useEffect
        </Link>
        <Link to="/example-5" className="font-semibold underline transition-colors">
          [example-05] AJAX with Client Loader
        </Link>
        <Link to="/example-6" className="font-semibold underline transition-colors">
          [example-06] Dynamic Routing
        </Link>
        <Link to="/example-7" className="font-semibold underline transition-colors">
          [example-07] React Hook Form
        </Link>
        <Link to="/example-8" className="font-semibold underline transition-colors">
          [example-08] Zustand
        </Link>
        <Link to="/example-9" className="font-semibold underline transition-colors">
          [example-09] Zod 驗證範例
        </Link>
        <Link to="/dashboard" className="font-semibold underline transition-colors">
          Dashboard
        </Link>
      </div>
    </>

  );
}
