import "../style.css";
import Alpine from "alpinejs";
import { fetchSingleProduct } from "./data/getProducts";

window.Alpine = Alpine;

document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    products: [],
    modalOpen: false,
    selectedProduct: {},
    loading: true,
    error: null,
    errorMessage: "Data fetching failed, please check your network connection",
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      try {
        const result = await fetchSingleProduct();
        if (result.response) {
          this.products = result.response;
        } else {
          throw new Error(this.errorMessage);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    openModal(product) {
      this.selectedProduct = product;
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false;
    }
  }));
});

Alpine.start();