import EditDeleteBtn from '@/components/ui/EditDeleteBtn';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const CategoriesPage = ({ data: initialCategories }) => {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [categories, setCategories] = useState(initialCategories);
  const [properties, setProperties] = useState([]);

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
      const data = { name, parentCategory };
      if (editedCategory) {
        await axios.put('/api/categories', {
          ...data,
          _id: editedCategory._id,
        });
        setEditedCategory(null);
      } else {
        await axios.post('/api/categories', data);
      }
      const res = await axios.get('/api/categories');
      setCategories(res.data);
    } catch (error) {
      console.error(error);
    }
    setName('');
    setParentCategory('');
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
  }

  function deleteCategory(category) {
    Swal.fire({
      title: 'Confirmation',
      text: `Are you sure you want to delete the category ${category.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: 'darkRed',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Si confirmation
        performDeleteCategory(category);
      }
    });
  }

  async function performDeleteCategory(category) {
    try {
      // Effectuer votre requête de suppression avec axios
      await axios.delete(`/api/categories?_id=${category._id}`);

      // Mettre à jour la liste des catégories après la suppression
      const res = await axios.get('/api/categories');
      setCategories(res.data);

      // Afficher une notification de succès avec SweetAlert2
      Swal.fire({
        title: 'Success',
        text: 'Category deleted successfully',
        icon: 'success',
      });
    } catch (error) {
      console.error(error);
      // Afficher une notification d'erreur avec SweetAlert2
      Swal.fire({
        title: 'Error',
        text: 'An error occurred while deleting the category',
        icon: 'error',
      });
    }
  }

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: '', values: '' }];
    });
  }

  return (
    <>
      <h1 className='mb-4'>Categories</h1>
      <label>
        {editedCategory
          ? `Edit category ${editedCategory.name}`
          : 'Create new category'}
      </label>
      <form onSubmit={saveCategory} className='fjustify-center items-center'>
        {/* ------- NAME ------------------ */}
        <div className='flex gap-2'>
          <input
            type='text'
            placeholder={'Category name'}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          {/* ------- PARENT ------------------ */}
          <select
            className='min-w-[12rem] max-w-[20%]'
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
        </div>
        <div className='mb-4'>
          {/* ------- PROPERTY ------------------ */}
          <label className='block'>Properties</label>
          <button
            type='button'
            onClick={addProperty}
            className='btn-default text-sm'
          >
            Add new property
          </button>
          {properties.length > 0 &&
            properties.map((property) => (
              <div className='flex gap-2'>
                <input
                  type='text'
                  placeholder='property name (example: color)'
                />
                <input type='text' placeholder='values, comma separated' />
              </div>
            ))}
        </div>
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
                  {category && (
                    <EditDeleteBtn
                      entity={category}
                      handleEdit={editCategory}
                      handleDelete={deleteCategory}
                    />
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export async function getStaticProps() {
  const res = await axios.get('http://localhost:3000/api/categories');
  const { data } = res;

  return {
    props: { data },
  };
}

export default CategoriesPage;
