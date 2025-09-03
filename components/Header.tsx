import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-900 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">E-commerce</h1>
      <nav className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/cart">Cart</Link>
      </nav>
    </header>
  );
}
