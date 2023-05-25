import ProductForm from '@/components/ProductForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EditProductPage() {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const { id } = router.query;

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`/api/products?id=${id}`);
      setProduct(response.data);
    };
    fetchProduct();
  }, [id]);

  return <>{product && <ProductForm product={product} formTitle='Edit' />}</>;
}