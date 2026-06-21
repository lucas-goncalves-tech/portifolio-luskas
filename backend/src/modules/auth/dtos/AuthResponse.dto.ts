export interface AuthResponse {
  user: {
    id: number;
    email: string;
    name: string | null;
  };
  accessToken: string;
}
