import ProductForm from '@/components/ProductForm';
import { Spinner } from '@/components/ui/spinner';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

export default function EditProductPage() {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/products?id=${id}`);
        setProduct(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error during product recovery :', error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <>
      {isLoading && (
        <div className='flex justify-center my-10'>
          <BarLoader />
        </div>
      )}
      {product && <ProductForm product={product} formTitle='Edit' />}
    </>
  );
}
