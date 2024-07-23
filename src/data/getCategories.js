/**
 * @module getCategory
 * @description Module for fetching product categories from the FakeStore API.
 */

/**
 * @typedef {string} Category
 * @description A string representing a product category.
 */

/**
 * @exports getCategory
 */
export const getCategory = {
  /**
   * Fetches all product categories from the FakeStore API.
   * @function fetchCategories
   * @returns {Promise<Category[]>} A promise that resolves to an array of category strings.
   * @throws {Error} If there's an error fetching the categories.
   */
  async fetchCategories() {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      if (!response.ok) throw new Error("Failed to fetch categories");
      return await response.json();
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },
};