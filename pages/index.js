import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/legacy/image';

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Admin ecommerce</title>
      </Head>
      <div className='flex justify-between'>
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>
        <div className='flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden'>
          <div className='relative w-8 h-full'>
            <Image
              src={session.user.image}
              alt='photo profil'
              layout='fill'
              objectFit='contain'
            />
          </div>
          <span className='py-1 px-1 flex items-center font-semibold'>
            {session?.user?.name}
          </span>
        </div>
      </div>
    </>
  );
}
