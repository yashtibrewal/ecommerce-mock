// context/CookiesContext.tsx
import { createContext, useContext, ReactNode } from 'react';

const CookiesContext = createContext<any>(null);

export const CookiesProvider = ({ children, cookies }: { children: ReactNode; cookies: any }) => {
  return (
    <CookiesContext.Provider value={{ cookies }}>
      {children}
    </CookiesContext.Provider>
  );
};

export const useCookiesContext = () => {
  return useContext(CookiesContext);
};
