import { saveTheme, getTheme } from "./storage.js";

export function initTheme() {
    const saved = getTheme();
    applyTheme(saved);

    document.getElementById("themeToggle").addEventListener("click", () => {
        const current = document.documentElement.dataset.theme;
        const next = current === "dark" ? "light" : "dark";
        applyTheme(next);
        saveTheme(next);
    });
}

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    document.getElementById("themeToggle").textContent = theme === "dark" ? "☀️" : "🌙";
}
