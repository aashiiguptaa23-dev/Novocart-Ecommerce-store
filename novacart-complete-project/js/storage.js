const KEYS = {
    cart: "novacart_cart",
    wishlist: "novacart_wishlist",
    user: "novacart_user",
    theme: "novacart_theme"
};

export function saveCart(cart) {
    localStorage.setItem(KEYS.cart, JSON.stringify(cart));
}

export function getCart() {
    return JSON.parse(localStorage.getItem(KEYS.cart)) || [];
}

export function saveWishlist(wishlist) {
    localStorage.setItem(KEYS.wishlist, JSON.stringify(wishlist));
}

export function getWishlist() {
    return JSON.parse(localStorage.getItem(KEYS.wishlist)) || [];
}

export function saveUser(user) {
    localStorage.setItem(KEYS.user, JSON.stringify(user));
}

export function getUser() {
    return JSON.parse(localStorage.getItem(KEYS.user));
}

export function clearUser() {
    localStorage.removeItem(KEYS.user);
}

export function saveTheme(theme) {
    localStorage.setItem(KEYS.theme, theme);
}

export function getTheme() {
    return localStorage.getItem(KEYS.theme) || "light";
}
