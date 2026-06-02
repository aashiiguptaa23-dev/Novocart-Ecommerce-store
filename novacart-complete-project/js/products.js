import { addToCart } from "./cart.js";
import { showToast } from "./ui.js";
import { openProductModal } from "./modal.js";
import { toggleWishlist, isInWishlist } from "./wishlist.js";

export function renderProducts(products) {
    const container = document.getElementById("products");
    container.innerHTML = "";

    if (!products.length) {
        container.innerHTML = `<p class="empty-msg no-products">No products found.</p>`;
        return;
    }

    products.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        const inWishlist = isInWishlist(product.id);

        card.innerHTML = `
            <button class="wishlist-heart ${inWishlist ? "active" : ""}" title="Add to wishlist" aria-label="Toggle wishlist">
                ${inWishlist ? "❤️" : "🤍"}
            </button>
            <img src="${product.image}" alt="${product.title}" loading="lazy" />
            <span class="product-category">${product.category}</span>
            <h3>${product.title}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <div class="card-actions">
                <button class="secondary-btn quick-view-btn">Quick View</button>
                <button class="primary-btn add-cart-btn">Add to Cart</button>
            </div>
        `;

        card.querySelector(".wishlist-heart").addEventListener("click", (e) => {
            e.stopPropagation();
            const active = toggleWishlist(product);
            const btn = card.querySelector(".wishlist-heart");
            btn.classList.toggle("active", active);
            btn.textContent = active ? "❤️" : "🤍";
        });

        card.querySelector(".quick-view-btn").addEventListener("click", () => {
            openProductModal(product);
        });

        card.querySelector("img").addEventListener("click", () => {
            openProductModal(product);
        });

        card.querySelector(".add-cart-btn").addEventListener("click", () => {
            addToCart(product);
            showToast("Added to cart");
        });

        container.appendChild(card);
    });
}
