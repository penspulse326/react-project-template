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

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}
