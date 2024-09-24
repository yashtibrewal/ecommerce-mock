// context/SessionContext.tsx
import Session from '@/interfaces/Session';
import { createContext, useContext, ReactNode } from 'react';

const SessionContext = createContext<Session>({});

export const SessionProvider = ({ children, session }: { children: ReactNode; session: Session }) => {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => {
  return useContext(SessionContext);
};
