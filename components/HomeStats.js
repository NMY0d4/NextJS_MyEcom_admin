import axios from 'axios';
import { subHours } from 'date-fns';
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

  const ordersToday = orders.filter(
    (o) => new Date(o.createdAt) > subHours(new Date(), 24)
  );
  const ordersWeek = orders.filter(
    (o) => new Date(o.createdAt) > subHours(new Date(), 24 * 7)
  );
  const ordersMonth = orders.filter(
    (o) => new Date(o.createdAt) > subHours(new Date(), 24 * 30)
  );

  function ordersTotal(orders) {
    let sum = 0;
    orders.forEach((order) => {
      const { line_items } = order;
      line_items.forEach((li) => {
        const lineSum = (li.quantity * li.price_data.unit_amount) / 100;
        sum += lineSum;
      });
    });
    console.log({ orders });
    return new Intl.NumberFormat('fr-FR').format(sum);
  }

  return (
    <div>
      <h2>Orders</h2>
      <div className='tiles-grid'>
        <div className='tile'>
          <h3 className='tile-header'>Today</h3>
          <div className='tile-number' my-2>
            {ordersToday.length}
          </div>
          <div className='tile-desc'>orders today</div>
        </div>
        <div className='tile'>
          <h3 className='tile-header'>This week</h3>
          <div className='tile-number' my-2>
            {ordersWeek.length}
          </div>
          <div className='tile-desc'>orders this week</div>
        </div>
        <div className='tile'>
          <h3 className='tile-header'>This month</h3>
          <div className='tile-number' my-2>
            {ordersMonth.length}
          </div>
          <div className='tile-desc'>orders this month</div>
        </div>
      </div>
      <h2>Revenue</h2>
      <div className='tiles-grid'>
        <div className='tile'>
          <h3 className='tile-header'>Today</h3>
          <div className='tile-number' my-2>
            $ {ordersTotal(ordersToday)}
          </div>
          <div className='tile-desc'>Revenue today</div>
        </div>
        <div className='tile'>
          <h3 className='tile-header'>This week</h3>
          <div className='tile-number' my-2>
            $ {ordersTotal(ordersWeek)}
          </div>
          <div className='tile-desc'>Revenue this week</div>
        </div>
        <div className='tile'>
          <h3 className='tile-header'>This month</h3>
          <div className='tile-number' my-2>
            $ {ordersTotal(ordersMonth)}
          </div>
          <div className='tile-desc'>Revenue this month</div>
        </div>
      </div>
    </div>
  );
}
