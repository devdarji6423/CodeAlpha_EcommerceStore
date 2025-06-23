// let cart = []; // Removed to avoid redeclaration error

// Add to cart function
function addToCart(productId) {
    const product = getProductById(productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    updateCartCount();
    showCartNotification();
    saveCartToLocalStorage();
}

// Update cart count in navbar
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Show cart modal
function showCart() {
    const cartModal = document.getElementById('cart-modal');
    const cartItems = document.getElementById('cart-items');
    cartModal.style.display = 'block';

    // Display cart items
    cartItems.innerHTML = '';
    cart.forEach(item => {
        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>$${item.price}</span>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
    });

    updateCartTotal();
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCartCount();
        showCart(); // Refresh cart display
        saveCartToLocalStorage();
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    showCart(); // Refresh cart display
    saveCartToLocalStorage();
}

// Update cart total
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total').textContent = total.toFixed(2);
}

// Save cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Show notification when item is added to cart
function showCartNotification() {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = 'Item added to cart!';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromLocalStorage();

    // Cart icon click
    document.getElementById('cart-icon').addEventListener('click', (e) => {
        e.preventDefault();
        showCart();
    });

    // Close modal
    document.querySelectorAll('.close').forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').style.display = 'none';
        });
    });

    // Checkout button
    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        // Here you'll add checkout logic later
        alert('Proceeding to checkout...');
    });
});
class Cart {
    constructor() {
        this.items = [];
        this.total = 0;
    }

    addItem(product) {
        this.items.push(product);
        this.updateTotal();
        this.updateCartUI();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.updateTotal();
        this.updateCartUI();
    }

    updateTotal() {
        this.total = this.items.reduce((sum, item) => sum + item.price, 0);
    }

    updateCartUI() {
        const cartCount = document.querySelector('.cart-count');
        cartCount.textContent = this.items.length;
        cartCount.style.animation = 'fadeIn 0.3s ease';
    }
}

const cart = new Cart();