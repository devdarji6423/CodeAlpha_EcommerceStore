// Main JavaScript (main.js)

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeAnimations();
    initializeBackToTop();
    initializeCountdown();
    initializeProductQuickView();
    initializeNewsletterForm();
    
    // Remove loading spinner
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 500);
    }
});

// Navigation functionality
function initializeNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');
    const searchBtn = document.querySelector('.search-btn');
    const cartBtn = document.querySelector('.cart-btn');
    const closeCartBtn = document.querySelector('.close-cart');
    const cartSidebar = document.querySelector('.cart-sidebar');
    
    // Mobile menu toggle
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Dropdown menus
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (window.innerWidth < 992) { // Mobile view
            link.addEventListener('click', (e) => {
                e.preventDefault();
                dropdown.classList.toggle('active');
                menu.style.display = dropdown.classList.contains('active') ? 'block' : 'none';
            });
        }
    });

    // Cart sidebar
    if (cartBtn && cartSidebar && closeCartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            cartSidebar.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeCartBtn.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close cart when clicking outside
        document.addEventListener('click', (e) => {
            if (cartSidebar.classList.contains('active') && 
                !cartSidebar.contains(e.target) && 
                !cartBtn.contains(e.target)) {
                cartSidebar.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Sticky navigation
    let lastScroll = 0;
    const mainNav = document.querySelector('.main-nav');
    
    if (mainNav) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                mainNav.classList.remove('scroll-up');
                return;
            }
            
            if (currentScroll > lastScroll && !mainNav.classList.contains('scroll-down')) {
                mainNav.classList.remove('scroll-up');
                mainNav.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && mainNav.classList.contains('scroll-down')) {
                mainNav.classList.remove('scroll-down');
                mainNav.classList.add('scroll-up');
            }
            
            lastScroll = currentScroll;
        });
    }
}

// Animation initialization
function initializeAnimations() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Custom animations for hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.querySelectorAll('*').forEach((element, index) => {
            element.style.animationDelay = `${index * 0.1}s`;
            element.classList.add('animate-fade-up');
        });
    }
}

// Back to top functionality
function initializeBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });

        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Countdown timer
function initializeCountdown() {
    const countdown = document.getElementById('countdown');
    if (!countdown) return;

    // Set the date we're counting down to (24 hours from now)
    const countDownDate = new Date().getTime() + (24 * 60 * 60 * 1000);

    // Update the countdown every 1 second
    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update HTML
        document.getElementById('days').innerHTML = String(days).padStart(2, '0');
        document.getElementById('hours').innerHTML = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerHTML = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerHTML = String(seconds).padStart(2, '0');

        // If countdown is finished
        if (distance < 0) {
            clearInterval(x);
            countdown.innerHTML = "EXPIRED";
        }
    }, 1000);
}
// Product Quick View functionality
function initializeProductQuickView() {
    const quickViewBtns = document.querySelectorAll('.btn-quick-view');
    const quickViewModal = document.getElementById('quickViewModal');
    
    if (!quickViewModal) return;

    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = btn.closest('.product-card');
            if (productCard) {
                const productData = {
                    image: productCard.querySelector('.product-image img').src,
                    title: productCard.querySelector('.product-info h4').textContent,
                    price: productCard.querySelector('.new-price').textContent,
                    oldPrice: productCard.querySelector('.old-price')?.textContent || '',
                    rating: productCard.querySelector('.rating').innerHTML
                };
                updateQuickViewModal(productData);
            }
        });
    });

    // Handle quantity buttons in quick view
    const quantitySelectors = document.querySelectorAll('.quantity-selector');
    quantitySelectors.forEach(selector => {
        const input = selector.querySelector('input');
        const minusBtn = selector.querySelector('.minus');
        const plusBtn = selector.querySelector('.plus');

        minusBtn.addEventListener('click', () => {
            const currentValue = parseInt(input.value);
            if (currentValue > 1) {
                input.value = currentValue - 1;
            }
        });

        plusBtn.addEventListener('click', () => {
            const currentValue = parseInt(input.value);
            input.value = currentValue + 1;
        });
    });
}

function updateQuickViewModal(productData) {
    const modal = document.getElementById('quickViewModal');
    if (!modal) return;

    modal.querySelector('.product-quick-view-image img').src = productData.image;
    modal.querySelector('.product-title').textContent = productData.title;
    modal.querySelector('.new-price').textContent = productData.price;
    
    const oldPriceElement = modal.querySelector('.old-price');
    if (oldPriceElement && productData.oldPrice) {
        oldPriceElement.textContent = productData.oldPrice;
        oldPriceElement.style.display = 'inline-block';
    } else if (oldPriceElement) {
        oldPriceElement.style.display = 'none';
    }

    modal.querySelector('.rating').innerHTML = productData.rating;
}

