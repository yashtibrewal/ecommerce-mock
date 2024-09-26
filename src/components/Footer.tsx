// components/Footer.tsx

import Link from "next/link";
import { ReactNode } from "react";

interface LayoutProps {
  children?: ReactNode;
  className?: string; // Optional className prop
}

const Footer = ({ className }: LayoutProps) => {
  return (
    <footer className={`bg-gray-800 text-white p-4 mt-4 ${className}`}>
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} MyEcommerceMock. All rights reserved.</p>
        <div className="mt-2">
          <Link href="/privacy" className="hover:text-blue-300">Privacy Policy</Link>
          <span className="mx-2">|</span>
          <Link href="/terms" className="hover:text-blue-300">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
