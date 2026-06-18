import { Link } from 'react-router';

export default function DashboardSettingsPage() {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Dashboard Settings</h1>
      <div className="mt-8 flex justify-center gap-4">
        <Link to="/dashboard" className="font-semibold underline transition-colors">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
