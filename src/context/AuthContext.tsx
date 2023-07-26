'use client'

import { ILogin, ILoginReponse, User } from '@/interfaces/auth.interfaces';
import fetcher from '@/services/fetcher';
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (formData: ILogin) => Promise<ILoginReponse | undefined>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
   const [loading, setLoading] = useState(true);

  useEffect(() => {
    setError('');
    fetcher.get('/users/me').then((res) => {
      setUser(res);
    }).catch(err => {
      setUser(null);
      if(err.message !== 'Forbidden'){
        setError(err.message);
      }
    }).finally(() => {
      setLoading(false);
    })
  }, []);

  const login = async (formData: ILogin) => {
    setLoading(true);
    setError("");
    try {
      const resData = await fetcher.post('/auth/local', formData) as ILoginReponse;
      localStorage.setItem('user', JSON.stringify(resData));
      setUser(resData.user);
      return resData;
    } catch (error: any) {
       setError(error.message);
    } finally {
       setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}
