// app/api/products/[id]/route.js
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    // IMPORTANT: await params before using its properties in Next 15
    const { id } = await params;

    const product = await prisma.watch.findUnique({
      where: { id },
    });

    if (!product) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch product" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}