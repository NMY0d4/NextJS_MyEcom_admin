import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
            <th>Recipient</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order.createdAt}</td>
                <td>
                  {order.name} - {order.email}
                  <br />
                  {order.country}
                  <br />
                  {order.streetAddress}
                </td>
                <td>
                  {order.line_items.map((l) => (
                    <>
                      {l.price_data.product_data.name} x {l.quantity}
                      <br />
                    </>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
