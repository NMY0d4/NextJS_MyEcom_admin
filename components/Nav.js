import { BiStore } from 'react-icons/bi';
import { BsBoxes } from 'react-icons/bs';
import {
  HiOutlineClipboardList,
  HiOutlineCog,
  HiOutlineHome,
} from 'react-icons/hi';
import Link from 'next/link';

const Nav = () => {
  const inactiveLink = 'flex items-center gap-2 p-1';
  const activeLink = `${inactiveLink} bg-secondary text-primary rounded-l-lg`;

  return (
    <aside className='text-secondary p-4 pr-0'>
      <Link href='/' className={`${inactiveLink} mb-6 mr-3`}>
        <BiStore size='1.5rem' />
        <span>EcommerceAdmin</span>
      </Link>

      <nav className='flex flex-col gap-2'>
        <Link href={'/'} className={activeLink}>
          <HiOutlineHome size='1.5rem' />
          Dashboard
        </Link>
        <Link href={'/products'} className={inactiveLink}>
          <BsBoxes size='1.5rem' />
          Products
        </Link>
        <Link href={'/orders'} className={inactiveLink}>
          <HiOutlineClipboardList size='1.5rem' />
          Orders
        </Link>
        <Link href={'/settings'} className={inactiveLink}>
          <HiOutlineCog size='1.5rem' />
          Settings
        </Link>
      </nav>
    </aside>
  );
};

export default Nav;
