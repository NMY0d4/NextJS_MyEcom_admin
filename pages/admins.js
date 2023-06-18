import { formatOrderDate } from '@/lib/date';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';
import Swal from 'sweetalert2';

export default function AdminsPage() {
  const [email, setEmail] = useState('');
  const [adminEmails, setAdminEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function addAdmin(e) {
    e.preventDefault();
    console.log(email);
    Swal.fire({
      title: 'Confirmation',
      text: `Are you sure you want to add this ${email} as Admin?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Add',
      confirmButtonColor: 'darkRed',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Si confirmation
        AddEmailAsAdmin();
      }
    });
  }

  async function AddEmailAsAdmin() {
    try {
      // Make your deletion request with axios
      await axios.post(`/api/admins`, { email });
      setEmail('');
      loadAdmins();

      // Display a success notification with SweetAlert2
      Swal.fire({
        title: 'Success',
        text: 'Admin created successfully',
        icon: 'success',
      });
    } catch (error) {
      console.error(error);
      // Displaying error notification with SweetAlert2      
      Swal.fire({
        title: 'Error',
        text: error.response.data.message,
        icon: 'error',
      });
    }
  }

  function deleteAdmin(e, id, email) {
    e.preventDefault();
    Swal.fire({
      title: 'Confirmation',
      text: `Are you sure you want to delete this email ${email} from Admin?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'delete',
      confirmButtonColor: 'darkRed',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Si confirmation
        deleteEmailFromAdmin(id);
        loadAdmins();
      }
    });
  }

  async function deleteEmailFromAdmin(id) {
    try {
      // Make your deletion request with axios
      axios.delete(`/api/admins?id=${id}`);
      loadAdmins();

      // Display a success notification with SweetAlert2
      Swal.fire({
        title: 'Success',
        text: 'Admin deleted successfully',
        icon: 'success',
      });
    } catch (error) {
      console.error(error);
      // Displaying error notification with SweetAlert2
      Swal.fire({
        title: 'Error',
        text: 'An error occurred while deleted the admin',
        icon: 'error',
      });
    }
  }

  function loadAdmins() {
    setIsLoading(true);
    axios.get('/api/admins').then((res) => {
      setAdminEmails(res.data);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    loadAdmins();
  }, []);

  return (
    <>
      <h1>Admins</h1>
      <h2>Add new admins</h2>

      <form className='mt-4' onSubmit={(e) => addAdmin(e)}>
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
      <h2 className='mt-4'>Existing admins</h2>
      <table className='basic'>
        <thead>
          <tr>
            <th className='text-left'>Admin google email</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={2} className='flex justify-center items-center my-2'>
                <BarLoader />
              </td>
            </tr>
          )}
          {adminEmails.length > 0 &&
            adminEmails.map((adminEmail) => (
              <tr key={adminEmail._id}>
                <td>{adminEmail.email}</td>
                <td>
                  {adminEmail.createdAt &&
                    formatOrderDate(adminEmail.createdAt)}
                </td>
                <td>
                  <button
                    type='button'
                    onClick={(e) =>
                      deleteAdmin(e, adminEmail._id, adminEmail.email)
                    }
                    className='btn-primary-danger'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
