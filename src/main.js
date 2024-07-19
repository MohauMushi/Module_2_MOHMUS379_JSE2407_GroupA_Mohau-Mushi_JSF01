import "../style.css";
import Alpine from "alpinejs";
import { fetchSingleProduct } from "./data/getProducts";

window.Alpine = Alpine;

document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    products: [],
    filteredProducts: [],
    categories: [],
    selectedCategory: "",
    modalOpen: false,
    selectedProduct: {},
    loading: true,
    error: null,

    async init() {
      await this.fetchCategories();
      await this.fetchProducts();
    },

    async fetchCategories() {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        if (!response.ok) throw new Error("Failed to fetch categories");
        this.categories = await response.json();
      } catch (error) {
        console.error("Error fetching categories:", error);
        this.error = "Failed to load categories. Please try again.";
      }
    },

    async fetchProducts() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        this.products = await response.json();
        this.applyFiltersAndSort();
      } catch (error) {
        console.error("Error fetching products:", error);
        this.error = "Failed to load products. Please try again.";
      } finally {
        this.loading = false;
      }
    },

    applyFiltersAndSort() {
      this.filteredProducts = this.products.filter(
        (product) =>
          this.selectedCategory === "" ||
          product.category === this.selectedCategory
      );

    },

    async openModal(product) {
      this.selectedProduct = product;
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false;
    },
  }));
});

Alpine.start();