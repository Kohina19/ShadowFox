const params =
    new URLSearchParams(
        window.location.search
    );

const productId =
    Number(params.get("id"));
const category = params.get("category");

const backBtn = document.getElementById("backBtn");
updateCartCount();
if(backBtn){

    if(category){
        backBtn.href =
            `products.html?category=${category}`;
    }
    else{
        backBtn.href =
            "products.html";
    }

}
const product =
    products.find(
        p => p.id === productId
    );
const productDetails =
    document.getElementById(
        "productDetails"
    );
if(!product){

    productDetails.innerHTML = `
        <h2>Product not found</h2>
    `;

    throw new Error("Product not found");
}

    const relatedProductsContainer =
    document.getElementById(
        "relatedProducts"
    );
    const recentlyViewedContainer =
    document.getElementById(
        "recentlyViewed"
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

<div class="price-section">

    <p class="original-price">
        ₹${product.originalPrice.toLocaleString()}
    </p>

    <p class="product-price">
        ₹${product.price.toLocaleString()}
    </p>

    <span class="discount-badge">
        ${product.discount}% OFF
    </span>

</div>

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
let recentlyViewed =
    JSON.parse(
        localStorage.getItem(
            "recentlyViewed"
        )
    ) || [];

recentlyViewed =
    recentlyViewed.filter(
        item => item.id !== product.id
    );

recentlyViewed.unshift(product);

recentlyViewed =
    recentlyViewed.slice(0,4);

localStorage.setItem(
    "recentlyViewed",
    JSON.stringify(recentlyViewed)
);
const relatedProducts =
    products.filter(
        p =>
            p.category === product.category &&
            p.id !== product.id
    );

relatedProducts.forEach(item => {

    relatedProductsContainer.innerHTML += `
        <div
            class="related-card"
            onclick="viewProduct(${item.id})"
        >

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <h3>${item.name}</h3>

            <p>⭐ ${item.rating}</p>
            <p class="original-price">
    ₹${item.originalPrice.toLocaleString()}
</p>

<p class="related-price">
    ₹${item.price.toLocaleString()}
</p>

<span class="discount-badge">
    ${item.discount}% OFF
</span>
        </div>
    `;
});
const recentProducts =
    JSON.parse(
        localStorage.getItem(
            "recentlyViewed"
        )
    ) || [];

recentProducts
    .filter(
        item => item.id !== product.id
    )
    .forEach(item => {

        recentlyViewedContainer.innerHTML += `

            <div
                class="recently-viewed-card"
                onclick="viewProduct(${item.id})"
            >

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <h3>${item.name}</h3>

                <p>⭐ ${item.rating}</p>

                <p class="original-price">
    ₹${item.originalPrice.toLocaleString()}
</p>

<p class="related-price">
    ₹${item.price.toLocaleString()}
</p>

<span class="discount-badge">
    ${item.discount}% OFF
</span>

            </div>

        `;
    });
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
    updateCartCount();
    showToast("Product added to cart!");
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
    showToast("Added to Compare");

}
function viewProduct(id){

    const params =
        new URLSearchParams(
            window.location.search
        );

    const category =
        params.get("category");

    if(category){

        window.location.href =
            `product.html?id=${id}&category=${category}`;

    }
    else{

        window.location.href =
            `product.html?id=${id}`;

    }

}
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
        document.getElementById("cartLink");

    if(cartLink){
        cartLink.textContent =
            `Cart (${totalItems})`;
    }
}
function showToast(message){

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.style.opacity = "1";

    setTimeout(() => {

        toast.style.opacity = "0";

    }, 3000);
}