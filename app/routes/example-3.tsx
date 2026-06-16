import { useLoaderData } from 'react-router';
import { getUsers } from '~/services/users';

export async function clientLoader() {
  const response = await getUsers();
  return response;
}

export default function Example3Page() {
  const response = useLoaderData<typeof clientLoader>();
  // const [users, setUsers] = useState<User[]>([]);

  // async function handleGetUsers() {
  //     const data = await getUsers();
  //     setUsers(data);
  // }

  // useEffect(() => {
  //     handleGetUsers();
  // }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Users Index Page</h1>
      <button type="button" className="rounded bg-blue-500 px-4 py-2 text-white">Button</button>

      {!response.success && (
        <p>Error: 取得資料失敗</p>
      )}

      {response.success && response.data.map(user => (
        <div key={user.id}>
          {user.firstName}
          {' '}
          {user.lastName}
          {' '}
          {user.age}
          {' '}
          {user.gender}
        </div>
      ))}
    </div>
  );
}
