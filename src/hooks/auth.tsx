import React, {
  createContext,
  useContext,
  useCallback,
  useState,
} from 'react';
import api from '../services/api';

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  avatar_url: string;
}

interface ISession {
  id: number;
  email: string;
  password: string;
}

interface IAuthProps {
  user: IUser;
}

interface ILoginProps {
  email: string;
  password: string;
}

interface AuthContextData {
  user: IUser;
  logIn(credentials: ILoginProps): Promise<void>;
  logOut(id: number): Promise<void>;
  updateUser(user: IUser): Promise<void>;
}

// Context
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Component
const AuthProvider: React.FC = ({ children }) => {
  const [sessions, setSessions] = useState<ISession[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [userData, setUserData] = useState<IAuthProps>(() => {
    const user = localStorage.getItem('@FindDev:user');

    if(user) {
      return {
        user: JSON.parse(user),
      }
    }

    return {} as IAuthProps;
  });

  const logIn = useCallback(async ({ email, password }: ILoginProps): Promise<void> => {
    const responseUsers = await api.get<IUser[]>('/users');

    const users = responseUsers.data;

    const user = users
      .find(user => user.email === email && user.password === password);

    if(!user) {
      throw new Error('User not exists');
    }

    await api.post<ISession>('/sessions', {
      id: user.id,
      email,
      password,
    });

    const newSession = {
      id: user.id,
      email,
      password,
    } as ISession;

    setSessions([newSession]);

    localStorage.setItem('@FindDev:user', JSON.stringify(user));

    setUserData({ user });
  }, []);

  const logOut = useCallback(async (id: number): Promise<void> => {
    await api.delete(`/sessions/${id}`);

    const filteredSession = sessions.filter(session => session.id !== id);

    setSessions(filteredSession);

    localStorage.removeItem('@FindDev:user');

    setUserData({} as IAuthProps);
  }, [sessions]);

  const updateUser = useCallback(async (user: IUser) => {
    await api.put(`/users/${user.id}`, user);

    const filteredUser = users.filter(logged => logged.id !== user.id);

    setUsers([...filteredUser, user]);

    localStorage.setItem('@FindDev:user', JSON.stringify(user));

    setUserData({ user });
  }, [users]);

  return (
    <AuthContext.Provider value={{ user: userData.user, logIn, logOut, updateUser }}>
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