// Cart Management System
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.total = 0;
        this.cartCount = 0;
        this.init();
    }

    init() {
        this.updateCartCount();
        this.renderCartItems();
        this.bindEvents();
    }

    bindEvents() {
        // Add to cart buttons
        document.querySelectorAll('.btn-add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productCard = btn.closest('.product-card');
                if (productCard) {
                    const product = {
                        id: productCard.dataset.productId || Date.now(),
                        image: productCard.querySelector('.product-image img').src,
                        title: productCard.querySelector('.product-info h4').textContent,
                        price: parseFloat(productCard.querySelector('.new-price').textContent.replace('$', '')),
                        quantity: 1
                    };
                    this.addItem(product);
                }
            });
        });
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push(product);
        }

        this.updateCart();
        this.showNotification('Product added to cart');
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.updateCart();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = parseInt(quantity);
            if (item.quantity <= 0) {
                this.removeItem(productId);
            }
        }
        this.updateCart();
    }

    updateCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCartCount();
        this.renderCartItems();
        this.calculateTotal();
    }

    updateCartCount() {
        this.cartCount = this.items.reduce((total, item) => total + item.quantity, 0);
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = this.cartCount;
        }
    }

    calculateTotal() {
        this.total = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        const totalElement = document.querySelector('.total-amount');
        if (totalElement) {
            totalElement.textContent = `$${this.total.toFixed(2)}`;
        }
    }

    renderCartItems() {
        const cartItems = document.querySelector('.cart-items');
        if (!cartItems) return;

        if (this.items.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
            return;
        }

        cartItems.innerHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart-item-info">
                    <h4>${item.title}</h4>
                    <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn minus">-</button>
                        <input type="number" value="${item.quantity}" min="1">
                        <button class="qty-btn plus">+</button>
                    </div>
                </div>
                <button class="cart-item-remove">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');

        // Bind events to cart items
        this.bindCartItemEvents();
    }

    bindCartItemEvents() {
        const cartItems = document.querySelector('.cart-items');
        if (!cartItems) return;

        // Handle quantity changes
        cartItems.querySelectorAll('.cart-item').forEach(item => {
            const productId = item.dataset.id;
            const input = item.querySelector('input');
            const minusBtn = item.querySelector('.minus');
            const plusBtn = item.querySelector('.plus');
            const removeBtn = item.querySelector('.cart-item-remove');

            minusBtn.addEventListener('click', () => {
                const currentValue = parseInt(input.value);
                if (currentValue > 1) {
                    this.updateQuantity(productId, currentValue - 1);
                }
            });

            plusBtn.addEventListener('click', () => {
                const currentValue = parseInt(input.value);
                this.updateQuantity(productId, currentValue + 1);
            });

            input.addEventListener('change', (e) => {
                this.updateQuantity(productId, e.target.value);
            });

            removeBtn.addEventListener('click', () => {
                this.removeItem(productId);
            });
        });
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}
// Form Validation and Newsletter Subscription
function initializeNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitBtn = newsletterForm.querySelector('button');
        
        if (!validateEmail(emailInput.value)) {
            showFormError(emailInput, 'Please enter a valid email address');
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showFormSuccess(newsletterForm, 'Thank you for subscribing!');
            emailInput.value = '';
        } catch (error) {
            showFormError(emailInput, 'Something went wrong. Please try again.');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
}

