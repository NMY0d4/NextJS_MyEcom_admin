import Nav from '@/components/Nav';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className='bg-genBg w-screen h-screen flex items-center'>
        <div className='text-center w-full'>
          <button
            onClick={() => signIn('google')}
            className='bg-white font-semibold p-2 px-4 rounded-lg hover:bg-tertiary hover:text-white transition duration-300'
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-genBg w-screen min-h-screen'>
      <Nav />
      <div>logged in {session.user.email}</div>
    </div>
  );
}
