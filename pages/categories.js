import EditDeleteBtn from '@/components/ui/EditDeleteBtn';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CategoriesPage = ({ data: initialCategories }) => {
  const [name, setName] = useState('');
  const [parentCategory, setParentCategory] = useState('');

  const [categories, setCategories] = useState(initialCategories);

  useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  // useEffect(() => {
  //   setCategories(data);
  //   // axios.get('/api/categories').then((result) => {
  //   //   setCategories(result.data);
  //   // });
  // }, []);

  async function saveCategory(e) {
    e.preventDefault();
    try {
      await axios.post('/api/categories', { name, parentCategory });
      const res = await axios.get('/api/categories');
      setCategories(res.data);
    } catch (error) {
      throw new Error(error);
    }
    setName('');
  }

  return (
    <>
      <h1 className='mb-4'>Categories</h1>
      <label>New Category name</label>
      <form
        onSubmit={saveCategory}
        className='flex justify-center items-center gap-2'
      >
        <input
          className='mb-0'
          type='text'
          placeholder={'Category name'}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <select
          className='mb-0 min-w-[12rem] max-w-[20%]'
          onChange={(e) => setParentCategory(e.target.value)}
          value={parentCategory}
        >
          <option value=''>No parent category</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
        <button type='submit' className='btn-primary'>
          Save
        </button>
      </form>
      <table className='basic mt-4'>
        <thead>
          <tr>
            <td>Category name</td>
            <td>Parent category</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category?.parent?.name || '----'}</td>
                <td>
                  <EditDeleteBtn entity={category._id} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export async function getStaticProps(context) {
  const res = await axios.get('http://localhost:3000/api/categories');
  const { data } = res;

  return {
    props: { data },
  };
}

export default CategoriesPage;
