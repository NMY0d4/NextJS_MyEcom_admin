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

  async function saveCategory(e) {
    e.preventDefault();
    try {
      const data = {
        name,
        parentCategory,
        properties: properties.map((p) => ({
          name: p.name,
          values: p.values.split(',').map((value) => value.trim()),
        })),
      };
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
    setProperties([]);
  }

  function handleCancel() {
    setEditedCategory(null);
    setName('');
    setParentCategory('');
    setProperties([]);
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(','),
      }))
    );
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

  function handlePropertyChange(e) {
    const { name, value } = e.target;
    const [propertyType, index] = name.split('-');

    setProperties((prev) => {
      const updatedProperties = [...prev];
      const property = updatedProperties[index];

      if (propertyType === 'propertyName') {
        property.name = valuevalue;
      } else if (propertyType === 'propertyValues') {
        property.values = value.trim();
      }

      return updatedProperties;
    });
  }

  function removeProperty(iToRemove) {
    setProperties((prev) => {
      return [...prev].filter((_, i) => i !== iToRemove);
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
      <form onSubmit={saveCategory} className='justify-center items-center'>
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
          <h2 className='block pb-2'>Properties</h2>
          <button
            type='button'
            onClick={addProperty}
            className='btn-default text-sm mb-2'
          >
            Add new property
          </button>
          {properties.length > 0 &&
            properties.map((property, i) => (
              <div key={i} className='flex gap-2 mb-2'>
                <input
                  type='text'
                  className='mb-0'
                  name={`propertyName-${i}`}
                  value={property.name}
                  onChange={handlePropertyChange}
                  placeholder='property name (example: color)'
                />
                <input
                  type='text'
                  className='mb-0'
                  name={`propertyValues-${i}`}
                  value={property.values}
                  onChange={handlePropertyChange}
                  placeholder='values, comma separated'
                />
                <button
                  type='button'
                  onClick={() => removeProperty(i)}
                  className='btn-primary-danger'
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
        <div className='flex gap-2'>
          {editedCategory && (
            <button
              type='button'
              onClick={handleCancel}
              className='btn-default'
            >
              Cancel
            </button>
          )}
          <button type='submit' className='btn-primary'>
            Save
          </button>
        </div>
      </form>
      {/* -------  DISPLAY CAT  -------------- */}
      {!editedCategory && (
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
      )}
    </>
  );
};

export async function getServerSideProps({ req }) {
  const res = await axios.get('http://localhost:3000/api/categories', {
    withCredentials: true,
    headers: {
      Cookie: req.headers.cookie,
    },
  });
  const { data } = res;
  return {
    props: { data },
  };
}

export default CategoriesPage;
