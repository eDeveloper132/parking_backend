export interface IAdmin {
  name: string;
  email: string;
  password: string;
  mobile?: string;
  role: 'admin' | 'manager';
}