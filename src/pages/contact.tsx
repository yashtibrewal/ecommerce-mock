import Layout from "@/components/Layout";
import withAuth from "@/components/withAuth";
import { useSessionContext } from "@/context/Session";
import Session, { LoggedInUser, sessionOptions } from "@/interfaces/Session";
import { UserSession } from "@/interfaces/UserSession";
import { getIronSession } from "iron-session";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";

// pages/contact.tsx
const ContactPage = () => {

  const session: Session = useSessionContext();
  // console.log(session, 'contact page')
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {

    if (session) {
      const keys = Object.keys(session);

      if (keys.includes('isLoggedIn')) {
        setUser({
          name: (session as LoggedInUser).name,
          email: (session as LoggedInUser).username
        })
      }
    }

  }, [session])


  return (
    <Layout>
      <div className="container p-4">
        <div className="flex items-center justify-between">
          <div className="mb-6 space-y-2 w-full">

            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <h2 className="text-xl font-semibold mb-2">Our Contact Details</h2>
            <p>
              <strong>Email:</strong> support@MyEcommerceMock.com
            </p>
            <p>
              <strong>Phone:</strong> +1 (555) 123-4567
            </p>
            <p>
              <strong>Address:</strong> 123 Main St, Suite 100, Anytown, USA
            </p>
          </div>
          <form className="flex flex-col w-full">
            <label htmlFor="name" className="mb-2">Name:</label>
            <input type="text" defaultValue={user ? user.name : ''} id="name" className="mb-4 p-2 border rounded" />

            <label htmlFor="email" className="mb-2">Email:</label>
            <input type="email" disabled={true} defaultValue={user ? user.email : ''} id="email" className="mb-4 p-2 border rounded" />

            <label htmlFor="message" className="mb-2">Message:</label>
            <textarea id="message" className="mb-4 p-2 border rounded" rows={4} />

            <button type="submit" className="bg-blue-600 text-white p-2 rounded">
              Send Message
            </button>
          </form>
        </div>

      </div>
    </Layout>
  );
};


export const getServerSideProps = async ({ req, res }: GetServerSidePropsContext) => {

  const session = await getIronSession<Session>(req, res, sessionOptions);

  console.log(session);

  if (!session || !Object.keys(session).includes('isLoggedIn')) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  return {
    props: {
      session
    }
  }
}

export default withAuth(ContactPage);
