import { saveWishlist, getWishlist } from "./storage.js";
import { showToast } from "./ui.js";
import { addToCart } from "./cart.js";

let wishlist = getWishlist();

export function isInWishlist(productId) {
    return wishlist.some((p) => p.id === productId);
}

export function toggleWishlist(product) {
    const index = wishlist.findIndex((p) => p.id === product.id);

    if (index >= 0) {
        wishlist.splice(index, 1);
        showToast("Removed from wishlist");
    } else {
        wishlist.push(product);
        showToast("Added to wishlist");
    }

    saveWishlist(wishlist);
    updateWishlistUI();
    return isInWishlist(product.id);
}

export function updateWishlistUI() {
    const wishlistItems = document.getElementById("wishlistItems");
    const wishlistCount = document.getElementById("wishlistCount");

    wishlistCount.textContent = wishlist.length;
    wishlistItems.innerHTML = "";

    if (!wishlist.length) {
        wishlistItems.innerHTML = `<p class="empty-msg">Your wishlist is empty.</p>`;
        return;
    }

    wishlist.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <img src="${item.image}" alt="${item.title}" />
            <div class="cart-item-info">
                <h4>${item.title}</h4>
                <p>$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-actions">
                <button class="icon-btn add-from-wish" title="Add to cart">🛒</button>
                <button class="icon-btn remove-wish" title="Remove">🗑️</button>
            </div>
        `;

        div.querySelector(".add-from-wish").addEventListener("click", () => {
            addToCart(item);
            showToast("Added to cart from wishlist");
        });

        div.querySelector(".remove-wish").addEventListener("click", () => {
            toggleWishlist(item);
        });

        wishlistItems.appendChild(div);
    });
}

export function initWishlistSidebar() {
    const wishlistBtn = document.getElementById("wishlistBtn");
    const wishlistSidebar = document.getElementById("wishlistSidebar");
    const closeWishlist = document.getElementById("closeWishlist");
    const overlay = document.getElementById("sidebarOverlay");

    wishlistBtn.addEventListener("click", () => {
        openSidebar(wishlistSidebar, overlay);
    });

    closeWishlist.addEventListener("click", () => {
        closeSidebar(wishlistSidebar, overlay);
    });
}

export function openSidebar(sidebar, overlay) {
    document.getElementById("cartSidebar").classList.add("sidebar-closed");
    document.getElementById("wishlistSidebar").classList.add("sidebar-closed");

    sidebar.classList.remove("sidebar-closed");
    overlay.classList.remove("hidden");
}

export function closeSidebar(sidebar, overlay) {
    sidebar.classList.add("sidebar-closed");
    if (
        document.getElementById("cartSidebar").classList.contains("sidebar-closed") &&
        document.getElementById("wishlistSidebar").classList.contains("sidebar-closed")
    ) {
        overlay.classList.add("hidden");
    }
}
