import Layout from "@/components/Layout";
import { sessionOptions } from "@/interfaces/Session";
import { getIronSession } from "iron-session";
import { GetServerSidePropsContext } from "next";

// pages/about.tsx
const AboutPage = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="mb-4">
          Welcome to MySite! We are dedicated to providing the best service to our customers.
        </p>
        <p>
          Our team consists of experienced professionals committed to ensuring your satisfaction.
        </p>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ req, res }: GetServerSidePropsContext) => {

  const session = await getIronSession(req, res, sessionOptions);
  return {
    props: {
      session
    }
  }
}

export default AboutPage;
