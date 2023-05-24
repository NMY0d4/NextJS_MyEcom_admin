import Layout from '@/components/Layout';
import React from 'react';
import Link from 'next/link';

function Products() {
  return (
    <>
      <Link className='btn-primary' href={'/products/new'}>
        Add new product
      </Link>
    </>
  );
}

export default Products;
