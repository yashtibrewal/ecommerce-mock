import "@/styles/globals.css";

// pages/_app.tsx
import App, { AppContext, AppProps } from 'next/app';
import { CookiesProvider } from '@/context/Cookies';
import cookie from 'cookie';

interface MyAppProps extends AppProps {
  cookies: Record<string, string | undefined>; // Define cookies type
}

function MyApp({ Component, pageProps, cookies }: MyAppProps) {
  return (
    <CookiesProvider cookies={cookies}>
      <Component {...pageProps} />
    </CookiesProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const { req } = appContext.ctx;
  const cookies = req ? cookie.parse(req.headers.cookie || '') : {};

  return { ...appProps, cookies };
};

export default MyApp;
