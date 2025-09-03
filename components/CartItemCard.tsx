'use client';

import { useCart } from '@/Context/CartContext';

type Props = {
  _id: string;
  name: string;
  price: number;
  image?: string;
};

export default function CartItemCard({ _id, name, price, image }: Props) {
  const { cart, increase, decrease, remove } = useCart();
  const cartItem = cart.find((c) => c._id === _id);

  if (!cartItem) return null;

  return (
    <div className="flex items-center gap-4 border-b border-gray-200 py-2">
      <img
        src={image || 'https://cdn-icons-png.flaticon.com/512/13434/13434972.png'}
        alt={name}
        className="w-16 h-16 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{name}</h3>
        <p className="text-gray-700">₹{price}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => decrease(_id)}
          disabled={cartItem.quantity === 1}
          className={`px-2 py-1 rounded border ${
            cartItem.quantity === 1
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-gray-200'
          }`}
        >
          -
        </button>
        <span>{cartItem.quantity}</span>
        <button
          onClick={() => increase(_id)}
          disabled={cartItem.quantity === 10}
          className={`px-2 py-1 rounded border ${
            cartItem.quantity === 10
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-gray-200'
          }`}
        >
          +
        </button>
        <button
          onClick={() => remove(_id)}
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
