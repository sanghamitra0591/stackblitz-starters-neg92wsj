'use client';

import { useCart } from '@/Context/CartContext';

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const { cart, add, increase, decrease, remove } = useCart();

  if (!product) return null;

  const cartItem = cart.find((i) => i._id === product._id);
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 flex flex-col shadow-sm hover:shadow-md transition">
      <img
        src={product.image || 'https://cdn-icons-png.flaticon.com/512/13434/13434972.png'}
        alt={product.name}
        className="w-full h-48 object-cover mb-4 rounded"
      />
      <h2 className="font-semibold text-lg text-blue-900">{product.name}</h2>
      <p className="text-gray-700 text-sm flex-1 mb-2">{product.description}</p>
      <p className="font-bold text-gray-900">₹{product.price}</p>

      {quantity === 0 ? (
        <button
          onClick={() =>
            add({
              _id: product._id,
              name: product.name,
              price: product.price,
              image: product.image,
            })
          }
          className="bg-blue-600 text-white px-3 py-1 mt-4 rounded hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      ) : (
        <div className="flex items-center mt-4 space-x-2">
          <button
            onClick={() => decrease(product._id)}
            disabled={quantity <= 1}
            className={`px-2 py-1 rounded border ${
              cartItem?.quantity === 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-200'
            }`}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => increase(product._id)}
            disabled={quantity >= 10}
            className={`px-2 py-1 rounded border ${
              cartItem?.quantity === 10
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-200'
            }`}
          >
            +
          </button>
          <button
            onClick={() => remove(product._id)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
