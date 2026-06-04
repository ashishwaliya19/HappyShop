'use client';
import { useState } from 'react';
import API from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', form);
      localStorage.setItem('token', res.data.token);
      router.push('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <input
          type="text" placeholder="Name"
          className="w-full border p-2 rounded mb-4"
          onChange={e => setForm({...form, name: e.target.value})}
        />
        <input
          type="email" placeholder="Email"
          className="w-full border p-2 rounded mb-4"
          onChange={e => setForm({...form, email: e.target.value})}
        />
        <input
          type="password" placeholder="Password"
          className="w-full border p-2 rounded mb-4"
          onChange={e => setForm({...form, password: e.target.value})}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >Register</button>
        <p className="text-center mt-4">
          Have account? <Link href="/login" className="text-blue-600">Login</Link>
        </p>
      </div>
    </div>
  );
}
