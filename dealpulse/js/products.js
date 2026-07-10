const productGrid = document.getElementById("productGrid");

function displayProducts(productList) {
    productGrid.innerHTML = "";

    productList.forEach(product => {
        productGrid.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
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

displayProducts(products);