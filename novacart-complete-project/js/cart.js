import { saveCart, getCart } from "./storage.js";
import { showToast } from "./ui.js";

let cart = getCart();

function findCartIndex(productId) {
    return cart.findIndex((item) => item.id === productId);
}

export function addToCart(product) {
    const index = findCartIndex(product.id);

    if (index >= 0) {
        cart[index].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
    updateCartUI();
}

export function updateQuantity(productId, delta) {
    const index = findCartIndex(productId);
    if (index < 0) return;

    cart[index].quantity += delta;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
        showToast("Removed from cart");
    }

    saveCart(cart);
    updateCartUI();
}

export function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    saveCart(cart);
    updateCartUI();
    showToast("Removed from cart");
}

export function updateCartUI() {
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;
    let itemCount = 0;

    if (!cart.length) {
        cartItems.innerHTML = `<p class="empty-msg">Your cart is empty.</p>`;
    }

    cart.forEach((item) => {
        total += item.price * item.quantity;
        itemCount += item.quantity;

        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <img src="${item.image}" alt="${item.title}" />
            <div class="cart-item-info">
                <h4>${item.title}</h4>
                <p>$${item.price.toFixed(2)}</p>
                <div class="qty-controls">
                    <button class="qty-btn" data-action="decrease" aria-label="Decrease quantity">−</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" data-action="increase" aria-label="Increase quantity">+</button>
                </div>
            </div>
            <button class="icon-btn remove-cart" title="Remove" aria-label="Remove item">🗑️</button>
        `;

        div.querySelector('[data-action="decrease"]').addEventListener("click", () => {
            updateQuantity(item.id, -1);
        });

        div.querySelector('[data-action="increase"]').addEventListener("click", () => {
            updateQuantity(item.id, 1);
        });

        div.querySelector(".remove-cart").addEventListener("click", () => {
            removeFromCart(item.id);
        });

        cartItems.appendChild(div);
    });

    cartCount.textContent = itemCount;
    cartTotal.textContent = total.toFixed(2);
}

export function initCartSidebar() {
    const cartBtn = document.getElementById("cartBtn");
    const cartSidebar = document.getElementById("cartSidebar");
    const closeCart = document.getElementById("closeCart");
    const overlay = document.getElementById("sidebarOverlay");

    cartBtn.addEventListener("click", () => {
        document.getElementById("wishlistSidebar").classList.add("sidebar-closed");
        cartSidebar.classList.remove("sidebar-closed");
        overlay.classList.remove("hidden");
    });

    closeCart.addEventListener("click", () => {
        cartSidebar.classList.add("sidebar-closed");
        overlay.classList.add("hidden");
    });

    overlay.addEventListener("click", () => {
        cartSidebar.classList.add("sidebar-closed");
        document.getElementById("wishlistSidebar").classList.add("sidebar-closed");
        overlay.classList.add("hidden");
    });
}

// Migrate old cart format (plain products without quantity)
cart = cart.map((item) => (item.quantity ? item : { ...item, quantity: 1 }));
const merged = [];
cart.forEach((item) => {
    const existing = merged.find((m) => m.id === item.id);
    if (existing) existing.quantity += item.quantity || 1;
    else merged.push({ ...item, quantity: item.quantity || 1 });
});
cart = merged;
saveCart(cart);
