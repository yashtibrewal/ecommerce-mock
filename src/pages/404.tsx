// pages/500.js

import Layout from "@/components/Layout";
import Link from "next/link";

export default function Custom500() {
  return (
    <Layout>
      <h1 className="text-3xl">404 - Sorry, The page you are looking for doesn't exists.</h1>
      <Link href="/" className="bg-blue-500 rounded py-2 px-4">
        Back to home
      </Link>
    </Layout>
  )
}