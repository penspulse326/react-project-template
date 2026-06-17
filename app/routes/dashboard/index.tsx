import { Link, Outlet } from 'react-router';
import UserProfileCard from '~/components/UserProfileCard';
import { useUserStore } from '~/store/userStore';

export default function DashboardIndexPage() {
  const { userProfile } = useUserStore();

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-center text-2xl font-bold">Dashboard</h1>
      {userProfile && <UserProfileCard profile={userProfile} />}

      <div className="mt-8 flex justify-center gap-4">
        <Link to="/" className="font-semibold underline transition-colors">
          Back to Home
        </Link>
        <Link to="./settings" className="font-semibold underline transition-colors">
          Settings
        </Link>
      </div>
      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
}
