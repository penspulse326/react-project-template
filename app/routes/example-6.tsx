import { useLoaderData } from 'react-router';
import UserInfoCard from '~/components/UserInfoCard';
import { getUsers } from '~/services/users';

export async function clientLoader() {
  const response = await getUsers();
  return response;
}

export default function Example6Page() {
  const response = useLoaderData<typeof clientLoader>();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="m-4 text-4xl font-extrabold tracking-tight">[example-06] Dynamic Routing</h1>
      <p className="mb-4 max-w-md text-center text-sm text-slate-500">
        點擊下方任一卡片以載入該使用者的詳細資料。此頁面示範了 React Router v7 的動態路由系統。
      </p>

      {!response.success && (
        <p className="text-red-500">
          Error:
          {' '}
          {response.message}
        </p>
      )}

      <div className="flex flex-wrap justify-center gap-4">
        {response.success && response.data.map(user => (
          <UserInfoCard key={user.id} user={user} to={`/example-6/${user.id}`} />
        ))}
      </div>
    </div>
  );
}
