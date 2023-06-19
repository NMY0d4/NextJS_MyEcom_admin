import axios from 'axios';
import { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

export default function HomeStats() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/orders').then((res) => {
      setOrders(res.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className='flex justify-center mt-10'>
        <BarLoader />
      </div>
    );
  }


  return (
    <div>
      <h2>Orders</h2>
      <div className='grid grid-cols-3 gap-4'>
        <div className='tile'>
          <h3 className='tile-header'>Today</h3>
          <div className='tile-number' my-2>
            2
          </div>
          <div className='tile-desc'>orders today</div>
        </div>
        <div className='tile'>
          <h3 className='tile-header'>This week</h3>
          <div className='tile-number' my-2>
            2
          </div>
          <div className='tile-desc'>orders today</div>
        </div>
        <div className='tile'>
          <h3 className='tile-header'>This month</h3>
          <div className='tile-number' my-2>
            2
          </div>
          <div className='tile-desc'>orders today</div>
        </div>
      </div>
      <h2>Revenue</h2>
      <div className='grid grid-cols-3 gap-4'>
        <div className='tile'>
          <h3 className='tile-header'>Today</h3>
          <div className='tile-number' my-2>
            $20
          </div>
          <div className='tile-desc'>orders today</div>
        </div>
        <div className='tile'>
          <h3 className='tile-header'>This week</h3>
          <div className='tile-number' my-2>
            $122
          </div>
          <div className='tile-desc'>orders today</div>
        </div>
        <div className='tile'>
          <h3 className='tile-header'>This month</h3>
          <div className='tile-number' my-2>
            $2563
          </div>
          <div className='tile-desc'>orders today</div>
        </div>
      </div>
    </div>
  );
}
