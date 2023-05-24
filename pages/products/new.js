import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function NewProduct() {
  const initialState = {
    productName: '',
    description: '',
    price: 0,
  };

  useEffect(() => {
    setIsDisabled(false);
  }, []);

  const [product, setProduct] = useState(initialState);
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price') {
      const formattedPrice = parseInt(value, 10).toString();
      setProduct({ ...product, [name]: formattedPrice });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const createProduct = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    await axios.post('/api/products', product);

    console.log('Product:', product);
    setProduct(initialState);
    router.push('/products');
  };

  // if (goToProducts) {
  //   return redirect('/products');
  // }

  return (
    <div className='w-[80%] mx-auto'>
      <h1 className='text-primary mb-3'>New Product</h1>
      <form onSubmit={createProduct}>
        <label>Product name</label>
        <input
          type='text'
          name='productName'
          placeholder='Product name'
          value={product.productName}
          onChange={handleInputChange}
        />
        <label>Description</label>
        <textarea
          name='description'
          placeholder='Description'
          value={product.description}
          onChange={handleInputChange}
        ></textarea>
        <label>Price (in USD)</label>
        <input
          type='number'
          name='price'
          placeholder='Price'
          value={product.price === 0 ? '' : product.price}
          onChange={handleInputChange}
        ></input>
        <button
          className={`btn-primary ${isDisabled && 'disabled'}`}
          type='submit'
          disabled={isDisabled}
        >
          {isDisabled ? 'Processing' : 'Save'}
        </button>
      </form>
    </div>
  );
}

export default NewProduct;
