import { useSession } from 'next-auth/react';
import Image from 'next/legacy/image';
import React from 'react';

export default function HomeHeader() {
  const { data: session } = useSession();
  return (
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
  );
}
