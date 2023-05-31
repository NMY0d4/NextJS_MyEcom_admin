import { BiLogOut } from 'react-icons/bi';
import { BsBoxes } from 'react-icons/bs';
import { MdOutlineCategory } from 'react-icons/md';
import {
  HiOutlineClipboardList,
  HiOutlineCog,
  HiOutlineHome,
} from 'react-icons/hi';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Logo from './ui/Logo';

const Nav = ({ show, onClose }) => {
  const inactiveLink = 'flex items-center gap-2 p-1 hover:font-semibold';
  const activeLink = `${inactiveLink} bg-secondary text-primary font-semibold rounded-md`;
  const router = useRouter();
  const { pathname, isReady } = router;
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function logout() {
    setIsLoggingOut(true);
    await router.push('/');
    await signOut();
  }

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setIsLoading(false);
      if (show && !isLoggingOut) {
        onClose();
      }
      setIsLoggingOut(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events, onClose, show, isLoggingOut]);

  return (
    <aside
      className={`${
        show ? 'left-0' : '-left-full'
      } top-0 text-secondary p-4 fixed z-10 w-full h-full bg-genBg md:static md:w-auto transition-all duration-300`}
    >
      <nav className='flex flex-col gap-2 mt-10 ml-5 md:mt-auto md:ml-auto'>
        <div className='hidden md:block mb-5'>
          <Logo />
        </div>
        <Link
          href={'/'}
          className={`${pathname === '/' ? activeLink : inactiveLink} ${
            isLoading ? 'disabled-link' : ''
          }`}
          disabled={!isReady || isLoading}
        >
          <HiOutlineHome size='1.5rem' />
          Dashboard
        </Link>
        <Link
          href={'/products'}
          className={`${pathname === '/products' ? activeLink : inactiveLink} ${
            isLoading ? 'disabled-link' : ''
          }`}
          disabled={!isReady || isLoading}
        >
          <BsBoxes size='1.5rem' />
          Products
        </Link>
        <Link
          href={'/categories'}
          className={`${
            pathname === '/categories' ? activeLink : inactiveLink
          } ${isLoading ? 'disabled-link' : ''}`}
          disabled={!isReady || isLoading}
        >
          <MdOutlineCategory size='1.5rem' />
          Categories
        </Link>
        <Link
          href={'/orders'}
          className={`${pathname === '/orders' ? activeLink : inactiveLink} ${
            isLoading ? 'disabled-link' : ''
          }`}
          disabled={!isReady || isLoading}
        >
          <HiOutlineClipboardList size='1.5rem' />
          Orders
        </Link>
        <Link
          href={'/settings'}
          className={`${pathname === '/settings' ? activeLink : inactiveLink} ${
            isLoading ? 'disabled-link' : ''
          }`}
          disabled={!isReady || isLoading}
        >
          <HiOutlineCog size='1.5rem' />
          Settings
        </Link>
        <button
          onClick={logout}
          className={`${inactiveLink} ${isLoading ? 'disabled-link' : ''}`}
        >
          <BiLogOut size='1.5rem' />
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Nav;
