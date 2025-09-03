'use client';

import ImageUploader from '@/components/ImageUploader';
import ProductCard from '@/components/ProductCard';
import { useState, useEffect } from 'react';

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [search, setSearch] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm({ ...form, image: reader.result as string });
    };
    reader.readAsDataURL(file);

    e.target.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);

    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        image: uploadedUrl || "https://cdn-icons-png.flaticon.com/512/13434/13434972.png",
      };

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const newProduct: Product = await res.json();
      setProducts([...products, newProduct]);
      setForm({ name: '', description: '', price: '', image: '' });
      setUploadedUrl("");
    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  const filtered = products.filter((p) =>
    `${p.name} ${p.description}`.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return <p className="p-6 text-center text-gray-500">Loading products...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Products</h1>

      <form
        onSubmit={handleSubmit}
        className="border border-gray-300 p-6 rounded-lg mb-6 shadow-sm bg-gray-50 space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Product name"
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Product description"
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.price}
          onChange={handleChange}
          required
        />
        <ImageUploader onUploaded={setUploadedUrl} uploadedUrl={uploadedUrl} />

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          disabled={adding}
        >
          {adding ? 'Adding...' : 'Add Product'}
        </button>
      </form>

      <input
        type="text"
        placeholder="Search products..."
        className="border border-gray-300 p-2 rounded w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}