import { useLoaderData } from 'react-router';
import UserInfoCard from '~/components/UserInfoCard';
import { getUsers } from '~/services/users';

export async function clientLoader() {
  const response = await getUsers();
  return response;
}

export default function Example5Page() {
  const response = useLoaderData<typeof clientLoader>();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="m-4 text-4xl font-extrabold tracking-tight">[example-05] Component</h1>

      {!response.success && (
        <p>
          Error:
          {response.message}
        </p>
      )}

      <div className="flex flex-wrap justify-center gap-2">
        {' '}
        {response.success && response.data.map(user => (
          <UserInfoCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
