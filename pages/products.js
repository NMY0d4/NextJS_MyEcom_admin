import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import { AiOutlineEdit } from 'react-icons/ai';

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
                <Link href={`/products/edit/${product._id}`}>
                  <AiOutlineEdit />
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export async function getStaticProps(context) {
  const response = await axios.get('http://localhost:3000/api/products');
  const products = response.data;
  return {
    props: {
      products,
    },
  };
}

export default Products;
