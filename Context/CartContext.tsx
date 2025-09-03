'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type CartItem = {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  add: (item: {
    _id: string;
    name: string;
    price: number;
    image: string;
  }) => void;
  increase: (_id: string) => void;
  decrease: (_id: string) => void;
  remove: (_id: string) => void;
  clear: () => void;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const add = (item: {
    _id: string;
    name: string;
    price: number;
    image: string;
  }) => {
    setCart((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const increase = (_id: string) =>
    setCart((prev) =>
      prev.map((i) => (i._id === _id ? { ...i, quantity: i.quantity + 1 } : i))
    );

  const decrease = (_id: string) =>
    setCart((prev) =>
      prev
        .map((i) => (i._id === _id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );

  const remove = (_id: string) =>
    setCart((prev) => prev.filter((i) => i._id !== _id));

  const clear = () => setCart([]);

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, add, increase, decrease, remove, clear, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
