// pages/index.tsx

import { GetServerSideProps } from "next";

export default function Home() {
  return (
    <div>
    </div>
  );
}


export const getServerSideProps: GetServerSideProps = async () => {

  return {
    redirect: {
      destination: '/products',
      permanent: false,
    },
  }

}