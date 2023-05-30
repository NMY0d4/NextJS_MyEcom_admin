import Nav from '@/components/Nav';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Layout({ children }) {
  const { data: session } = useSession();

  const handleSignIn = async () => {
    try {
      await signIn('google');
    } catch (error) {
      console.error('Error during sign in:', error);
    }
  };

  if (!session) {
    return (
      <div className='bg-genBg w-screen h-screen flex items-center'>
        <div className='text-center w-full'>
          <button
            onClick={handleSignIn}
            className='bg-secondary font-semibold p-2 px-4 rounded-lg hover:bg-tertiary hover:text-secondary transition duration-300'
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-genBg w-screen min-h-screen flex'>
      <Nav />
      <div className='bg-secondary text-primary flex-grow m-2 ml-0 rounded-lg p-4'>
        {children}
      </div>
    </div>
  );
}
