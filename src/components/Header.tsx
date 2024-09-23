// components/Header.tsx
import { useCookiesContext } from '@/context/Cookies';
import { parseUserToken } from '@/utils/token';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const Header = () => {

  const { cookies } = useCookiesContext();
  const [login, setLogin] = useState<boolean>(false)
  const token = parseUserToken(cookies.token || '');

  useEffect(() => {
    if (token) {
      console.log(token);
      setLogin(true);
    }
  }, [login])


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
              login && <li>
                <Link href="/cart" className="hover:text-blue-300 flex items-center"><FaShoppingCart />Cart</Link>
              </li>
            }

            {
              login && <li>
                <Link href="/logout" className="hover:text-blue-300 flex items-center">Logout</Link>
              </li>
            }
            {
              !login && <li>
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
