import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const products = await db.collection("products").find({}).toArray();
    return NextResponse.json(products);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db();

    const newProduct = {
      name: body.name,
      description: body.description,
      price: body.price,
      image: body.image || "/placeholder.png",
      createdAt: new Date(),
    };

    const result = await db.collection("products").insertOne(newProduct);

    return NextResponse.json({ ...newProduct, __id: result.insertedId });
  } catch (err) {
    console.error("POST /api/products error:", err);
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}

