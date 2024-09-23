// components/Layout.tsx
import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface LayoutProps {
  children: ReactNode;
  className?: string; // Optional className prop
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className={className}>
      <div className='flex flex-col items-center min-h-screen justify-between'>
        <Header></Header>
        <main className='w-10/12 mx-auto'>{children}</main>
        <Footer className='w-full'></Footer>
      </div>
    </div>
  );
};

export default Layout;
