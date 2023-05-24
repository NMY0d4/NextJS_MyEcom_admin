import React from 'react';

function NewProduct() {
  return (
    <div className='w-[80%] mx-auto'>
      <h1 className='text-primary mb-3'>New Product</h1>
      <label>Product name</label>
      <input type='text' placeholder='Product name' />
      <label>Description</label>
      <textarea placeholder='descritpion'></textarea>
      <label>Price (in USD)</label>
      <input type='number' placeholder='price'></input>
      <button className='btn-primary'>Save</button>
    </div>
  );
}

export default NewProduct;
