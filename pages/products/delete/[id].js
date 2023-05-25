import axios from 'axios';
import { CiWarning } from 'react-icons/ci';
import React, { useEffect, useState } from 'react';
import { useRouterUtil } from '@/lib/utils';
import { useRouter } from 'next/router';

function DeleteProduct() {
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const { goTo } = useRouterUtil();

  useEffect(() => {
    if (!id) return;
    axios.get(`/api/products?id=${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  async function deleteProduct() {
    await axios.delete(`/api/products?id=${id}`);
    goTo('products');
  }

  return (
    <>
      <h1 className='text-center'>
        Do you really want to delete product &quot;{product?.productName}&quot;?
      </h1>
      <div className='flex gap-2 mt-4 justify-center'>
        <button
          onClick={deleteProduct}
          className='btn-primary-danger mr-4 flex justify-center items-center gap-2'
        >
          <CiWarning size='1.2rem' /> Yes <CiWarning size='1.2rem' />
        </button>
        <button
          className='btn-primary'
          onClick={() => {
            goTo('products');
          }}
        >
          No
        </button>
      </div>
    </>
  );
}

export default DeleteProduct;
