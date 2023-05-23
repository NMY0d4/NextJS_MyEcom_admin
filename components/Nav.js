import { BiStore } from 'react-icons/bi';
import { BsBoxes } from 'react-icons/bs';
import {
  HiOutlineClipboardList,
  HiOutlineCog,
  HiOutlineHome,
} from 'react-icons/hi';
import Link from 'next/link';

const Nav = () => {
  const linkclasses = 'flex items-center gap-2';

  return (
    <aside className='text-fontColor p-4'>
      <Link href='/' className={`${linkclasses} mb-6`}>
        <BiStore size='1.5rem' />
        <span>EcommerceAdmin</span>
      </Link>

      <nav className='flex flex-col gap-2'>
        <Link href={'/'} className={linkclasses}>
          <HiOutlineHome size='1.5rem' />
          Dashboard
        </Link>
        <Link href={'/'} className={linkclasses}>
          <BsBoxes size='1.5rem' />
          Products
        </Link>
        <Link href={'/'} className={linkclasses}>
          <HiOutlineClipboardList size='1.5rem' />
          Orders
        </Link>
        <Link href={'/'} className={linkclasses}>
          <HiOutlineCog size='1.5rem' />
          Settings
        </Link>
      </nav>
    </aside>
  );
};

export default Nav;
