export interface AuthContextInterface {
  user: string;
  isAuthenticated: boolean;
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkIsUserLoggedIn: () => void;
}
