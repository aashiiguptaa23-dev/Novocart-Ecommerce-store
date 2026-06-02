import { addToCart } from "./cart.js";
import { showToast } from "./ui.js";

let currentProduct = null;

export function openProductModal(product) {
    currentProduct = product;

    document.getElementById("modalImage").src = product.image;
    document.getElementById("modalImage").alt = product.title;
    document.getElementById("modalTitle").textContent = product.title;
    document.getElementById("modalCategory").textContent = product.category;
    document.getElementById("modalDescription").textContent = product.description;
    document.getElementById("modalPrice").textContent = `$${product.price.toFixed(2)}`;

    document.getElementById("productModal").classList.remove("hidden");
}

export function closeProductModal() {
    document.getElementById("productModal").classList.add("hidden");
    currentProduct = null;
}

export function initProductModal() {
    document.getElementById("closeModal").addEventListener("click", closeProductModal);

    document.getElementById("productModal").addEventListener("click", (e) => {
        if (e.target.id === "productModal") closeProductModal();
    });

    document.getElementById("modalAddToCart").addEventListener("click", () => {
        if (!currentProduct) return;
        addToCart(currentProduct);
        showToast("Added to cart");
        closeProductModal();
    });
}
