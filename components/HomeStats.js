import React from 'react';

export default function HomeStats() {
  return (
    <div className=''>
      <h2>Orders</h2>
      <div className='grid grid-cols-3 gap-4'>
        <div className='bg-white shadow-md p-4'>
          <h3>Today</h3>
          <div className='text-3xl text-center' my-2>
            2
          </div>
        </div>
        <div className='bg-white shadow-md p-4'>
          <h3>This week</h3>
          <div className='text-3xl text-center' my-2>
            2
          </div>
        </div>
        <div className='bg-white shadow-md p-4'>
          <h3>This month</h3>
          <div className='text-3xl text-center' my-2>
            2
          </div>
        </div>
      </div>
      <h2>Revenue</h2>
    </div>
  );
}
