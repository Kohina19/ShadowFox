const productGrid = document.getElementById("productGrid");
const sortDropdown = document.getElementById("sortDropdown");
const categoryFilters =document.querySelectorAll(".category-filter");
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
function displayProducts(productList) {
    productGrid.innerHTML = "";
    if(productList.length === 0){

        productGrid.innerHTML = `
            <h2>No products found</h2>
        `;

        return;
    }

    productList.forEach(product => {
        productGrid.innerHTML += `
    <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        
        <h3>${product.name}</h3>

        <p class="category">${product.category}</p>

        <p class="rating">⭐ ${product.rating}</p>

        <p class="price">₹${product.price}</p>

        <div class="card-buttons">
        <button
    class="compare-btn"
    data-id="${product.id}"
>
    Compare
</button>            <button class="add-to-cart" data-id="${product.id}">
    Add To Cart
</button>
        </div>
    </div>
`;
    });
}
const searchInput = document.getElementById("searchInput");
displayProducts(products);
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

    alert("Product added to cart!");
}
document.addEventListener("click", (e) => {

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
        alert("Already added");
        return;
    }
    if(compare.length >= 4){
    alert("Maximum 4 products can be compared");
    return;
}
    compare.push(selectedProduct);

    localStorage.setItem(
        "compare",
        JSON.stringify(compare)
    );

    alert("Added to compare");
}