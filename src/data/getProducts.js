/**
 * @module getProducts
 * @description Module for fetching product data from the FakeStore API.
 */

/**
 * @typedef {Object} Product
 * @property {number} id - The unique identifier of the product.
 * @property {string} title - The name of the product.
 * @property {number} price - The price of the product.
 * @property {string} description - A brief description of the product.
 * @property {string} category - The category of the product.
 * @property {string} image - The URL of the product image.
 * @property {Object} rating - The rating information of the product.
 * @property {number} rating.rate - The average rating of the product.
 * @property {number} rating.count - The number of ratings for the product.
 */

/**
 * @exports getProducts
 */
export const getProducts = {
  /**
   * Fetches all products from the FakeStore API.
   * @function fetchProducts
   * @returns {Promise<Product[]>} A promise that resolves to an array of Product objects.
   * @throws {Error} If there's an error fetching the products.
   */
  async fetchProducts() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
};