const MAX_SUGGESTIONS = 6;

export function getSearchSuggestions(products, query) {
    if (!query.trim()) return [];

    const q = query.toLowerCase();
    return products
        .filter((p) => p.title.toLowerCase().includes(q))
        .slice(0, MAX_SUGGESTIONS);
}

export function renderSearchSuggestions(suggestions, onSelect) {
    const list = document.getElementById("searchSuggestions");

    if (!suggestions.length) {
        list.classList.add("hidden");
        list.innerHTML = "";
        return;
    }

    list.innerHTML = "";
    list.classList.remove("hidden");

    suggestions.forEach((product) => {
        const li = document.createElement("li");
        li.textContent = product.title;
        li.addEventListener("click", () => {
            onSelect(product.title);
            list.classList.add("hidden");
        });
        list.appendChild(li);
    });
}

export function hideSearchSuggestions() {
    const list = document.getElementById("searchSuggestions");
    list.classList.add("hidden");
}
