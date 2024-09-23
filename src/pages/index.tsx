// pages/index.tsx
import { GetServerSidePropsResult } from 'next';

interface Props {

}

export default function Home() {
  return (
    <div>
    </div>
  );
}


export function getStaticProps(): GetServerSidePropsResult<Props> {

  return {
    redirect: {
      destination: '/products',
      permanent: false,
    },
  }

}