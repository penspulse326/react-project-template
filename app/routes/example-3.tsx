import type { User } from '~/services/users';
import { useEffect, useState } from 'react';
import { Button } from '~/components/ui/button';
import { getUsers, getUsersError } from '~/services/users';

export default function Example3Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleGetUsersError() {
    if (loading) {
      return;
    }

    setLoading(true);

    const response = await getUsersError();

    if (response.success) {
      setUsers(response.data);
      setErrorMessage('');
    } else {
      setErrorMessage(response.message);
    }

    setLoading(false);
  }

  async function handleGetUsers() {
    if (loading) {
      return;
    }

    setLoading(true);

    const response = await getUsers();

    if (response.success) {
      setUsers(response.data);
      setErrorMessage('');
    } else {
      setErrorMessage(response.message);
    }

    setLoading(false);
  }

  useEffect(() => {
    handleGetUsersError();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="m-4 text-4xl font-extrabold tracking-tight">[example-04] AJAX with useEffect</h1>
      <p className="text-slate-400">Not Recommended</p>

      <Button type="button" onClick={handleGetUsers}>Button</Button>

      {
        loading
          ? (
              <p>Loading...</p>
            )
          : (errorMessage)
              ? (
                  <p>
                    Error:
                    {errorMessage}
                  </p>
                )
              : (
                  users.map(user => (
                    <div key={user.id}>
                      {user.firstName}
                      {' '}
                      {user.lastName}
                      {' '}
                      {user.age}
                      {' '}
                      {user.gender}
                    </div>
                  ))
                )
      }
    </div>
  );
}
