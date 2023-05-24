import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {}, [id]);

  return <>edit {id} product form here</>;
}
