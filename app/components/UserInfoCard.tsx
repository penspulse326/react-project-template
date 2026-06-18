import type { User } from '~/services/user';
import { Link } from 'react-router';
import { cn } from '~/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface Props {
  user: User;
  to?: string;
  children?: React.ReactNode;
}

export default function UserInfoCard({ user, to, children }: Props) {
  const { firstName, lastName, age, gender } = user;

  const cardContent = (
    <Card className={cn(
      'h-full w-80 px-2 py-10 text-left transition-all duration-300',
      to && 'cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:border-slate-300 hover:bg-slate-50/50',
    )}
    >
      <CardHeader>
        <CardTitle>
          {firstName}
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
        {children}

      </CardContent>
    </Card>
  );

  if (to) {
    return (
      <Link to={to} className="block no-underline">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
