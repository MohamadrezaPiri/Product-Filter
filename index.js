const searchBox = document.querySelector(".search-box");
const productCenter = document.querySelector(".product-center");
const buttons = document.querySelectorAll("button");


let allProductsData = [];
const filters = {
    searchItems: "",
}

document.addEventListener("DOMContentLoaded", () => {
    axios
        .get("http://localhost:3000/items")
        .then(res => {
            allProductsData = res.data;
            renderProducts(allProductsData, filters.searchItems);
        })
        .catch(error => console.log(error));

});

searchBox.addEventListener("input", (e) => {
    filters.searchItems = e.target.value;
    renderProducts(allProductsData, filters.searchItems)
})

function renderProducts(products, _filters) {
    const filteredProducts = products.filter(p => {
        return p.title.toLowerCase().includes(_filters.toLowerCase())
    });
    productCenter.innerHTML = "";
    console.log(filteredProducts);
    //render products to DOM
    filteredProducts.forEach((item, index) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML =
            `<div class="img-container">
                    <img src=${item.image} alt="p-${index}">
                </div>
                <div class="product-des">
                    <p class="product-price">${item.price} $</p>
                    <p class="product-title">${item.title}</p>
                </div> `;
        productCenter.appendChild(productDiv);
    })

}

//filter products by buttons
buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {
         filters.searchItems = e.target.dataset.filter;
        //console.log(filters.searchItems);
        renderProducts(allProductsData , filters.searchItems)
    })
})
