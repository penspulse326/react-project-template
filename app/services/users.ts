import { http, safeRequest } from '~/lib/http';

export interface User {
  id: number;
  age: number;
  firstName: string;
  lastName: string;
  gender: string;
  email?: string;
  phone?: string;
  image?: string;
  company?: {
    name: string;
    title: string;
    department: string;
  };
}

export async function getUsers() {
  return safeRequest<User[]>(async () => {
    const result = await http.get<{ users: User[] }>('/users');
    return result.users;
  }, '無法取得使用者資料');
}

export async function getUser(id: number | string) {
  return safeRequest<User>(async () => {
    const result = await http.get<User>(`/users/${id}`);
    return result;
  }, '無法取得該使用者資料');
}

export async function getUsersError() {
  return safeRequest<User[]>(async () => {
    const result = await http.get<{ users: User[] }>('/usrs');
    return result.users;
  }, '無法取得使用者資料');
}
