export interface IProfile {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  avatar: string | null;
  token: string;
  role: string[];
}
