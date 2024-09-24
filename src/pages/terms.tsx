import Layout from "@/components/Layout";
import { sessionOptions } from "@/interfaces/Session";
import { getIronSession } from "iron-session";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

// pages/terms.tsx
const TermsPage = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        <p className="mb-4">
          These Terms of Service govern your use of our website.
        </p>
        <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing or using our services, you agree to be bound by these terms.
        </p>
        <h2 className="text-xl font-semibold mb-2">2. Changes to Terms</h2>
        <p>
          We may modify these terms from time to time. Please review them periodically.
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
export default TermsPage;
