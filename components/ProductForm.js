import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { HiOutlineUpload } from 'react-icons/hi';

function ProductForm({ product: editProduct, formTitle }) {
  const initialState = {
    productName: '',
    description: '',
    price: 0,
    images: [],
  };

  useEffect(() => {
    setIsDisabled(false);
  }, []);

  const [product, setProduct] = useState(editProduct || initialState);

  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();
  const { images } = product;

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

  async function uploadImages(e) {
    const files = e.target?.files;
    if (files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }

      const res = await axios.post('/api/upload', data);
      const newImages = res.data.links; // Supposons que le résultat renvoie un tableau de liens d'images

      // Fusionner les nouvelles images avec les images existantes
      const updatedImages = [...product.images, ...newImages];

      setProduct({ ...product, images: updatedImages });

    }
  }
  console.log(product.images);

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

        <label>Photos</label>
        <div className='mb-2'>
          <label className='w-24 h-24 px-2 flex items-center justify-center gap-2 text-tertiary rounded-lg bg-white cursor-pointer'>
            <HiOutlineUpload size='2rem' />
            <div>Upload</div>
            <input type='file' onChange={uploadImages} className='hidden' />
          </label>
          {!images?.length && <div>No photos in this product</div>}
        </div>

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
