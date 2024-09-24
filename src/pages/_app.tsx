import "@/styles/globals.css";

// pages/_app.tsx
import App, { AppContext, AppProps } from 'next/app';
import { SessionProvider } from '@/context/Session';
import cookie from 'cookie';

interface MyAppProps extends AppProps {
  cookies: Record<string, string | undefined>; // Define cookies type
}

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const { req } = appContext.ctx;
  const cookies = req ? cookie.parse(req.headers.cookie || '') : {};

  return { ...appProps, cookies };
};

export default MyApp;
