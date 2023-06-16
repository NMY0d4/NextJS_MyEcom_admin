import { useState } from 'react';

export default function AdminsPage() {
  const [email, setEmail] = useState('');
  function addAdmin() {}
  return (
    <>
      <h1>Admins</h1>
      <h2>Add new admins</h2>

      <form className='mt-4' onSubmit={addAdmin}>
        <div className='flex gap-2'>
          <input
            type='text'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className='mb-0'
            placeholder='google email'
          />
          <button type='submit' className='btn-default py-1 whitespace-nowrap'>
            Add admin
          </button>
        </div>
      </form>
      <h2>Existing admins</h2>
      <table className='basic'>
        <thead>
          <tr>
            <th className='text-left'>Admin google email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>test Email</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
