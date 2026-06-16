import type { ClientLoaderFunctionArgs } from 'react-router';
import type { User } from '~/services/users';
import type { ApiResponse } from '~/types/api';
import { Link, useLoaderData } from 'react-router';
import UserInfoCard from '~/components/UserInfoCard';
import { getUser } from '~/services/users';

export async function clientLoader({ params }: ClientLoaderFunctionArgs): Promise<ApiResponse<User>> {
  const { id } = params;
  if (!id) {
    return { success: false, error: new Error('Missing ID'), message: '找不到使用者 ID' };
  }
  const response = await getUser(id);
  return response;
}

export default function Example6DetailPage() {
  const response = useLoaderData<typeof clientLoader>();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="m-4 text-4xl font-extrabold tracking-tight">[example-06] Detail Page</h1>

      {!response.success && (
        <p className="text-red-500">
          Error:
          {' '}
          {response.message}
        </p>
      )}

      {response.success && (
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-slate-500">
            目前匹配到的動態路由參數 ID 為:
            {' '}
            <strong>{response.data.id}</strong>
          </p>
          <UserInfoCard user={response.data} />
        </div>
      )}

      <Link to="/example-6" className="mt-4 text-slate-600 underline hover:text-slate-900">
        Back to list
      </Link>
    </div>
  );
}
