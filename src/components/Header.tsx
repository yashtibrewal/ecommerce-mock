// components/Header.tsx

import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';

import { useSessionContext } from '@/context/Session';
import { useEffect, useState } from 'react';
import { UserSession } from '@/interfaces/UserSession';
import { LoggedInUser } from '@/interfaces/Session';

const Header = () => {


  const session = useSessionContext();
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    if (session) {
      const keys = Object.keys(session);
      // if session doesnt exists, the user is not logged in.
      if (keys.includes('isLoggedIn')) {
        setUser({
          name: (session as LoggedInUser).name,
          email: (session as LoggedInUser).username
        })
      }
    }
  }, [session])


  return (
    <header className="bg-blue-600 text-white p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">MySite</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-blue-300">Home</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-300">About</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-300">Contact</Link>
            </li>
            {
              user && <li>
                <Link href="/cart" className="hover:text-blue-300 flex items-center"><FaShoppingCart />Cart</Link>
              </li>
            }

            {
              user && <li>
                <Link href="/logout" className="hover:text-blue-300 flex items-center">Logout</Link>
              </li>
            }
            {
              !user && <li>
                <Link href="/login" className="hover:text-blue-300 flex items-center">Login</Link>
              </li>
            }
          </ul>
        </nav>
      </div>
    </header>
  );
};


export default Header;
