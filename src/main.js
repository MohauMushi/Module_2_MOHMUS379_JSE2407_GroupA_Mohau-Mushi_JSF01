import "../style.css";
import Alpine from "alpinejs";
import { getCategory } from "./data/getCategories";
import { getProducts } from "./data/getProducts"

window.Alpine = Alpine;

document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    products: [],
    filteredProducts: [],
    categories: [],
    selectedCategory: "",
    sortOrder: "",
    searchTerm: "",
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
        this.categories = await getCategory.fetchCategories();
      } catch (error) {
        this.error = "Failed to load categories. Please try again.";
      }
    },

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

    applyFiltersAndSort() {
      this.filteredProducts = this.products.filter(
        product =>
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