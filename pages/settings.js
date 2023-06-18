import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

export default function SettingsPage() {
  const [products, setProducts] = useState([]);
  const [featuredProductId, setFeaturedProductId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/products').then((res) => {
      setProducts(res.data);
      setIsLoading(false);
    });
    axios.get(`/api/settings?name=featuredProductId`).then((res) => {
      setFeaturedProductId(res.data.value);
    });
  }, []);

  async function saveSettings() {
    await axios.put('/api/settings', {
      name: 'featuredProductId',
      value: featuredProductId,
    });
  }

  return (
    <>
      <h1 className='mb-4'>Settings</h1>
      {isLoading && (
        <div className='flex justify-center my-5'>
          <BarLoader />
        </div>
      )}
      <label>Featured product</label>
      <select
        onChange={(e) => {
          setFeaturedProductId(e.target.value);
        }}
        value={featuredProductId}
      >
        {products.length > 0 &&
          products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.productName}
            </option>
          ))}
      </select>
      <div>
        <button onClick={saveSettings} className='btn-primary'>
          Save settings
        </button>
      </div>
    </>
  );
}
