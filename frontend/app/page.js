'use client';
import { useEffect, useState } from 'react';
import API from '@/lib/api';
import Navbar from '@/components/Navbar';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get('/products').then(res => setProducts(res.data));
  }, []);

  const addToCart = async (productId) => {
    await API.post('/cart', { productId, quantity: 1 });
    alert('Added to cart!');
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">All Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product._id} className="border rounded-lg p-4 shadow hover:shadow-lg">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded"/>
              <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-500">{product.category}</p>
              <p className="text-green-600 font-bold text-lg">₹{product.price}</p>
              <p className="text-sm text-gray-400">Stock: {product.stock}</p>
              <button
                onClick={() => addToCart(product._id)}
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
