import { useLoaderData } from 'react-router';
import { getUsers } from '~/services/user';

export async function clientLoader() {
  const response = await getUsers();
  return response;
}

export default function Example5Page() {
  const response = useLoaderData<typeof clientLoader>();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="m-4 text-4xl font-extrabold tracking-tight">[example-05] AJAX with Client Loader</h1>
      <p className="text-slate-400">Recommended</p>

      {!response.success && (
        <p>
          Error:
          {response.message}
        </p>
      )}

      {response.success && response.data.map(user => (
        <div key={user.id}>
          {user.firstName}
          {user.lastName}
          {user.age}
          {user.gender}
        </div>
      ))}
    </div>
  );
}
