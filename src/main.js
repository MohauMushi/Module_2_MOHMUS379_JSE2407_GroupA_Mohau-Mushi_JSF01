import "../style.css";
import Alpine from "alpinejs";
import { fetchSingleProduct } from "./data/getProducts";

window.Alpine = Alpine;

document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    products: [],
    async fetchProducts() {
      const result = await fetchSingleProduct();
      if (result.response) {
        this.products = result.response;
      } else {
        console.error("Error fetching products:", result.error);
      }
    },
  }));
});

Alpine.start();
