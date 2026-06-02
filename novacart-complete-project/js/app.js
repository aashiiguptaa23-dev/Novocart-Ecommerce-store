import { fetchProducts } from "./api.js";
import { renderProducts } from "./products.js";
import { searchProducts } from "./search.js";
import { updateCartUI, initCartSidebar } from "./cart.js";
import { showSkeletonLoading } from "./skeleton.js";
import {
    renderCategoryFilters,
    filterByCategory,
    setActiveCategoryButton
} from "./categories.js";
import {
    getSearchSuggestions,
    renderSearchSuggestions,
    hideSearchSuggestions
} from "./suggestions.js";
import { initProductModal } from "./modal.js";
import { initAuth } from "./auth.js";
import { initWishlistSidebar, updateWishlistUI } from "./wishlist.js";
import { initTheme } from "./theme.js";

let allProducts = [];
let activeCategory = "all";

async function init() {
    showSkeletonLoading();

    try {
        allProducts = await fetchProducts();
    } catch {
        document.getElementById("products").innerHTML =
            `<p class="empty-msg no-products">Failed to load products. Please refresh.</p>`;
        return;
    }

    renderCategoryFilters(allProducts, onCategorySelect);
    applyFilters();
    updateCartUI();
    updateWishlistUI();
}

function onCategorySelect(category, btn) {
    activeCategory = category;
    setActiveCategoryButton(btn);
    applyFilters();
}

function applyFilters() {
    const query = document.getElementById("searchInput").value;
    let filtered = filterByCategory(allProducts, activeCategory);
    filtered = searchProducts(filtered, query);
    renderProducts(filtered);
}

function setupSearch() {
    const searchInput = document.getElementById("searchInput");

    searchInput.addEventListener("input", (e) => {
        const query = e.target.value;
        const suggestions = getSearchSuggestions(allProducts, query);
        renderSearchSuggestions(suggestions, (title) => {
            searchInput.value = title;
            applyFilters();
        });
        applyFilters();
    });

    searchInput.addEventListener("focus", (e) => {
        const suggestions = getSearchSuggestions(allProducts, e.target.value);
        renderSearchSuggestions(suggestions, (title) => {
            searchInput.value = title;
            applyFilters();
        });
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".search-wrapper")) {
            hideSearchSuggestions();
        }
    });
}

function setupCategoryAll() {
    const allBtn = document.querySelector('[data-category="all"]');
    allBtn.addEventListener("click", () => {
        activeCategory = "all";
        setActiveCategoryButton(allBtn);
        applyFilters();
    });
}

initTheme();
initAuth();
initProductModal();
initCartSidebar();
initWishlistSidebar();
setupSearch();
setupCategoryAll();
init();
