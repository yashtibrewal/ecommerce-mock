// pages/404.tsx

import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Custom404() {
  const router = useRouter();

  // Automatically redirect to '/products' after 3 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/products');
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timeout); // Cleanup the timeout if the component unmounts
  }, [router]);

  return (
    <div className="text-center">
      <h1 className="text-3xl">404 - Sorry, The page you are looking for doesn&apos;t exist.</h1>
      <p className="mt-4">You will be redirected to the products page in a few seconds.</p>
      <Link href="/" className="bg-blue-500 rounded py-2 px-4 inline-block mt-4">
        Back to home
      </Link>
    </div>
  );
}
