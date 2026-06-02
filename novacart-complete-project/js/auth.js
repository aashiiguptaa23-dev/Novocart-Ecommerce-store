import { saveUser, getUser, clearUser } from "./storage.js";
import { showToast } from "./ui.js";

export function initAuth() {
    const authBtn = document.getElementById("authBtn");
    const authModal = document.getElementById("authModal");
    const authForm = document.getElementById("authForm");
    const closeAuth = document.getElementById("closeAuth");

    updateAuthButton();

    authBtn.addEventListener("click", () => {
        const user = getUser();
        if (user) {
            logout();
            return;
        }
        authModal.classList.remove("hidden");
    });

    closeAuth.addEventListener("click", () => {
        authModal.classList.add("hidden");
    });

    authModal.addEventListener("click", (e) => {
        if (e.target.id === "authModal") authModal.classList.add("hidden");
    });

    authForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("authEmail").value.trim();
        const password = document.getElementById("authPassword").value;

        saveUser({ email, password, loggedInAt: Date.now() });
        authModal.classList.add("hidden");
        authForm.reset();
        updateAuthButton();
        showToast(`Welcome, ${email.split("@")[0]}!`);
    });
}

function updateAuthButton() {
    const authBtn = document.getElementById("authBtn");
    const user = getUser();

    if (user) {
        authBtn.textContent = `Logout (${user.email.split("@")[0]})`;
        authBtn.classList.add("logged-in");
    } else {
        authBtn.textContent = "Login";
        authBtn.classList.remove("logged-in");
    }
}

function logout() {
    clearUser();
    updateAuthButton();
    showToast("Logged out successfully");
}
