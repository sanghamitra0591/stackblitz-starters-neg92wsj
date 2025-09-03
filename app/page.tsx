import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const products = [
    {
      id: '1',
      name: 'Shirt',
      description: 'Cotton shirt',
      price: 499,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz4kxzGaLtzTwD-Y8L5iA91LQiJuyDZD-XpnSNL-4_M1ejrAyO2Na43-90H3OVHD1b4Y1Fe2uqZwNFW_Pcy9OJ2Hz0QAwEnEKcL5ml1Alzsw',
    },
    {
      id: '2',
      name: 'Shoes',
      description: 'Running shoes',
      price: 1299,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz4kxzGaLtzTwD-Y8L5iA91LQiJuyDZD-XpnSNL-4_M1ejrAyO2Na43-90H3OVHD1b4Y1Fe2uqZwNFW_Pcy9OJ2Hz0QAwEnEKcL5ml1Alzsw',
    },
    {
      id: '3',
      name: 'Watch',
      description: 'Smart watch',
      price: 2999,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz4kxzGaLtzTwD-Y8L5iA91LQiJuyDZD-XpnSNL-4_M1ejrAyO2Na43-90H3OVHD1b4Y1Fe2uqZwNFW_Pcy9OJ2Hz0QAwEnEKcL5ml1Alzsw',
    },
    {
      id: '4',
      name: 'Bag',
      description: 'Travel bag',
      price: 999,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz4kxzGaLtzTwD-Y8L5iA91LQiJuyDZD-XpnSNL-4_M1ejrAyO2Na43-90H3OVHD1b4Y1Fe2uqZwNFW_Pcy9OJ2Hz0QAwEnEKcL5ml1Alzsw',
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={{ ...p, _id: p.id }} />
        ))}
      </div>
    </div>
  );
}