// Product Filtering and Sorting
class ProductManager {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.currentSort = 'default';
        this.currentFilters = {
            category: 'all',
            priceRange: 'all',
            rating: 'all'
        };
        this.init();
    }

    init() {
        this.loadProducts();
        this.bindFilterEvents();
        this.bindSortEvents();
    }

    async loadProducts() {
        const productContainer = document.querySelector('.product-grid');
        if (!productContainer) return;

        // Get all product cards
        const productCards = productContainer.querySelectorAll('.product-card');
        this.products = Array.from(productCards).map(card => ({
            element: card,
            id: card.dataset.productId,
            price: parseFloat(card.querySelector('.new-price').textContent.replace('$', '')),
            rating: parseFloat(card.querySelector('.rating span').textContent.replace('(', '').replace(')', '')),
            category: card.dataset.category
        }));

        this.filteredProducts = [...this.products];
        this.renderProducts();
    }

    bindFilterEvents() {
        // Category filter
        const categoryFilters = document.querySelectorAll('.category-filter');
        categoryFilters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                e.preventDefault();
                this.currentFilters.category = filter.dataset.category;
                this.applyFilters();
                this.updateActiveFilters();
            });
        });

        // Price range filter
        const priceFilters = document.querySelectorAll('.price-filter');
        priceFilters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                e.preventDefault();
                this.currentFilters.priceRange = filter.dataset.range;
                this.applyFilters();
                this.updateActiveFilters();
            });
        });

        // Rating filter
        const ratingFilters = document.querySelectorAll('.rating-filter');
        ratingFilters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                e.preventDefault();
                this.currentFilters.rating = filter.dataset.rating;
                this.applyFilters();
                this.updateActiveFilters();
            });
        });
    }

    bindSortEvents() {
        const sortSelect = document.querySelector('.sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.sortProducts();
                this.renderProducts();
            });
        }
    }

    applyFilters() {
        this.filteredProducts = this.products.filter(product => {
            let passCategory = this.currentFilters.category === 'all' || 
                             product.category === this.currentFilters.category;
            
            let passPrice = true;
            if (this.currentFilters.priceRange !== 'all') {
                const [min, max] = this.currentFilters.priceRange.split('-').map(Number);
                passPrice = product.price >= min && (!max || product.price <= max);
            }

            let passRating = this.currentFilters.rating === 'all' || 
                           product.rating >= parseFloat(this.currentFilters.rating);

            return passCategory && passPrice && passRating;
        });

        this.sortProducts();
        this.renderProducts();
    }

    sortProducts() {
        switch (this.currentSort) {
            case 'price-low-high':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high-low':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                this.filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            default:
                // Reset to original order
                this.filteredProducts.sort((a, b) => 
                    this.products.indexOf(a) - this.products.indexOf(b)
                );
        }
    }

    renderProducts() {
        const productContainer = document.querySelector('.product-grid');
        if (!productContainer) return;

        // Hide all products
        this.products.forEach(product => {
            product.element.style.display = 'none';
        });

        // Show filtered products with animation
        this.filteredProducts.forEach((product, index) => {
            setTimeout(() => {
                product.element.style.display = 'block';
                product.element.style.opacity = '0';
                product.element.style.transform = 'translateY(20px)';
                
                requestAnimationFrame(() => {
                    product.element.style.opacity = '1';
                    product.element.style.transform = 'translateY(0)';
                });
            }, index * 100);
        });

        // Update products count
        const countElement = document.querySelector('.products-count');
        if (countElement) {
            countElement.textContent = `${this.filteredProducts.length} Products`;
        }
    }

    updateActiveFilters() {
        // Update active state of filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if ((btn.dataset.category && btn.dataset.category === this.currentFilters.category) ||
                (btn.dataset.range && btn.dataset.range === this.currentFilters.priceRange) ||
                (btn.dataset.rating && btn.dataset.rating === this.currentFilters.rating)) {
                btn.classList.add('active');
            }
        });
    }
}

// Image Lazy Loading
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });

    images.forEach(img => imageObserver.observe(img));
}

// Utility Functions
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showFormError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.textContent = message;
    
    const parent = input.parentElement;
    const existing = parent.querySelector('.form-error');
    if (existing) existing.remove();
    
    parent.appendChild(errorDiv);
    input.classList.add('error');

    setTimeout(() => {
        errorDiv.remove();
        input.classList.remove('error');
    }, 3000);
}

function showFormSuccess(form, message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.textContent = message;
    
    form.appendChild(successDiv);

    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}
// Search Functionality
class SearchManager {
    constructor() {
        this.searchModal = document.getElementById('searchModal');
        this.searchInput = this.searchModal?.querySelector('input[type="text"]');
        this.searchResults = document.createElement('div');
        this.searchResults.className = 'search-results';
        this.searchTimeout = null;
        this.init();
    }

    init() {
        if (!this.searchModal || !this.searchInput) return;

        this.searchModal.querySelector('.modal-body').appendChild(this.searchResults);
        this.bindEvents();
    }

    bindEvents() {
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                this.performSearch(e.target.value);
            }, 300);
        });

        // Clear search when modal closes
        this.searchModal.addEventListener('hidden.bs.modal', () => {
            this.searchInput.value = '';
            this.searchResults.innerHTML = '';
        });
    }

    async performSearch(query) {
        if (query.length < 2) {
            this.searchResults.innerHTML = '';
            return;
        }

        this.searchResults.innerHTML = '<div class="searching">Searching...</div>';

        try {
            // Simulate API call with existing products
            const products = Array.from(document.querySelectorAll('.product-card')).map(card => ({
                id: card.dataset.productId,
                title: card.querySelector('h4').textContent,
                price: card.querySelector('.new-price').textContent,
                image: card.querySelector('img').src
            }));

            // Filter products based on query
            const results = products.filter(product => 
                product.title.toLowerCase().includes(query.toLowerCase())
            );

            this.displayResults(results);
        } catch (error) {
            this.searchResults.innerHTML = '<div class="error">An error occurred while searching</div>';
        }
    }

    displayResults(results) {
        if (results.length === 0) {
            this.searchResults.innerHTML = '<div class="no-results">No products found</div>';
            return;
        }

        this.searchResults.innerHTML = results.map(product => `
            <div class="search-result-item">
                <img src="${product.image}" alt="${product.title}">
                <div class="search-result-info">
                    <h4>${product.title}</h4>
                    <span class="price">${product.price}</span>
                </div>
                <a href="#" class="btn btn-primary btn-sm">View</a>
            </div>
        `).join('');
    }
}

