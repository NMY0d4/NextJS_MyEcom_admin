import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import EditDeleteBtn from '@/components/ui/EditDeleteBtn';

function Products({ products }) {
  return (
    <>
      <Link className='btn-primary' href={'/products/new'}>
        Add new product
      </Link>
      <table className='basic mt-3'>
        <thead>
          <tr>
            <td>Product name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.productName}</td>
              <td>
                <EditDeleteBtn entity={product} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export async function getServerSideProps({ req }) {
  try {
    const response = await axios.get('http://localhost:3000/api/products', {
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie,
      },
    });
    const products = response.data;

    return {
      props: {
        products,
      },
    };
  } catch (error) {
    console.error(error.response?.data?.error); // Displays error in browser console

    // Redirects user to login page
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}

export default Products;
