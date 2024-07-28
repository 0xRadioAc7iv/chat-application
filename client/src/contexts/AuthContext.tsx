import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextInterface } from "../interfaces/AuthContextType";
import { AuthProviderProps } from "../interfaces/AuthProviderProps";
import { SERVER_URL } from "../constants";

const defaultAuthContextValue: AuthContextInterface = {
  user: "",
  isAuthenticated: false,
  signin: async () => {},
  signup: async () => {},
  logout: async () => {},
  checkIsUserLoggedIn: async () => {},
};

const AuthContext = createContext<AuthContextInterface>(
  defaultAuthContextValue
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    checkIsUserLoggedIn();
  }, []);

  const checkIsUserLoggedIn = () => {
    fetch(`${SERVER_URL}/api/auth/status`, { credentials: "include" })
      .then(async (response) => {
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
        const userData = await response.json();
        setUser(userData.user.username);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  };

  const signin = async (email: string, password: string) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.status === 200) {
        setIsAuthenticated(true);
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const signup = async (email: string, username: string, password: string) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
        credentials: "include",
      });
      if (response.status === 201) {
        setIsAuthenticated(true);
        const data = await response.json();
        setUser(data.username);
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${SERVER_URL}/api/auth/signout`, {
        method: "POST",
        credentials: "include",
      });
      setIsAuthenticated(false);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signup,
        signin,
        logout,
        checkIsUserLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
