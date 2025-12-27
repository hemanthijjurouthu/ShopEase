const products = [
    { id: 1, name: "Hand Bag", price: 1599, img: "images/bag.png" },
    { id: 2, name: "Leather Belt", price: 499, img: "images/belt.png" },
    { id: 3, name: "Wireless Earbuds", price: 2499, img: "images/earbuds.png" },
    { id: 4, name: "Hoodies", price: 1299, img: "images/huddies.png" },
    { id: 5, name: "Denim Jeans", price: 1799, img: "images/jeans.png" },
    { id: 6, name: "Travel Luggage", price: 3999, img: "images/luggage.png" },
    { id: 7, name: "Smart Phone", price: 14999, img: "images/phones.jpg" },
    { id: 8, name: "Men’s Sandals", price: 899, img: "images/sandals.jpeg" },
    { id: 9, name: "Men's Shirt", price: 799, img: "images/shirt.png" },
    { id: 10, name: "Running Shoes", price: 2499, img: "images/shoes.png" },
    { id: 11, name: "Slippers", price: 599, img: "images/slippers.jpg" },
    { id: 12, name: "Classic Sunglasses", price: 599, img: "images/sun-glasses.png" },
    { id: 13, name: "Bath Towels", price: 699, img: "images/towls.png" },
    { id: 14, name: "Pillow Covers (Set of 2)", price: 799, img: "images/pillows.png" },
    { id: 15, name: "Track Pants", price: 999, img: "images/track.png" },
    { id: 16, name: "Wrist Watch", price: 3499, img: "images/watch.png" }
];


let cart = {};

document.addEventListener("DOMContentLoaded", () => {
    const productsList = document.getElementById("products-list");

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">₹${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        productsList.appendChild(card);
    });
});


function toggleCart() {
    document.getElementById("cart").classList.toggle("show");
}

function addToCart(id) {
    if (!cart[id]) {
        const product = products.find(p => p.id === id);
        cart[id] = { ...product, qty: 1 };
    } else {
        cart[id].qty++;
    }
    updateCart();
}


function updateCart() {
    const cartItemsDiv = document.getElementById("cart-items");
    cartItemsDiv.innerHTML = "";

    let subtotal = 0;
    let totalItems = 0;

    Object.values(cart).forEach(item => {
        subtotal += item.price * item.qty;
        totalItems += item.qty;

        cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}">
                <div>
                    <p><strong>${item.name}</strong></p>
                    <p>₹${item.price}</p>
                </div>

                <div class="quantity-controls">
                    <button onclick="changeQty(${item.id}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="changeQty(${item.id}, 1)">+</button>
                </div>
            </div>
        `;
    });

    const shipping = subtotal > 0 ? 50 : 0;

    document.getElementById("cart-count").textContent = totalItems;
    document.getElementById("subtotal").textContent = `₹${subtotal}`;
    document.getElementById("shipping").textContent = `₹${shipping}`;
    document.getElementById("total").textContent = `₹${subtotal + shipping}`;
}


function changeQty(id, amount) {
    cart[id].qty += amount;

    if (cart[id].qty <= 0) {
        delete cart[id];
    }
    updateCart();
}
