'use client';

import CartItemCard from '@/components/CartItemCard';
import { useCart } from '@/Context/CartContext';
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, clear, total } = useCart();

  const router = useRouter();

  if (cart.length === 0)
    return <p className="p-6 text-center text-gray-500">Your cart is empty.</p>;

  const handleCheckout = () => {
    clear();
    router.push('/checkout');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Your Cart</h1>

      <div className="flex flex-col gap-2">
        {cart.map((item) => (
          <CartItemCard
            key={item._id}
            _id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>

      <div className="mt-6 text-right">
        <p className="font-bold text-lg">Total: ₹{total}</p>
        <button
          onClick={handleCheckout}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
