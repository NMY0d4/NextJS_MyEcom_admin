import HomeHeader from '@/components/HomeHeader';
import HomeStats from '@/components/HomeStats';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Admin ecommerce</title>
      </Head>
      <div>
        <HomeHeader />
        <HomeStats />
      </div>
    </>
  );
}
