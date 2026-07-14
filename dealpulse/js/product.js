const params =
    new URLSearchParams(
        window.location.search
    );

const productId =
    Number(params.get("id"));
const product =
    products.find(
        p => p.id === productId
    );
if(!product){

    productDetails.innerHTML = `
        <h2>Product not found</h2>
    `;

    throw new Error("Product not found");
}
const productDetails =
    document.getElementById(
        "productDetails"
    );

productDetails.innerHTML = `
    <div class="product-detail-card">

        <img
            src="${product.image}"
            alt="${product.name}"
        >

        <div class="product-info">

        <h1>${product.name}</h1>

<p>${product.category}</p>

<p>⭐ ${product.rating}</p>

<p class="product-price">
    ₹${product.price.toLocaleString()}
</p>

<p>${product.description}</p>

<p class="stock-status">
    ${
        product.stock > 0
        ? "✅ In Stock"
        : "❌ Out of Stock"
    }
</p>

            <div class="product-actions">
    <button onclick="addToCart(${product.id})">
        Add To Cart
    </button>

    <button onclick="addToCompare(${product.id})">
        Compare Product
    </button>
</div>
        </div>

    </div>
`;
function addToCart(productId){

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    const selectedProduct =
        products.find(
            p => p.id === productId
        );

    const existing =
        cart.find(
            item =>
            item.id === productId
        );

    if(existing){
        existing.quantity++;
    }
    else{
        cart.push({
            ...selectedProduct,
            quantity:1
        });
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert(`${selectedProduct.name} added to cart`);
}
function addToCompare(productId){

    let compare =
        JSON.parse(
            localStorage.getItem("compare")
        ) || [];

    const selectedProduct =
        products.find(
            p => p.id === productId
        );

    const exists =
        compare.find(
            item =>
            item.id === productId
        );

    if(!exists){
        compare.push(selectedProduct);
    }

    localStorage.setItem(
        "compare",
        JSON.stringify(compare)
    );

    alert("Added to Compare");
}