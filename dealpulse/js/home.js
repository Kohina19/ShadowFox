const featuredProductsContainer =
    document.getElementById(
        "featuredProducts"
    );

const featuredProducts =
    [...products]
        .sort(
            (a, b) =>
                b.rating - a.rating
        )
        .slice(0, 6);

featuredProducts.forEach(product => {

    featuredProductsContainer.innerHTML += `

        <div
            class="product-card"
            onclick="
                window.location.href=
                'product.html?id=${product.id}'
            "
        >

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <h3>${product.name}</h3>

            <p class="original-price">
                ₹${product.originalPrice.toLocaleString()}
            </p>

            <p class="price">
                ₹${product.price.toLocaleString()}
            </p>

            <span class="discount-badge">
                ${product.discount}% OFF
            </span>

        </div>

    `;
});