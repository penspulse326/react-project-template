import { Link, Outlet, useLocation } from 'react-router';

export default function Layout() {
  const location = useLocation();

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 font-sans text-slate-800">
      <div className="space-y-4 text-center">
        <Outlet />

        {
          location.pathname !== '/' && (
            <Link to="/" className="text-slate-600 underline hover:text-slate-900">
              Back to home
            </Link>
          )
        }
      </div>
    </main>
  );
}
