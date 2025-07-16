// Shopping Cart Functionality

// Cart array to hold items
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to update cart count in header (if cart count element exists)
function updateCartCount() {
    const cartCountElem = document.getElementById('cart-count');
    if (cartCountElem) {
        cartCountElem.textContent = cart.length;
    }
}

// Function to add item to cart
function addToCart(name, price, image) {
    // Check if item already in cart
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price: parseFloat(price), image, quantity: 1 });
    }
    saveCart();
    updateCartCount();
    alert(name + " added to cart");
}

// Add event listeners to all add-to-cart buttons
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    const buttons = document.querySelectorAll('.add-to-cart');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = button.getAttribute('data-price');
            const image = button.getAttribute('data-image');
            addToCart(name, price, image);
        });
    });
});
