import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import landingImage from '@/images/LoginPagePhoto.jpg';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      if (response.ok) {
        // Redirect to the products page if login is successful
        router.push('/products');
      } else {
        // Handle error (e.g., invalid credentials)
        const data = await response.json();
        setErrorMessage(data.message || 'Login failed.');
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage('Contact us with this error.' + error.message);
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Section with Image */}
      <div className="flex-1 flex items-center justify-center">
        <Image
          src={landingImage} // Sample e-commerce image
          alt="E-commerce"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Section with Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 p-2 w-full rounded"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 p-2 w-full rounded"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Login
          </button>
        </form>

        <div className="mt-4">
          <Link href="/products">
            <button className="text-blue-500 underline">Skip to Products</button>
          </Link>
        </div>

        {/* Signup Section */}
        <div className="mt-6">
          <span className="text-sm">Don&apos;t have an account? </span>
          <Link href="/signup">
            <span className="text-blue-500 underline cursor-pointer">
              Sign up
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
