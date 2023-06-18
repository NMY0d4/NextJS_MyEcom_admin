import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';
import Swal from 'sweetalert2';

export default function SettingsPage() {
  const [products, setProducts] = useState([]);
  const [featuredProductId, setFeaturedProductId] = useState('');
  const [productLoading, setProductLoading] = useState(false);
  const [featuredLoading, setFeaturedLoading] = useState(true);

  useEffect(() => {
    setProductLoading(true);
    axios.get('/api/products').then((res) => {
      setProducts(res.data);
      setProductLoading(false);
    });
    setFeaturedLoading(true);
    axios.get(`/api/settings?name=featuredProductId`).then((res) => {
      setFeaturedProductId(res.data.value);
      setFeaturedLoading(false);
    });
  }, []);

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
      // Make your deletion request with axios
      await axios.put('/api/settings', {
        name: 'featuredProductId',
        value: featuredProductId,
      });

      // Display a success notification with SweetAlert2
      Swal.fire({
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
      {(productLoading || featuredLoading) && (
        <div className='flex justify-center my-5'>
          <BarLoader />
        </div>
      )}
      {!productLoading && !featuredLoading && (
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
