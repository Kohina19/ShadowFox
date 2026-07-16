const productGrid = document.getElementById("productGrid");
const sortDropdown = document.getElementById("sortDropdown");
const categoryFilters =document.querySelectorAll(".category-filter");
const ratingFilters =
    document.querySelectorAll(
        ".rating-filter"
    );
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
function showToast(message){

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.style.opacity = "1";

    setTimeout(() => {

        toast.style.opacity = "0";

    }, 3500);
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
function displayProducts(productList) {
    const productCount =
    document.getElementById("productCount");

productCount.textContent =
    `Showing ${productList.length} Products`;
    productGrid.innerHTML = "";
    if(productList.length === 0){

    productGrid.innerHTML = `

        <div class="empty-state">

            <h2>🔍 No Products Found</h2>

            <p>
                Try changing your search
                or filters.
            </p>

        </div>

    `;

    return;
}
    const wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];
    productList.forEach(product => {
        productGrid.innerHTML += `
        <div class="product-card">

    <button
        class="wishlist-btn"
        data-id="${product.id}"
    >
        ${
                    wishlist.some(
                        item => item.id === product.id
                    )
                    ? "♥"
                    : "♡"
                }
    </button>
        <img src="${product.image}" alt="${product.name}">
        
        <h3>${product.name}</h3>

${
    product.rating >= 4.5
    ? `<span class="badge">
            ⭐ Best Seller
       </span>`
    : ""
}

<p class="category">${product.category}</p>

        <p class="rating">⭐ ${product.rating}</p>

        <p class="price">₹${product.price}</p>

        <div class="card-buttons">

    <button
        onclick="viewProduct(${product.id})"
    >
        View Details
    </button>


    <button
        class="compare-btn"
        data-id="${product.id}"
    >
        Compare
    </button>

    <button
        class="add-to-cart"
        data-id="${product.id}"
    >
        Add To Cart
    </button>

</div>
    </div>
`;
    });
}
const searchInput = document.getElementById("searchInput");
displayProducts(products);
updateCartCount();
searchInput.addEventListener("input", () => {

    const searchValue = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchValue)
    );

    displayProducts(filteredProducts);

});
function addToCart(productId) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const selectedProduct = products.find(
        product => product.id === productId
    );

    const existingProduct = cart.find(
        item => item.id === productId
    );

    if(existingProduct){
        existingProduct.quantity += 1;
    }
    else{
        cart.push({
            ...selectedProduct,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showToast("Product added to cart!");
}
document.addEventListener("click", (e) => {
    if(e.target.classList.contains("wishlist-btn")){

    const productId =
        Number(e.target.dataset.id);

    addToWishlist(productId);
    }
    if(e.target.classList.contains("add-to-cart")){

        const productId = Number(e.target.dataset.id);

        addToCart(productId);
    }
    if(e.target.classList.contains("compare-btn")){

    const productId =
        Number(e.target.dataset.id);

    addToCompare(productId);
}

});
sortDropdown.addEventListener("change", () => {

    let sortedProducts = [...products];

    if(sortDropdown.value === "low-high"){
        sortedProducts.sort((a,b) => a.price - b.price);
    }

    else if(sortDropdown.value === "high-low"){
        sortedProducts.sort((a,b) => b.price - a.price);
    }

    else if(sortDropdown.value === "rating"){
        sortedProducts.sort((a,b) => b.rating - a.rating);
    }

    displayProducts(sortedProducts);
});
categoryFilters.forEach(checkbox => {

    checkbox.addEventListener("change", () => {

        const selectedCategories = [];

        categoryFilters.forEach(cb => {
            if(cb.checked){
                selectedCategories.push(cb.value);
            }
        });

        if(selectedCategories.length === 0){
            displayProducts(products);
            return;
        }

        const filteredProducts = products.filter(product =>
            selectedCategories.includes(product.category)
        );

        displayProducts(filteredProducts);

    });

});
priceRange.addEventListener("input", () => {

    const maxPrice = Number(priceRange.value);

    priceValue.textContent = `₹0 - ₹${maxPrice}`;

    const filteredProducts = products.filter(product =>
        product.price <= maxPrice
    );

    displayProducts(filteredProducts);

});
ratingFilters.forEach(radio => {

    radio.addEventListener("change", () => {

        const selectedRating =
            Number(radio.value);

        const filteredProducts =
            products.filter(
                product =>
                    product.rating >= selectedRating
            );

        displayProducts(filteredProducts);

    });

});
function addToCompare(productId){

    let compare =
        JSON.parse(
            localStorage.getItem("compare")
        ) || [];

    const selectedProduct =
        products.find(
            product => product.id === productId
        );

    const exists =
        compare.find(
            item => item.id === productId
        );

    if(exists){
        showToast("Already added");
        return;
    }
    if(compare.length >= 4){
    showToast("Maximum 4 products can be compared");
    return;
}
    compare.push(selectedProduct);

    localStorage.setItem(
        "compare",
        JSON.stringify(compare)
    );

    showToast("Added to compare");
}
function viewProduct(id){

    window.location.href =
        `product.html?id=${id}`;

}
function addToWishlist(productId){

    let wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];

    const exists =
        wishlist.find(
            item => item.id === productId
        );

    if(exists){

        wishlist = wishlist.filter(
            item => item.id !== productId
        );

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );
        updateWishlistCount();
        showToast("Removed from Wishlist");
    }
    else{

        const selectedProduct =
            products.find(
                product => product.id === productId
            );

        wishlist.push(selectedProduct);

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );
        updateWishlistCount();
        showToast("Added to Wishlist");
    }

    displayProducts(products);
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
updateWishlistCount();