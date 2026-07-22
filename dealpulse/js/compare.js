const compareContainer =
    document.getElementById("compareContainer");

let compare =
    JSON.parse(
        localStorage.getItem("compare")
    ) || [];
const lowestPrice =
    Math.min(
        ...compare.map(
            product => product.price
        )
    );

const highestRating =
    Math.max(
        ...compare.map(
            product => product.rating
        )
    );

function displayCompare(){

    if(compare.length === 0){
        document.getElementById("compareActions").innerHTML = "";
        compareContainer.innerHTML = `
            <div class="empty-compare">
                <h2>No products selected</h2>
                <p>
                    Add products from the Products page
                    to compare them.
                </p>

                <a href="products.html">
                    <button class="clear-compare-btn">
                        Browse Products
                    </button>
                </a>
            </div>
        `;

        return;
    }
    const compareActions =
    document.getElementById("compareActions");

compareActions.innerHTML = `
    <button
        id="clearCompareBtn"
        class="clear-compare-btn"
    >
        Clear Compare
    </button>
`;

compareContainer.innerHTML = "";
    compareContainer.innerHTML = `
<div class="table-wrapper">
<table class="compare-table">

    <tr>
        <th>Feature</th>
        ${compare.map(product =>
            `<th>${product.name}</th>`
        ).join("")}
    </tr>

    <tr>
        <td>Image</td>
        ${compare.map(product =>
            `
            <td>
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="compare-image"
                >
            </td>
            `
        ).join("")}
    </tr>

    <tr>
        <td>Category</td>
        ${compare.map(product =>
            `<td>${product.category}</td>`
        ).join("")}
    </tr>

    <tr>
        <td>Price</td>
        ${compare.map(product =>
            `<td>
                <p class="compare-original-price">
                    ₹${(product.originalPrice || product.price).toLocaleString()}
                </p>

                <p class="compare-price">
                    ₹${product.price.toLocaleString()}
                </p>

                <span class="compare-discount">
                    ${product.discount || 0}% OFF
                </span>

                ${
                    product.price === lowestPrice
                    ? "<br><br>✅ Best Price"
                    : ""
                }
            </td>`
        ).join("")}
    </tr>

    <tr>
        <td>Rating</td>

        ${compare.map(product =>
            `<td>
                ⭐ ${product.rating}
                ${
                    product.rating === highestRating
                    ? "<br>🏆 Highest Rated"
                    : ""
                }
            </td>`
        ).join("")}
    </tr>

    <tr>
        <td>Action</td>

        ${compare.map(product =>
            `<td>
                <button
                    class="remove-compare-btn"
                    data-id="${product.id}"
                >
                    Remove
                </button>
            </td>`
        ).join("")}
    </tr>

</table>

</div>
`;

    const clearCompareBtn =
        document.getElementById("clearCompareBtn");

    clearCompareBtn.addEventListener("click", () => {

        localStorage.removeItem("compare");

        location.reload();

    });
}

displayCompare();

document.addEventListener("click", (e) => {

    if(
        e.target.classList.contains(
            "remove-compare-btn"
        )
    ){

        const id =
            Number(e.target.dataset.id);

        compare = compare.filter(
            product => product.id !== id
        );

        localStorage.setItem(
    "compare",
    JSON.stringify(compare)
);

displayCompare();
    }

});