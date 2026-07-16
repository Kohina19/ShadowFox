function updateCartCount(){

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    const totalItems =
        cart.reduce(
            (sum,item) =>
                sum + item.quantity,
            0
        );

    const cartLink =
        document.getElementById(
            "cartLink"
        );

    if(cartLink){
        cartLink.textContent =
            `Cart (${totalItems})`;
    }
}

function updateWishlistCount(){

    const wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];

    const wishlistLink =
        document.getElementById(
            "wishlistLink"
        );

    if(wishlistLink){
        wishlistLink.textContent =
            `Wishlist (${wishlist.length})`;
    }
}

updateCartCount();
updateWishlistCount();