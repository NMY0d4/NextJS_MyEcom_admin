import { BiStore } from 'react-icons/bi';
import { BsBoxes } from 'react-icons/bs';
import { MdOutlineCategory } from 'react-icons/md';
import {
  HiOutlineClipboardList,
  HiOutlineCog,
  HiOutlineHome,
} from 'react-icons/hi';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Nav = () => {
  const inactiveLink = 'flex items-center gap-2 p-1';
  const activeLink = `${inactiveLink} bg-secondary text-primary font-semibold rounded-l-lg`;
  const router = useRouter();
  const { pathname } = router;

  return (
    <aside className='text-secondary p-4 pr-0'>
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
      </nav>
    </aside>
  );
};

export default Nav;
