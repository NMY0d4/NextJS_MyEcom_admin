import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';
import Swal from 'sweetalert2';

export default function SettingsPage() {
  const [products, setProducts] = useState([]);
  const [featuredProductId, setFeaturedProductId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shippingFee, setShippingFee] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    fetchAll().then(() => {
      setIsLoading(false);
    });
  }, []);

  async function fetchAll() {
    await axios.get('/api/products').then((res) => {
      setProducts(res.data);
    });

    await axios.get(`/api/settings?name=featuredProductId`).then((res) => {
      setFeaturedProductId(res.data.value);
    });
    await axios.get(`/api/settings?name=shippingFee`).then((res) => {
      setShippingFee(res.data.value);
    });
  }

  function saveSettings() {
    Swal.fire({
      title: 'Confirmation',
      text: `Are you sure you want to change featured product?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Change',
      confirmButtonColor: 'darkRed',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmation
        saveFeaturedProduct();
      }
    });
  }

  async function saveFeaturedProduct() {
    try {
      setIsLoading(true);
      // Make your deletion request with axios
      await axios.put('/api/settings', {
        name: 'featuredProductId',
        value: featuredProductId,
      });

      await axios.put('/api/settings', {
        name: 'shippingFee',
        value: shippingFee,
      });
      setIsLoading(false);

      // Display a success notification with SweetAlert2
      await Swal.fire({
        title: 'Success',
        text: 'Featured product saved successfully',
        icon: 'success',
      });
    } catch (error) {
      console.error(error);
      // Displaying error notification with SweetAlert2
      Swal.fire({
        title: 'Error',
        text: 'An error occurred while setting featured product',
        icon: 'error',
      });
    }
  }

  return (
    <>
      <h1 className='mb-4'>Settings</h1>
      {isLoading && (
        <div className='flex justify-center my-5'>
          <BarLoader />
        </div>
      )}
      {!isLoading && (
        <>
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
          <label>Shipping price (in usd)</label>
          <input
            type='number'
            value={shippingFee}
            onChange={(e) => setShippingFee(e.target.value)}
          />
          <div>
            <button onClick={saveSettings} className='btn-primary'>
              Save settings
            </button>
          </div>
        </>
      )}
    </>
  );
}
