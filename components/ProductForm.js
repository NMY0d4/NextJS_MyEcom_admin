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
    properties: {},
    price: 0,
    images: [],
  };

  const [product, setProduct] = useState(editProduct || initialState);
  const [isUploading, setIsUploading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  const { images, category, properties: productProperties } = product;

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

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...catInfo.properties);
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      );
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }

  function setProductProp(propName, value) {
    setProduct((prevProduct) => {
      const updatedProperties = {
        ...prevProduct.properties,
        [propName]: value,
      };
      return { ...prevProduct, properties: updatedProperties };
    });
  }

  return (
    <div className='w-[80%] mx-auto'>
      <h1 className='mb-5'>
        {formTitle ? `${formTitle} "${product.productName}"` : 'New Product'}
      </h1>
      <form onSubmit={saveProduct}>
        {/* --------------- PRODUCT NAME --------------- */}
        <label>Product name</label>
        <input
          type='text'
          name='productName'
          placeholder='Product name'
          value={product.productName}
          onChange={handleInputChange}
        />
        {/* --------------- CATEGORY --------------- */}
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
        {/* ----------- PROPERTIES --------------- */}
        {propertiesToFill.length > 0 && <h2>Properties</h2>}
        <div className='flex wrap gap-3 pb-3'>
          {propertiesToFill.length > 0 &&
            propertiesToFill.map((p) => (
              <div key={p._id}>
                <div>
                  <label>
                    {`${p.name[0].toUpperCase()}${p.name.substring(1)}`}
                  </label>
                  <select
                    value={productProperties && productProperties[p.name]}
                    onChange={(e) => setProductProp(p.name, e.target.value)}
                  >
                    {p.values.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
        </div>
        {/* --------------- PHOTOS --------------- */}
        <label>Photos</label>
        <div className='mb-2 flex flex-wrap gap-3'>
          <ReactSortable
            list={images}
            className='flex flex-wrap gap-3'
            setList={updateImagesOrder}
          >
            {images?.length > 0 &&
              images.map((link) => (
                <div key={link} className='h-24 shadow-md rounded-lg'>
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

          <label className='w-24 h-24 px-2 flex flex-col items-center justify-center gap-2 text-tertiary rounded-lg bg-white cursor-pointer shadow-md'>
            <HiOutlineUpload size='2rem' />
            <div>Upload</div>
            <input type='file' onChange={uploadImages} className='hidden' />
          </label>
        </div>
        {/* --------------- DESCRIPTION --------------- */}
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
