import Link from 'next/link';
import { FaShoppingCart, FaHeart, FaUserCircle, FaEnvelope, FaHome, FaSignInAlt, FaBars } from 'react-icons/fa'; // Added FaBars for the mobile menu icon
import { useSessionContext } from '@/context/Session';
import { useEffect, useState } from 'react';
import { UserSession } from '@/interfaces/UserSession';
import { LoggedInUser } from '@/interfaces/Session';
import { capitalize } from '@/utils/functions';

const Header = () => {
  const session = useSessionContext();
  const [user, setUser] = useState<UserSession | null>(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu toggle

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

        {/* Mobile menu toggle button */}
        <button
          className="text-white lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FaBars size={24} />
        </button>

        {/* Navigation - hidden on mobile */}
        <nav className={`lg:flex ${isMobileMenuOpen ? 'absolute right-5 top-10 mt-2 w-fit px-5 py-5  bg-white text-blue-600 rounded-md shadow-lg z-10' : 'hidden'} lg:block`}>
          <ul className="flex flex-col lg:flex-row gap-y-2 lg:gap-y-0 gap-x-4 items-start">
            <li>
              <Link href="/" className="flex items-center hover:text-blue-300"><FaHome className="mr-2" />Home</Link>
            </li>
            {
              user ? (
                <>
                  <li>
                    <Link href="/products/cart" className="hover:text-blue-300 flex items-center">
                      <FaShoppingCart className="mr-2" />Cart
                    </Link>
                  </li>
                  {/* Profile dropdown */}
                  <li className="relative">
                    <button
                      onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                      className="flex items-center hover:text-blue-300"
                    >
                      <FaUserCircle className="mr-2" />{user.name}
                    </button>
                    {isProfileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-fit px-2 text-sm bg-white text-blue-600 rounded-md shadow-lg z-10">
                        <ul className="py-2">
                          <li>
                            <Link href="/products/wishlist" className="px-4 py-2 hover:bg-blue-200 flex items-center">
                              <FaHeart className="mr-2" />Wishlist
                            </Link>
                          </li>
                          <li>
                            <Link href="/contact" className="px-4 py-2 hover:bg-blue-200 flex items-center">
                              <FaEnvelope className="mr-2" />Contact
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
              ) : (
                <li>
                  <Link href="/login" className="hover:text-blue-300 flex items-center"><FaSignInAlt className="mr-2" />Login</Link>
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
