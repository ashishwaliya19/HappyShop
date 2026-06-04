'use client';
import { useEffect, useState } from 'react';
import API from '@/lib/api';
import Navbar from '@/components/Navbar';

export default function Cart() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    API.get('/cart').then(res => setCart(res.data));
  }, []);

  const removeItem = async (productId) => {
    await API.delete(`/cart/${productId}`);
    API.get('/cart').then(res => setCart(res.data));
  };

  const placeOrder = async () => {
    const items = cart.items.map(i => ({
      product: i.product._id,
      quantity: i.quantity,
      price: i.product.price
    }));
    const totalAmount = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
    await API.post('/orders', { items, totalAmount, address: 'Default Address' });
    alert('Order placed!');
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        {cart?.items?.length === 0 && <p>Cart is empty</p>}
        {cart?.items?.map(item => (
          <div key={item.product._id} className="flex justify-between items-center border p-4 rounded mb-3">
            <div>
              <h3 className="font-semibold">{item.product.name}</h3>
              <p className="text-gray-500">Qty: {item.quantity}</p>
              <p className="text-green-600">₹{item.product.price}</p>
            </div>
            <button
              onClick={() => removeItem(item.product._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >Remove</button>
          </div>
        ))}
        {cart?.items?.length > 0 && (
          <button
            onClick={placeOrder}
            className="mt-4 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
          >Place Order</button>
        )}
      </div>
    </div>
  );
}
