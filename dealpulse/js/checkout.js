const cart = JSON.parse(localStorage.getItem("cart")) || [];

const orderItems = document.getElementById("orderItems");
const orderTotal = document.getElementById("orderTotal");

let total = 0;

cart.forEach(product => {

    const lineTotal = product.price * product.quantity;
    total += lineTotal;

    orderItems.innerHTML += `
        <div class="order-item">
            <span>
                ${product.name} × ${product.quantity}
            </span>

            <span>
                ₹${lineTotal.toLocaleString()}
            </span>
        </div>
    `;
});

orderTotal.textContent =
    `Total: ₹${total.toLocaleString()}`;

document
.getElementById("checkoutForm")
.addEventListener("submit", (e) => {

    e.preventDefault();

    localStorage.removeItem("cart");

    window.location.href =
        "order-success.html";
});