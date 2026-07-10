const productGrid = document.getElementById("productGrid");
const sortDropdown = document.getElementById("sortDropdown");
const categoryFilters =document.querySelectorAll(".category-filter");
function displayProducts(productList) {
    productGrid.innerHTML = "";

    productList.forEach(product => {
        productGrid.innerHTML += `
    <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        
        <h3>${product.name}</h3>

        <p class="category">${product.category}</p>

        <p class="rating">⭐ ${product.rating}</p>

        <p class="price">₹${product.price}</p>

        <div class="card-buttons">
            <button>Compare</button>
            <button>Add To Cart</button>
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