import axios from 'axios';
import React, { useState } from 'react';

const CategoriesPage = () => {
  const [name, setName] = useState('');

  async function saveCategory() {
    await axios.post('/api/categories', { name });
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
        <button type='submit' className='btn-primary'>
          Save
        </button>
      </form>
    </>
  );
};

export default CategoriesPage;
