import React, {
  createContext,
  useContext,
  useCallback,
  useState,
} from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  password: string;
  confirm_password: string;
}

interface AuthProps {
  token: string;
  user: User;
}

interface LoginProps {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  logIn(credentials: LoginProps): Promise<void>;
  logOut(): void;
}

// Context
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Component
const AuthProvider: React.FC = ({ children }) => {
  const [userData, setUserData] = useState<AuthProps>(() => {
    const token = localStorage.getItem('@FindDev:token');
    const user = localStorage.getItem('@FindDev:user');

    if(token && user) {
      return {
        token,
        user: JSON.parse(user),
      }
    }

    return {} as AuthProps;
  });

  const logIn = useCallback(async ({ email, password }: LoginProps) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@FindDev:token', token);
    localStorage.setItem('@FindDev:user', JSON.stringify(user));

    setUserData({ token, user });
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('@FindDev:token');
    localStorage.removeItem('@FindDev:user');

    setUserData({} as AuthProps);
  }, []);

  return (
    <AuthContext.Provider value={{ user: userData.user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook
function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if(!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
