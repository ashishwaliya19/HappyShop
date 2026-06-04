'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold">HappyShop</Link>
      <div className="flex gap-6">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/cart" className="hover:underline">Cart</Link>
        <Link href="/orders" className="hover:underline">Orders</Link>
        <button onClick={logout} className="hover:underline">Logout</button>
      </div>
    </nav>
  );
}
