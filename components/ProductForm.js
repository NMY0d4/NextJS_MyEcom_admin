import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function ProductForm({ product: editProduct, formTitle }) {
  const initialState = {
    productName: '',
    description: '',
    price: 0,
  };

  useEffect(() => {
    setIsDisabled(false);
  }, []);

  const [product, setProduct] = useState(editProduct || initialState);

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

  const saveProduct = async (e) => {
    e.preventDefault();
    setIsDisabled(true);

    if (editProduct) {
      await axios.put('/api/products', product);
    } else {
      await axios.post('/api/products', product);
    }

    setProduct(initialState);
    router.push('/products');
  };

  return (
    <div className='w-[80%] mx-auto'>
      <h1 className='text-primary mb-3'>
        {formTitle ? `${formTitle} "${product.productName}"` : 'New Product'}
      </h1>
      <form onSubmit={saveProduct}>
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

export default ProductForm;
