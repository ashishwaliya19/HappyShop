'use client';
import { useEffect, useState } from 'react';
import API from '@/lib/api';
import Navbar from '@/components/Navbar';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get('/orders').then(res => setOrders(res.data));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
        {orders.length === 0 && <p>No orders yet</p>}
        {orders.map(order => (
          <div key={order._id} className="border p-4 rounded mb-4 shadow">
            <p className="font-semibold">Order ID: {order._id}</p>
            <p className="text-green-600 font-bold">Total: ₹{order.totalAmount}</p>
            <p className="text-blue-500 capitalize">Status: {order.status}</p>
            <div className="mt-2">
              {order.items.map(item => (
                <p key={item.product?._id} className="text-gray-600">
                  {item.product?.name} x {item.quantity}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
