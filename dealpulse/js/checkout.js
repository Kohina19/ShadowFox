const cart = JSON.parse(localStorage.getItem("cart")) || [];
if(cart.length === 0){

    window.location.href = "cart.html";

}
const orderItems = document.getElementById("orderItems");
const orderTotal = document.getElementById("orderTotal");

let subtotal = 0;
const deliveryCharge = 49;
cart.forEach(product => {

    const lineTotal = product.price * product.quantity;
    subtotal += lineTotal;

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

const subtotalElement =
    document.getElementById("subtotal");

subtotalElement.textContent =
    `Subtotal: ₹${subtotal.toLocaleString()}`;

const finalTotal =
    subtotal + deliveryCharge;

orderTotal.textContent =
    `Total: ₹${finalTotal.toLocaleString()}`;

document
.getElementById("checkoutForm")
.addEventListener("submit", (e) => {

    e.preventDefault();

   

localStorage.removeItem("cart");

window.location.href =
    "order-success.html";
});