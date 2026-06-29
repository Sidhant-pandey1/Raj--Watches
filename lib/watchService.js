// lib/watchservice.js
import { prisma } from './prisma';

/**
 * Fetches the most recently added watches.
 * This function should ONLY be called from API routes or Server Components.
 * @returns {Promise<Array>} A list of watch objects ready for the client.
 */
export async function getPopularWatches() {
  try {
    const watches = await prisma.watch.findMany({
      take: 8,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        price: true,
        brand: true,
        images: true,
        modelNumber: true,
        discountedPrice: true,
        category: true,
      },
    });

    // Transform data for client consumption
    return watches.map(watch => ({
      id: watch.id,
      name: watch.name,
      brand: watch.brand,
      modelNumber: watch.modelNumber,
      category: watch.category,
      price: Number(watch.price),
      discountedPrice: watch.discountedPrice ? Number(watch.discountedPrice) : null,
      images: Array.isArray(watch.images) ? watch.images : [],
    }));
  } catch (error) {
    console.error("Database error in getPopularWatches:", error);
    throw new Error('Failed to fetch watches from the database.');
  }
}

/**
 * Fetches a single watch by ID
 * @param {string|number} id - Watch ID
 * @returns {Promise<Object|null>} Watch object or null
 */
export async function getWatchById(id) {
  try {
    // Try by string id first, then numeric fallback
    let watch = await prisma.watch.findUnique({ where: { id } });
    if (!watch) {
      const maybeNum = Number(id);
      if (!Number.isNaN(maybeNum)) {
        watch = await prisma.watch.findUnique({ where: { id: maybeNum } });
      }
    }

    if (!watch) return null;

    return {
      ...watch,
      price: Number(watch.price),
      discountedPrice: watch.discountedPrice ? Number(watch.discountedPrice) : null,
      images: Array.isArray(watch.images) ? watch.images : [],
    };
  } catch (error) {
    console.error(`Database error fetching watch ${id}:`, error);
    throw new Error('Failed to fetch watch from database.');
  }
}

/**
 * Fetches watches by category
 * @param {string} category - Category name
 * @param {number} limit - Optional limit
 * @returns {Promise<Array>} List of watches
 */
export async function getWatchesByCategory(category, limit = 20) {
  try {
    const watches = await prisma.watch.findMany({
      where: {
        category: {
          equals: category,
          mode: 'insensitive',
        },
      },
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return watches.map(watch => ({
      ...watch,
      price: Number(watch.price),
      discountedPrice: watch.discountedPrice ? Number(watch.discountedPrice) : null,
      images: Array.isArray(watch.images) ? watch.images : [],
    }));
  } catch (error) {
    console.error(`Database error fetching category ${category}:`, error);
    throw new Error('Failed to fetch watches by category.');
  }
}

/**
 * Fetches watches by brand
 * @param {string} brand - Brand name
 * @param {number} limit - Optional limit
 * @returns {Promise<Array>} List of watches
 */
export async function getWatchesByBrand(brand, limit = 20) {
  try {
    const watches = await prisma.watch.findMany({
      where: {
        brand: {
          equals: brand,
          mode: 'insensitive',
        },
      },
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return watches.map(watch => ({
      ...watch,
      price: Number(watch.price),
      discountedPrice: watch.discountedPrice ? Number(watch.discountedPrice) : null,
      images: Array.isArray(watch.images) ? watch.images : [],
    }));
  } catch (error) {
    console.error(`Database error fetching brand ${brand}:`, error);
    throw new Error('Failed to fetch watches by brand.');
  }
}
