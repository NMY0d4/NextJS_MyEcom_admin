import { formatOrderDate } from '@/lib/date';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get('/api/orders').then((res) => setOrders(res.data));
  }, []);

  return (
    <>
      <h1>Orders</h1>
      <table className='basic'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Paid</th>
            <th>Recipient</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order) => (
              <tr key={order._id}>
                <td>{formatOrderDate(order.createdAt)}</td>
                <td className={order.paid ? 'text-green-600' : 'text-red-600'}>
                  {order.paid ? 'YES' : 'NO'}
                </td>
                <td>
                  {order.name} - {order.email}
                  <br />
                  {order.country}
                  <br />
                  {order.streetAddress}
                </td>
                <td>
                  {order.line_items.map((l) => (
                    <Fragment key={l.price_data.product_data.name}>
                      {l.price_data.product_data.name} x {l.quantity}
                      <br />
                    </Fragment>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
