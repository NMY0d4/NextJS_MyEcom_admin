import Link from 'next/link';
import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

const EditDeleteBtn = ({ entity, handleEdit }) => {
  console.log(entity.collectionName);
  return entity.collectionName === 'categories' ? (
    <>
      <Link
        href={`/${entity.collectionName}`}
        onClick={() => handleEdit(entity)}
      >
        <AiOutlineEdit />
        Edit
      </Link>
      <Link href={`/${entity.collectionName}/delete/${entity._id}`}>
        <AiOutlineDelete />
        Delete
      </Link>
    </>
  ) : (
    <>
      <Link href={`/${entity.collectionName}/edit/${entity._id}`}>
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