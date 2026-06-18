import { Outlet } from 'react-router';

export default function DashboardLayout() {
  return (
    <div className="flex flex-col items-center justify-center border-2">
      <h1>Dashboard Layout</h1>
      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
}
