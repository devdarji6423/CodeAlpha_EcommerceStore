// Sample product data (later this will come from backend)
const products = [
    {
        id: 1,
        name: "Smartphone",
        price: 499.99,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format",
        description: "Latest model smartphone with advanced features"
    },
    {
        id: 2,
        name: "Laptop",
        price: 899.99,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format",
        description: "Powerful laptop for work and gaming"
    },
    {
        id: 3,
        name: "Headphones",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format",
        description: "Wireless noise-canceling headphones"
    },
    {
        id: 4,
        name: "Smartwatch",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format",
        description: "Feature-rich smartwatch with health tracking"
    }
];

// Function to display products
function displayProducts() {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productCard = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="price">$${product.price}</p>
                    <button onclick="addToCart(${product.id})" class="add-to-cart-btn">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        productsContainer.innerHTML += productCard;
    });
}

// Function to get product by ID
function getProductById(id) {
    return products.find(product => product.id === id);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartCount();
});