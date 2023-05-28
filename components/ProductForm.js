import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { HiOutlineUpload } from 'react-icons/hi';
import { Spinner } from './ui/spinner';
import { ReactSortable } from 'react-sortablejs';
// import Image from 'next/image';

function ProductForm({ product: editProduct, formTitle }) {
  const initialState = {
    productName: '',
    description: '',
    category: '',
    price: 0,
    images: [],
  };

  const [product, setProduct] = useState(editProduct || initialState);
  const [isUploading, setIsUploading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { images } = product;

  useEffect(() => {
    setIsDisabled(false);
  }, []);

  useEffect(() => {
    axios
      .get('/api/categories')
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error('Error during categories recovery :', err);
      });
  }, []); 

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
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }

      const res = await axios.post('/api/upload', data);
      const newImages = res.data.links;

      const updatedImages = [...product.images, ...newImages];

      setProduct({ ...product, images: updatedImages });
      setIsUploading(false);
    }
  }

  function updateImagesOrder(newImages) {
    setProduct({ ...product, images: newImages });
  }

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
        <label>Category</label>
        <select
          value={product.category}
          name='category'
          onChange={handleInputChange}
        >
          <option value=''>Uncategorized</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
        <label>Photos</label>
        <div className='mb-2 flex flex-wrap gap-3'>
          <ReactSortable
            list={images}
            className='flex flex-wrap gap-3'
            setList={updateImagesOrder}
          >
            {images?.length > 0 &&
              images.map((link) => (
                <div key={link} className='h-24'>
                  <img
                    src={link}
                    alt={`GM_Web nextJS ecommerce produit ${product.productName}`}
                    className='rounded-lg'
                  />
                </div>
              ))}
          </ReactSortable>
          {isUploading && (
            <div className='h-24 flex justify-center items-center p-1'>
              <Spinner />
            </div>
          )}

          <label className='w-24 h-24 px-2 flex items-center justify-center gap-2 text-tertiary rounded-lg bg-white cursor-pointer'>
            <HiOutlineUpload size='2rem' />
            <div>Upload</div>
            <input type='file' onChange={uploadImages} className='hidden' />
          </label>
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
