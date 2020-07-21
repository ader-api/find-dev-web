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
  email: string;
  password: string;
  confirm_password: string;
}

interface AuthProps {
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
    const responseUsers = await api.get<User[]>('/users');

    const users = responseUsers.data;

    const user = users
      .find(user => user.email === email && user.password === password);

    if(!user) {
      throw new Error('User not exists');
    }

    await api.post('/sessions', {
      id: user.id,
      email,
      password,
    });

    localStorage.setItem('@FindDev:user', JSON.stringify(user));

    setUserData({ user });
  }, []);

  const logOut = useCallback(async () => {
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
