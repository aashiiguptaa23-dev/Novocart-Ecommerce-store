export function getUniqueCategories(products) {
    return [...new Set(products.map((p) => p.category))].sort();
}

export function filterByCategory(products, category) {
    if (!category || category === "all") return products;
    return products.filter((p) => p.category === category);
}

export function renderCategoryFilters(products, onSelect) {
    const container = document.getElementById("categoryFilters");
    container.innerHTML = "";

    getUniqueCategories(products).forEach((category) => {
        const btn = document.createElement("button");
        btn.classList.add("category-btn");
        btn.dataset.category = category;
        btn.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        btn.addEventListener("click", () => onSelect(category, btn));
        container.appendChild(btn);
    });
}

export function setActiveCategoryButton(activeBtn) {
    document.querySelectorAll(".category-btn").forEach((btn) => {
        btn.classList.toggle("active", btn === activeBtn);
    });
}
