import Layout from "@/components/Layout";
import { sessionOptions } from "@/interfaces/Session";
import { getIronSession } from "iron-session";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

// pages/privacy.tsx
const PrivacyPolicyPage = () => {
  return (
    <Layout>

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">
          Your privacy is important to us. This policy explains how we handle your information.
        </p>
        <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
        <p className="mb-4">
          We collect information that you provide to us directly, such as when you create an account.
        </p>
        <h2 className="text-xl font-semibold mb-2">2. Use of Information</h2>
        <p>
          We use the information we collect to improve our services and communicate with you.
        </p>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }: GetServerSidePropsContext) => {
  const session = await getIronSession(req, res, sessionOptions);
  return {
    props: {
      session
    }
  }
}

export default PrivacyPolicyPage;
