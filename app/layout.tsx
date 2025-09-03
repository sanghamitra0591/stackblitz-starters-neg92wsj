import { CartProvider } from "@/Context/CartContext";
import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "E-commerce",
  description: "Simple E-commerce Platform"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <CartProvider>
          <Header />
          <main className="max-w-6xl mx-auto p-6">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
