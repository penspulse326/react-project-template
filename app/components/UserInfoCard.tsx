import type { User } from '~/services/users';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface Props {
  user: User;
}

export default function UserInfoCard({ user }: Props) {
  const { firstName, lastName, age, gender } = user;

  return (
    <Card className="w-full max-w-80 px-2 py-10 text-left">
      <CardHeader>
        <CardTitle>
          {firstName}
          {' '}
          {lastName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Age:
          {age}
        </p>
        <p>
          Gender:
          {gender}
        </p>
      </CardContent>
    </Card>
  );
}
