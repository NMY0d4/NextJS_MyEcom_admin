import Link from 'next/link';
import React from 'react';
import { BiStore } from 'react-icons/bi';

const Logo = () => {
  return (
    <Link href='/' className='flex items-center gap-2 p-1'>
      <BiStore size='1.5rem' />
      <span>EcommerceAdmin</span>
    </Link>
  );
};

export default Logo;
