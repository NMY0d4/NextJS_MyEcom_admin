import { useSession } from 'next-auth/react';
import Image from 'next/legacy/image';
import React from 'react';

export default function HomeHeader() {
  const { data: session } = useSession();
  return (
    <div className='flex flex-col-reverse justify-center gap-2 items-center sm:flex-row sm:justify-between h-[12vh] sm:h-[6vh]'>
      <h2>
        Hello, <b>{session?.user?.name}</b>
      </h2>
      <div className='flex bg-gray-300 gap-1 text-black rounded-lg h-full overflow-hidden'>
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
