const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

const cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {

    cartItems.innerHTML = "";

    if(cart.length === 0){

        cartItems.innerHTML = `
        <div class="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some products first.</p>

            <a href="products.html">
                <button class="checkout-btn">
                    Browse Products
                </button>
            </a>
        </div>
        `;

        cartTotal.innerHTML = `
    <p>Subtotal: ₹0</p>
    <p>Products: 0</p>
    <p>Quantity: 0</p>
    <hr>
    <h2>Total: ₹0</h2>
`;

        document.getElementById("checkoutBtn").style.display = "none";
        document.getElementById("cartSummary").style.display = "none";
        return;
    }

    document.getElementById("checkoutBtn").style.display = "inline-block";
    document.getElementById("cartSummary").style.display = "flex";
    let total = 0;
    let itemCount=0;
    const productCount = cart.length;

    cart.forEach(product => {

        total += product.price * product.quantity;
        itemCount += product.quantity;

        cartItems.innerHTML += `
        <div class="cart-card">

            <img
                src="${product.image}"
                alt="${product.name}"
                class="cart-image"
            >

            <div class="cart-info">
                <h3>${product.name}</h3>
                <p>${product.category}</p>
                <p>⭐ ${product.rating}</p>
                <p class="unit-price">
    ₹${product.price.toLocaleString()} each
</p>

<p class="line-total">
    Line Total:
    ₹${(product.price * product.quantity).toLocaleString()}
</p>
<div class="cart-actions">

    <div class="quantity-controls">

        <span class="qty-label">Qty:</span>

        <button
            class="decrease-btn"
            data-id="${product.id}"
            ${product.quantity === 1 ? "disabled" : ""}
        >
            −
        </button>

        <span class="qty-number">
            ${product.quantity}
        </span>

        <button
            class="increase-btn"
            data-id="${product.id}"
        >
            +
        </button>

    </div>

    <button
        class="remove-btn"
        data-id="${product.id}"
    >
        Remove
    </button>

</div>

            

        </div>
        `;
    });

    cartTotal.innerHTML = `
    <p>Subtotal: ₹${total.toLocaleString()}</p>
    <p>Products: ${productCount}</p>
    <p>Quantity: ${itemCount}</p>
    <hr>
    <h2>Total: ₹${total.toLocaleString()}</h2>
`;
}
displayCart();
document.addEventListener("click", (e) => {

    if(e.target.classList.contains("remove-btn")){

        const id = Number(e.target.dataset.id);

        const updatedCart = cart.filter(
            product => product.id !== id
        );

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );

        location.reload();
    }
    if(e.target.classList.contains("increase-btn")){

        const id = Number(e.target.dataset.id);

        cart.forEach(product => {
            if(product.id === id){
                product.quantity++;
            }
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
    }
    if(e.target.classList.contains("decrease-btn")){

        const id = Number(e.target.dataset.id);

        cart.forEach(product => {
            if(product.id === id && product.quantity > 1){
                product.quantity--;
            }
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
    }

});
const clearCartBtn = document.getElementById("clearCartBtn");

if(clearCartBtn){

    clearCartBtn.addEventListener("click", () => {

        localStorage.removeItem("cart");

        location.reload();

    });

}