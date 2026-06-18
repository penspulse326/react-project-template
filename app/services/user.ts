import type { LoginResponse, User } from '~/types/user';
import { z } from 'zod';
import { http, safeRequest } from '~/lib/http';

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

export async function loginUser(username: string, password: string, expiresInMins = 30) {
  return safeRequest<LoginResponse>(async () => {
    const result = await http.post<LoginResponse>('/user/login', {
      username,
      password,
      expiresInMins,
    });
    return result;
  }, '登入失敗，請檢查帳號密碼');
}

export const UserSchema = z.object({
  id: z.number(),
  age: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  image: z.string().url().optional(),
  company: z.object({
    name: z.string(),
    title: z.string(),
    department: z.string(),
  }).optional(),
});

export async function getUserValidated(id: number | string) {
  return safeRequest<User>(async () => {
    const result = await http.get<unknown>(`/users/${id}`);
    const validatedData = UserSchema.parse(result);
    return validatedData as User;
  }, '無法取得該使用者資料或資料格式不正確');
}
