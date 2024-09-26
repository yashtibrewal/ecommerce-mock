// components/Header.tsx

import Link from 'next/link';
import { FaShoppingCart, FaHeart, FaUserCircle, FaEnvelope, FaHome, FaInfoCircle } from 'react-icons/fa'; // Added FaHeart and FaUserCircle icons
import { useSessionContext } from '@/context/Session';
import { useEffect, useState } from 'react';
import { UserSession } from '@/interfaces/UserSession';
import { LoggedInUser } from '@/interfaces/Session';
import { capitalize } from '@/utils/functions';

const Header = () => {
  const session = useSessionContext();
  const [user, setUser] = useState<UserSession | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility

  useEffect(() => {
    if (session) {
      const keys = Object.keys(session);
      if (keys.includes('isLoggedIn')) {
        setUser({
          name: capitalize((session as LoggedInUser).name),
          email: (session as LoggedInUser).username,
        });
      }
    }
  }, [session]);

  return (
    <header className="bg-blue-600 text-white p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">MyEcommerceMock</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link href="/" className="flex items-center hover:text-blue-300"><FaHome className="mr-2" />Home</Link>
            </li>
            <li>
              <Link href="/about" className="flex items-center hover:text-blue-300"><FaInfoCircle className="mr-2" />About</Link>
            </li>
            {
              user && (
                <>
                  <li>
                    <Link href="/contact" className="flex items-center hover:text-blue-300"><FaEnvelope className="mr-2" />Contact</Link>
                  </li>
                  <li>
                    <Link href="/products/cart" className="hover:text-blue-300 flex items-center">
                      <FaShoppingCart className="mr-2" />Cart
                    </Link>
                  </li>
                  {/* Profile dropdown */}
                  <li className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center hover:text-blue-300">
                      <FaUserCircle className="mr-2" />{user.name}
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white text-blue-600 rounded-md shadow-lg">
                        <ul className="py-2">
                          <li>
                            <Link href="/products/wishlist" className="px-4 py-2 hover:bg-blue-200 flex items-center">
                              <FaHeart className="mr-2" />Wishlist
                            </Link>
                          </li>
                          <li>
                            <Link href="/logout" className="px-4 py-2 hover:bg-blue-200 flex items-center">
                              Logout
                            </Link>
                          </li>
                        </ul>
                      </div>
                    )}
                  </li>
                </>
              )
            }
            {
              !user && (
                <li>
                  <Link href="/login" className="hover:text-blue-300 flex items-center">Login</Link>
                </li>
              )
            }
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
