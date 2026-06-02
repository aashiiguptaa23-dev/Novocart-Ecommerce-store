export function showSkeletonLoading(count = 8) {
    const container = document.getElementById("products");
    container.innerHTML = "";

    for (let i = 0; i < count; i++) {
        const card = document.createElement("div");
        card.classList.add("product-card", "skeleton-card");
        card.innerHTML = `
            <div class="skeleton skeleton-image"></div>
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-price"></div>
            <div class="skeleton skeleton-btn"></div>
        `;
        container.appendChild(card);
    }
}
