import Link from 'next/link';
import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

const EditDeleteBtn = ({ entity, handleEdit, handleDelete }) => {
  return entity.collectionName === 'categories' ? (
    <>
      <Link
        href={`/${entity.collectionName}`}
        className='mb-1 md:mb-0'
        onClick={() => handleEdit(entity)}
      >
        <AiOutlineEdit />
        Edit
      </Link>
      <Link
        onClick={() => handleDelete(entity)}
        href={`/${entity.collectionName}`}
      >
        <AiOutlineDelete />
        Delete
      </Link>
    </>
  ) : (
    <>
      <Link
        className='mb-1 md:mb-0'
        href={`/${entity.collectionName}/edit/${entity._id}`}
      >
        <AiOutlineEdit />
        Edit
      </Link>
      <Link href={`/${entity.collectionName}/delete/${entity._id}`}>
        <AiOutlineDelete />
        Delete
      </Link>
    </>
  );
};

export default EditDeleteBtn;
