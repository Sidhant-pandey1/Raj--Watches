// app/api/watches/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Pagination
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 12;
    const skip = (page - 1) * limit;

    // Filters
    const maxPrice = searchParams.get("price");
    const categories = searchParams.getAll("category");

    const brandsString = searchParams.get("brands");
    const sort = searchParams.get("sort");
    const searchQuery = searchParams.get("search");
    const gendersString = searchParams.get("gender");

    const brands = brandsString ? brandsString.split(",") : [];
    const genders = gendersString ? gendersString.split(",") : [];

    const whereClause = {};

    // Search query filter (matches brand or modelNumber)
    if (searchQuery) {
      whereClause.OR = [
        { brand: { contains: searchQuery, mode: "insensitive" } },
        { modelNumber: { contains: searchQuery, mode: "insensitive" } }
      ];
    }

    // Category processing
    let allowedCategories = [];
    if (categories.length > 0 && !categories.includes("all")) {
      allowedCategories = [...categories];
    }

    // Gender processing mapped to categories
    let genderCategories = [];
    if (genders.length > 0) {
      if (genders.includes("Men")) {
        genderCategories.push("guys watch", "smart-guys watch", "unisex watch", "smart-unisex watch", "couple watch");
      }
      if (genders.includes("Women")) {
        genderCategories.push("girls watch", "smart-girls watch", "unisex watch", "smart-unisex watch", "couple watch");
      }
      if (genders.includes("Unisex")) {
        genderCategories.push("unisex watch", "smart-unisex watch", "couple watch");
      }
    }

    let finalCategories = [];
    if (allowedCategories.length > 0 && genderCategories.length > 0) {
      // Intersection
      finalCategories = allowedCategories.filter(c => genderCategories.some(gc => gc.toLowerCase() === c.toLowerCase()));
      if (finalCategories.length === 0) finalCategories = ["__none__"];
    } else if (allowedCategories.length > 0) {
      finalCategories = allowedCategories;
    } else if (genderCategories.length > 0) {
      finalCategories = genderCategories;
    }

    // Apply category filter
    if (finalCategories.length > 0) {
      whereClause.category = {
        in: finalCategories,
        mode: "insensitive",
      };
    }

    // Price filter
    if (maxPrice && !isNaN(parseFloat(maxPrice))) {
      whereClause.price = { lte: parseFloat(maxPrice) };
    }

    // Brand filter (case-insensitive)
    if (brands.length > 0) {
      whereClause.brand = {
        in: brands,
        mode: "insensitive",
      };
    }

    // Sorting logic
    let orderBy = { createdAt: "desc" };
    if (sort === "asc") orderBy = { price: "asc" };
    if (sort === "desc") orderBy = { price: "desc" };

    // Count total
    const totalWatches = await prisma.watch.count({ where: whereClause });
    const totalPages = Math.max(1, Math.ceil(totalWatches / limit));

    // Fetch paginated watches
    const watches = await prisma.watch.findMany({
      where: whereClause,
      orderBy,
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        brand: true,
        price: true,
        discountedPrice: true,
        images: true,
        category: true,
        inStock: true,
        modelNumber: true,
        description: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        status: "success",
        page,
        totalPages,
        count: watches.length,
        data: watches,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error fetching watches:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to retrieve watches.",
        details: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}
















// import { NextResponse } from "next/server";

// export async function GET() {
//   // Temporary: return empty list instead of hitting DB
//   const watches = [];
// console.log("API /api/watches result count:", watches.length);

//   return NextResponse.json(watches, {
//     status: 200,
//     headers: {
//       "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
//     },
//   });
// }

// export const revalidate = 3600;













// // app/api/watches/route.js
// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);

//     // Pagination
//     const page = parseInt(searchParams.get("page")) || 1;
//     const limit = parseInt(searchParams.get("limit")) || 12;
//     const skip = (page - 1) * limit;

//     // Filters
//     const maxPrice = searchParams.get("price");
//     const category = searchParams.get("category");
//     const brandsString = searchParams.get("brands");
//     const sort = searchParams.get("sort");
//     const brands = brandsString ? brandsString.split(",") : [];

//     const whereClause = {};

//     // Category filter
//     if (category && category.toLowerCase() !== "all") {
//       whereClause.category = { equals: category, mode: "insensitive" };
//     }

//     // Price filter
//     if (maxPrice && !isNaN(parseFloat(maxPrice))) {
//       whereClause.price = { lte: parseFloat(maxPrice) };
//     }

//     // Brand filter (case-insensitive)
//     if (brands.length > 0) {
//       whereClause.brand = {
//         in: brands,
//         mode: "insensitive",
//       };
//     }

//     // Sorting logic
//     let orderBy = { createdAt: "desc" };
//     if (sort === "asc") orderBy = { price: "asc" };
//     if (sort === "desc") orderBy = { price: "desc" };

//     // Count total
//     const totalWatches = await prisma.watch.count({ where: whereClause });
//     const totalPages = Math.max(1, Math.ceil(totalWatches / limit));

//     // Fetch paginated watches
//     const watches = await prisma.watch.findMany({
//       where: whereClause,
//       orderBy,
//       skip,
//       take: limit,
//       select: {
//         id: true,
//         name: true,
//         brand: true,
//         price: true,
//         discountedPrice: true,
//         images: true,
//         category: true,
//         inStock: true,
//         modelNumber: true,
//         description: true,
//         createdAt: true,
//       },
//     });

//     return NextResponse.json(
//       {
//         status: "success",
//         page,
//         totalPages,
//         count: watches.length,
//         data: watches,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("❌ Error fetching watches:", error);
//     return NextResponse.json(
//       {
//         status: "error",
//         message: "Failed to retrieve watches.",
//         details: error?.message || String(error),
//       },
//       { status: 500 }
//     );
//   }
// }















// // // app/api/products/[id]/route.js
// // import prisma from "@/lib/prisma";

// // export async function GET(request, { params }) {
// //   try {
// //     // IMPORTANT: await params before using its properties
// //     const { id } = await params;

// //     // Try by string id first
// //     let product = await prisma.watch.findUnique({ where: { id } });

// //     // If not found and id looks numeric, try Number(id)
// //     if (!product) {
// //       const maybeNum = Number(id);
// //       if (!Number.isNaN(maybeNum)) {
// //         product = await prisma.watch.findUnique({ where: { id: maybeNum } });
// //       }
// //     }

// //     if (!product) {
// //       return new Response(JSON.stringify({ error: "Product not found" }), {
// //         status: 404,
// //         headers: { "Content-Type": "application/json" },
// //       });
// //     }

// //     return new Response(JSON.stringify(product), {
// //       status: 200,
// //       headers: { "Content-Type": "application/json" },
// //     });
// //   } catch (error) {
// //     console.error("Error fetching product:", error);
// //     return new Response(JSON.stringify({ error: "Failed to fetch product" }), {
// //       status: 500,
// //       headers: { "Content-Type": "application/json" },
// //     });
// //   }
// // }






// // // import { NextResponse } from "next/server";
// // // import prisma from "@/lib/prisma";

// // // export async function GET(request) {
// // //   try {
// // //     const { searchParams } = new URL(request.url);

// // //     // Pagination
// // //     const page = parseInt(searchParams.get("page")) || 1;
// // //     const limit = parseInt(searchParams.get("limit")) || 12;
// // //     const skip = (page - 1) * limit;

// // //     // Filters
// // //     const maxPrice = searchParams.get("price");
// // //     const category = searchParams.get("category");
// // //     const brandsString = searchParams.get("brands");
// // //     const sort = searchParams.get("sort"); // ✅ new: sort param
// // //     const brands = brandsString ? brandsString.split(",") : [];

// // //     const whereClause = {};

// // //     // ✅ Category filter
// // //     if (category && category.toLowerCase() !== "all") {
// // //       whereClause.category = { equals: category, mode: "insensitive" };
// // //     }

// // //     // ✅ Price filter
// // //     if (maxPrice && !isNaN(parseFloat(maxPrice))) {
// // //       whereClause.price = { lte: parseFloat(maxPrice) };
// // //     }

// // //     // ✅ Brand filter (case-insensitive)
// // //     if (brands.length > 0) {
// // //       whereClause.brand = {
// // //         in: brands.map((b) => b.toLowerCase()),
// // //         mode: "insensitive",
// // //       };
// // //     }

// // //     // ✅ Sorting logic
// // //     let orderBy = { createdAt: "desc" };
// // //     if (sort === "asc") orderBy = { price: "asc" };
// // //     if (sort === "desc") orderBy = { price: "desc" };

// // //     // ✅ Count total
// // //     const totalWatches = await prisma.watch.count({ where: whereClause });
// // //     const totalPages = Math.ceil(totalWatches / limit) || 1;

// // //     // ✅ Fetch paginated watches
// // //     const watches = await prisma.watch.findMany({
// // //       where: whereClause,
// // //       orderBy,
// // //       skip,
// // //       take: limit,
// // //       select: {
// // //         id: true,
// // //         name: true,
// // //         brand: true,
// // //         price: true,
// // //         discountedPrice: true,
// // //         images: true,
// // //         category: true,
// // //         inStock: true,
// // //         modelNumber: true,
// // //         description: true,
// // //         createdAt: true,
// // //       },
// // //     });

// // //     return NextResponse.json(
// // //       {
// // //         status: "success",
// // //         page,
// // //         totalPages,
// // //         count: watches.length,
// // //         data: watches,
// // //       },
// // //       { status: 200 }
// // //     );
// // //   } catch (error) {
// // //     console.error("❌ Error fetching watches:", error);
// // //     return NextResponse.json(
// // //       {
// // //         status: "error",
// // //         message: "Failed to retrieve watches.",
// // //         details: error.message,
// // //       },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }
  