// ========================================
// LUMIÈRE BEAUTY - COMPLETE STORE SCRIPT
// ========================================

// 1. PRODUCTS
const products = [
    {
        id: 1,
        name: "Radiance Face Serum",
        category: "Skincare",
        price: 29,
        description: "A luxurious face serum designed to hydrate your skin and enhance your natural glow.",
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600"
    },
    {
        id: 2,
        name: "Luxury Moisturizer",
        category: "Skincare",
        price: 35,
        description: "A rich and gentle moisturizer that nourishes your skin and keeps it soft and hydrated.",
        image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600"
    },
    {
        id: 3,
        name: "Rose Glow Collection",
        category: "Beauty",
        price: 42,
        description: "A beautiful rose-inspired beauty collection created to add a soft and radiant touch to your everyday look.",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600"
    },
    {
        id: 4,
        name: "Daily Skin Cleanser",
        category: "Skincare",
        price: 22,
        description: "A gentle daily cleanser that removes impurities and leaves your skin feeling fresh and clean.",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600"
    },
    {
        id: 5,
        name: "Soft Pink Lipstick",
        category: "Makeup",
        price: 18,
        description: "A soft pink lipstick that adds an elegant touch of color and beauty to your lips.",
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600"
    },
    {
        id: 6,
        name: "Beauty Essentials",
        category: "Makeup",
        price: 31,
        description: "A collection of everyday makeup essentials designed to help you create your favorite beauty looks.",
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600"
    }
];

// 2. STORE VARIABLES
let cart = [];
let selectedCategory = "All";

const productsContainer = document.getElementById("products");
const cartCount = document.getElementById("cartCount");
const cartButton = document.getElementById("cartButton");
const searchInput = document.getElementById("searchInput");

// 3. CREATE CART PANEL
const cartOverlay = document.createElement("div");
cartOverlay.className = "cart-overlay";

const cartPanel = document.createElement("div");
cartPanel.className = "cart-panel";

document.body.appendChild(cartOverlay);
document.body.appendChild(cartPanel);

// 4. DISPLAY PRODUCTS
function displayProducts() {

    const searchTerm = searchInput.value.trim().toLowerCase();

    const filteredProducts = products.filter(product => {

        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm);

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = `
            <p class="cart-empty">
                No products found. Try another search.
            </p>
        `;
        return;
    }

    productsContainer.innerHTML = filteredProducts.map(product => `
        <article class="product-card">

            <img src="${product.image}" alt="${product.name}"
     onclick="showProductDetails(${product.id})"
     style="cursor:pointer;">

            <div class="product-info">

                <p>${product.category}</p>

                <h3 onclick="showProductDetails(${product.id})"
    style="cursor:pointer;">
    ${product.name}
</h3>

                <p>$${product.price.toFixed(2)}</p>

                <button onclick="addToCart(${product.id})">
                    ADD TO BAG
                </button>

            </div>
        </article>
    `).join("");
}

// 5. ADD TO CART
function addToCart(id) {

    const product = products.find(item => item.id === id);

    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    alert(product.name + " added to your bag!");
}

// 6. UPDATE CART COUNTER
function updateCart() {

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalItems;
}

// 7. OPEN CART
function showCart() {

    cartPanel.classList.add("active");
    cartOverlay.classList.add("active");

    renderCart();
}

// 8. CLOSE CART
function closeCart() {

    cartPanel.classList.remove("active");
    cartOverlay.classList.remove("active");
}

// 9. DISPLAY CART CONTENTS
function renderCart() {

    let total = 0;

    let cartHTML = `
        <div class="cart-header">
            <h2>Your Shopping Bag</h2>

            <button class="close-cart" onclick="closeCart()">
                ×
            </button>
        </div>
    `;

    if (cart.length === 0) {

        cartHTML += `
            <p class="cart-empty">
                Your bag is empty.
            </p>
        `;

    }

    cart.forEach(item => {

        total += item.price * item.quantity;

        cartHTML += `
            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div class="cart-item-info">

                    <h3>${item.name}</h3>

                    <p>$${item.price.toFixed(2)}</p>

                    <div class="quantity-controls">

                        <button onclick="changeQuantity(${item.id}, -1)">
                            −
                        </button>

                        <span>${item.quantity}</span>

                        <button onclick="changeQuantity(${item.id}, 1)">
                            +
                        </button>

                    </div>

                    <button class="remove-item"
                        onclick="removeFromCart(${item.id})">
                        REMOVE
                    </button>

                </div>
            </div>
        `;
    });

    cartHTML += `
        <div class="cart-total">
            <strong>Subtotal</strong>
            <strong>$${total.toFixed(2)}</strong>
        </div>

        ${cart.length > 0 ? `
            <button class="checkout-button"
                onclick="checkoutWhatsApp()">
                CHECKOUT VIA WHATSAPP
            </button>
        ` : ""}
    `;

    cartPanel.innerHTML = cartHTML;
}

// 10. CHANGE QUANTITY
function changeQuantity(id, amount) {

    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeFromCart(id);
        return;
    }

    updateCart();
    renderCart();
}

// 11. REMOVE PRODUCT
function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    updateCart();
    renderCart();
}

// 12. WHATSAPP CHECKOUT
function checkoutWhatsApp() {

    if (cart.length === 0) {
        alert("Your shopping bag is empty!");
        return;
    }

    let message =
        "Hello LUMIÈRE BEAUTY! I would like to place an order:\n\n";

    let total = 0;

    cart.forEach(item => {

        message +=
            `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;

        total += item.price * item.quantity;
    });

    message += `\nTOTAL: $${total.toFixed(2)}`;
    message += "\n\nPlease contact me to confirm my order.";

    const phoneNumber = "21629232988";

    const whatsappURL =
        "https://wa.me/" +
        phoneNumber +
        "?text=" +
        encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
}

// 13. SEARCH
searchInput.addEventListener("input", displayProducts);

// 14. CATEGORY FILTER
document.querySelectorAll(".category-btn").forEach(button => {

    button.addEventListener("click", () => {

        selectedCategory = button.dataset.category;

        document.querySelectorAll(".category-btn").forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        displayProducts();
    });
});

// 15. CART EVENTS
cartButton.addEventListener("click", showCart);

cartOverlay.addEventListener("click", closeCart);

// 16. START STORE
displayProducts();
updateCart();
// PRODUCT DETAILS

const productModal = document.getElementById("productModal");

const closeProductModal = document.getElementById("closeProductModal");

let selectedProductId = null;

function showProductDetails(id) {

    const product = products.find(item => item.id === id);

    if (!product) return;

    selectedProductId = id;

    document.getElementById("modalProductImage").src = product.image;

    document.getElementById("modalProductName").textContent = product.name;

    document.getElementById("modalProductCategory").textContent = product.category;

    document.getElementById("modalProductDescription").textContent = product.description;

    document.getElementById("modalProductPrice").textContent =
        "$" + product.price.toFixed(2);

    productModal.classList.add("active");
}

// CLOSE PRODUCT DETAILS

function hideProductDetails() {
    productModal.classList.remove("active");
}

closeProductModal.addEventListener("click", hideProductDetails);

productModal.addEventListener("click", function(event) {
    if (event.target === productModal) {
        hideProductDetails();
    }
});

// ADD PRODUCT FROM DETAILS

document.getElementById("modalAddToCart").addEventListener("click", function() {

    if (selectedProductId !== null) {
        addToCart(selectedProductId);
        hideProductDetails();
    }

});