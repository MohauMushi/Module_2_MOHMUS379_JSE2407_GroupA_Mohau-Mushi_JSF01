import "../style.css";
import Alpine from "alpinejs";
import { getCategory } from "./data/getCategories";
import { getProducts } from "./data/getProducts";

window.Alpine = Alpine;

/**
 * @namespace productsData
 * @description Alpine.js data object for managing product-related functionality.
 */
document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    /** @type {Array} Array of all products */
    products: [],
    /** @type {Array} Array of filtered products based on user selection */
    filteredProducts: [],
    /** @type {Array} Array of product categories */
    categories: [],
    /** @type {string} Currently selected category */
    selectedCategory: "",
    /** @type {string} Current sort order */
    sortOrder: "",
    /** @type {string} Current search term */
    searchTerm: "",
    /** @type {boolean} Flag to control modal visibility */
    modalOpen: false,
    /** @type {Object} Currently selected product for modal display */
    selectedProduct: {},
    /** @type {boolean} Flag to indicate loading state */
    loading: true,
    /** @type {boolean} Flag to indicate modal loading state */
    modalLoading: false,
    /** @type {null} Error message */
    error: null,

    /**
     * @function init
     * @memberof productsData
     * @description Initializes the application by fetching categories and products.
     */
    async init() {
      await this.fetchCategories();
      await this.fetchProducts();
    },

    /**
     * @function fetchCategories
     * @memberof productsData
     * @description Fetches product categories from the API.
     */
    async fetchCategories() {
      try {
        this.categories = await getCategory.fetchCategories();
      } catch (error) {
        this.error = "Failed to load categories. Please try again.";
      }
    },

    /**
     * @function fetchProducts
     * @memberof productsData
     * @description Fetches products from the API and applies initial filters.
     */
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      try {
        this.products = await getProducts.fetchProducts();
        this.applyFiltersAndSort();
      } catch (error) {
        this.error = "Failed to load products. Please try again.";
      } finally {
        this.loading = false;
      }
    },

    /**
     * @function applyFiltersAndSort
     * @memberof productsData
     * @description Applies category and search filters, and sorts the products.
     */
    applyFiltersAndSort() {
      this.filteredProducts = this.products.filter(
        (product) =>
          (this.selectedCategory === "" ||
            product.category === this.selectedCategory) &&
          (this.searchTerm === "" ||
            product.title.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );

      if (this.sortOrder === "asc") {
        this.filteredProducts.sort((a, b) => a.price - b.price);
      } else if (this.sortOrder === "desc") {
        this.filteredProducts.sort((a, b) => b.price - a.price);
      }
    },

    /**
     * @function openModal
     * @memberof productsData
     * @description Opens the product detail modal and fetches detailed product information.
     * @param {number} productId - The ID of the product to display in the modal.
     */
    async openModal(productId) {
      this.modalOpen = true;
      this.modalLoading = true;
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${productId}`
        );
        if (!response.ok) throw new Error("Failed to fetch product details");
        this.selectedProduct = await response.json();
      } catch (error) {
        console.error("Error fetching product details:", error);
        this.error = "Failed to load product details. Please try again.";
      } finally {
        this.modalLoading = false;
      }
    },

    /**
     * @function closeModal
     * @memberof productsData
     * @description Closes the product detail modal.
     */
    closeModal() {
      this.modalOpen = false;
      // this.selectedProduct = {};
    },
  }));
});

Alpine.start();
