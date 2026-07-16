const wishlistContainer =
    document.getElementById("wishlistContainer");

let wishlist =
    JSON.parse(
        localStorage.getItem("wishlist")
    ) || [];

displayWishlist();

function displayWishlist(){

    if(wishlist.length === 0){

        wishlistContainer.innerHTML = `
            <div class="empty-wishlist">
                <h2>Your Wishlist is Empty</h2>

                <p>
                    Add products from the
                    Products page.
                </p>

                <a href="products.html">
                    <button>
                        Browse Products
                    </button>
                </a>
            </div>
        `;

        return;
    }

    wishlistContainer.innerHTML =
        `<div class="wishlist-grid"></div>`;

    const wishlistGrid =
        document.querySelector(".wishlist-grid");

    wishlist.forEach(product => {

        wishlistGrid.innerHTML += `
            <div class="wishlist-card">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <h3>${product.name}</h3>

                <p>${product.category}</p>

                <p>
                    ⭐ ${product.rating}
                </p>
                <p class="original-price">
    ₹${product.originalPrice.toLocaleString()}
</p>

<p class="wishlist-price">
    ₹${product.price.toLocaleString()}
</p>

<span class="discount-badge">
    ${product.discount}% OFF
</span>

                <div class="wishlist-actions">

                    <button
                        class="move-to-cart-btn"
                        data-id="${product.id}"
                    >
                        Move To Cart
                    </button>

                    <button
                        class="remove-wishlist-btn"
                        data-id="${product.id}"
                    >
                        Remove
                    </button>

                </div>

            </div>
        `;
    });
}

document.addEventListener("click",(e)=>{

    if(
        e.target.classList.contains(
            "remove-wishlist-btn"
        )
    ){

        const id =
            Number(e.target.dataset.id);

        wishlist =
            wishlist.filter(
                product =>
                product.id !== id
            );

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        location.reload();
    }

    if(
        e.target.classList.contains(
            "move-to-cart-btn"
        )
    ){

        const id =
            Number(e.target.dataset.id);

        let cart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];

        const product =
            wishlist.find(
                p => p.id === id
            );

        const existing =
            cart.find(
                item => item.id === id
            );

        if(existing){
            existing.quantity++;
        }
        else{
            cart.push({
                ...product,
                quantity:1
            });
        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        wishlist =
            wishlist.filter(
                p => p.id !== id
            );

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        location.reload();
    }
});