// Wishlist Management
class WishlistManager {
    constructor() {
        this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        this.init();
    }

    init() {
        this.updateWishlistCount();
        this.bindEvents();
    }

    bindEvents() {
        document.querySelectorAll('.btn-wishlist').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productCard = btn.closest('.product-card');
                if (productCard) {
                    const productId = productCard.dataset.productId;
                    this.toggleWishlistItem(productId);
                    this.updateWishlistButton(btn, productId);
                }
            });
        });
    }

    toggleWishlistItem(productId) {
        const index = this.wishlist.indexOf(productId);
        if (index === -1) {
            this.wishlist.push(productId);
            this.showNotification('Product added to wishlist');
        } else {
            this.wishlist.splice(index, 1);
            this.showNotification('Product removed from wishlist');
        }
        
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
        this.updateWishlistCount();
    }

    updateWishlistButton(btn, productId) {
        const isInWishlist = this.wishlist.includes(productId);
        btn.classList.toggle('active', isInWishlist);
        btn.querySelector('i').className = isInWishlist ? 'fas fa-heart' : 'far fa-heart';
    }

    updateWishlistCount() {
        const count = document.querySelector('.wishlist-count');
        if (count) {
            count.textContent = this.wishlist.length;
        }
    }

    showNotification(message) {
        // Reuse notification function from cart manager
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

// Recently Viewed Products
class RecentlyViewedManager {
    constructor() {
        this.maxItems = 4;
        this.recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderRecentlyViewed();
    }

    bindEvents() {
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', () => {
                const productId = card.dataset.productId;
                this.addProduct({
                    id: productId,
                    title: card.querySelector('h4').textContent,
                    price: card.querySelector('.new-price').textContent,
                    image: card.querySelector('img').src
                });
            });
        });
    }

    addProduct(product) {
        // Remove if already exists
        this.recentlyViewed = this.recentlyViewed.filter(p => p.id !== product.id);
        
        // Add to beginning of array
        this.recentlyViewed.unshift(product);
        
        // Keep only max items
        if (this.recentlyViewed.length > this.maxItems) {
            this.recentlyViewed.pop();
        }

        localStorage.setItem('recentlyViewed', JSON.stringify(this.recentlyViewed));
        this.renderRecentlyViewed();
    }

    renderRecentlyViewed() {
        const container = document.querySelector('.recently-viewed-products');
        if (!container || this.recentlyViewed.length === 0) return;

        container.innerHTML = this.recentlyViewed.map(product => `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h4>${product.title}</h4>
                    <div class="price">
                        <span class="new-price">${product.price}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Browser Notifications
class NotificationManager {
    constructor() {
        this.supported = 'Notification' in window;
        this.init();
    }

    init() {
        if (!this.supported) return;

        // Request permission on first visit
        if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
            this.requestPermission();
        }
    }

    async requestPermission() {
        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                this.showWelcomeNotification();
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error);
        }
    }

    showWelcomeNotification() {
        new Notification('Welcome to Our Store!', {
            body: 'Thank you for enabling notifications. We\'ll keep you updated with the latest offers.',
            icon: '/path/to/icon.png'
        });
    }

    showNotification(title, options = {}) {
        if (!this.supported || Notification.permission !== 'granted') return;

        new Notification(title, {
            icon: '/path/to/icon.png',
            ...options
        });
    }
}

// Initialize all managers
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main components
    const cart = new ShoppingCart();
    const productManager = new ProductManager();
    const searchManager = new SearchManager();
    const wishlistManager = new WishlistManager();
    const recentlyViewed = new RecentlyViewedManager();
    const notificationManager = new NotificationManager();

    // Initialize lazy loading
    initializeLazyLoading();

    // Add to window for debugging
    window.ecommerceManagers = {
        cart,
        productManager,
        searchManager,
        wishlistManager,
        recentlyViewed,
        notificationManager
    };
});

// Handle page visibility for notifications
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Update cart and notifications when page becomes visible
        const cart = window.ecommerceManagers?.cart;
        if (cart) {
            cart.updateCart();
        }
    }
});