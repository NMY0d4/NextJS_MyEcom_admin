import { BiLogOut, BiStore } from 'react-icons/bi';
import { BsBoxes } from 'react-icons/bs';
import { MdOutlineCategory } from 'react-icons/md';
import {
  HiOutlineClipboardList,
  HiOutlineCog,
  HiOutlineHome,
} from 'react-icons/hi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

const Nav = ({ show }) => {
  const inactiveLink = 'flex items-center gap-2 p-1';
  const activeLink = `${inactiveLink} bg-secondary text-primary font-semibold rounded-md`;
  const router = useRouter();
  const { pathname } = router;
  async function logout() {
    await router.push('/');
    await signOut();
  }

  return (
    <aside
      className={`${
        show ? 'left-0' : '-left-full'
      } top-0 text-secondary p-4 fixed z-10 w-full h-full bg-genBg md:static md:w-auto transition-all duration-300`}
    >
      <Link href='/' className={`${inactiveLink} mb-6 mr-3`}>
        <BiStore size='1.5rem' />
        <span>EcommerceAdmin</span>
      </Link>

      <nav className='flex flex-col gap-2'>
        <Link
          href={'/'}
          className={pathname === '/' ? activeLink : inactiveLink}
        >
          <HiOutlineHome size='1.5rem' />
          Dashboard
        </Link>
        <Link
          href={'/products'}
          className={pathname.includes('/products') ? activeLink : inactiveLink}
        >
          <BsBoxes size='1.5rem' />
          Products
        </Link>
        <Link
          href={'/categories'}
          className={
            pathname.includes('/categories') ? activeLink : inactiveLink
          }
        >
          <MdOutlineCategory size='1.5rem' />
          Categories
        </Link>
        <Link
          href={'/orders'}
          className={pathname.includes('/orders') ? activeLink : inactiveLink}
        >
          <HiOutlineClipboardList size='1.5rem' />
          Orders
        </Link>
        <Link
          href={'/settings'}
          className={pathname.includes('/settings') ? activeLink : inactiveLink}
        >
          <HiOutlineCog size='1.5rem' />
          Settings
        </Link>
        <button onClick={logout} className={inactiveLink}>
          <BiLogOut size='1.5rem' />
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Nav;
