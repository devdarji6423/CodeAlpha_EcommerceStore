// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if(!e.target.closest('.nav-menu') && !e.target.closest('.mobile-menu-btn')) {
            navMenu.classList.remove('active');
            if(mobileMenuBtn && mobileMenuBtn.querySelector('i')) {
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            }
        }
    });

    // Sticky Navigation
    const nav = document.querySelector('.main-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            nav.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
            nav.classList.remove('scroll-up');
            nav.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
            nav.classList.remove('scroll-down');
            nav.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Scroll Animation
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Special Offer Countdown Timer
    function startCountdown() {
        const countdownElement = document.getElementById('timer');
        if (!countdownElement) return;

        // Set the countdown date (24 hours from now)
        const countdownDate = new Date().getTime() + (24 * 60 * 60 * 1000);

        const countdown = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `
                <div class="countdown-item">
                    <span>${hours.toString().padStart(2, '0')}</span>
                    <p>Hours</p>
                </div>
                <div class="countdown-item">
                    <span>${minutes.toString().padStart(2, '0')}</span>
                    <p>Minutes</p>
                </div>
                <div class="countdown-item">
                    <span>${seconds.toString().padStart(2, '0')}</span>
                    <p>Seconds</p>
                </div>
            `;

            if (distance < 0) {
                clearInterval(countdown);
                countdownElement.innerHTML = "EXPIRED";
            }
        }, 1000);
    }

    startCountdown();

    // Newsletter Form Validation
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput.value.trim() === '') {
                alert('Please enter your email address');
                return;
            }
            // Add your newsletter subscription logic here
            alert('Thank you for subscribing!');
            newsletterForm.reset();
        });
    }

    // Quick View Modal
    const quickViewButtons = document.querySelectorAll('.btn-quick-view');
    quickViewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            // Add your quick view modal logic here
        });
    });

    // Add to Cart
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                let count = parseInt(cartCount.textContent);
                cartCount.textContent = count + 1;
                
                // Animation for cart icon
                button.classList.add('added');
                setTimeout(() => {
                    button.classList.remove('added');
                }, 1500);
            }
        });
    });

    // Wishlist
    const wishlistButtons = document.querySelectorAll('.btn-wishlist');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            button.classList.toggle('active');
            const icon = button.querySelector('i');
            icon.classList.toggle('fas');
            icon.classList.toggle('far');
        });
    });

    // Search Functionality
    const searchIcon = document.querySelector('.search-icon');
    const searchForm = document.querySelector('.search-form');
    if (searchIcon && searchForm) {
        searchIcon.addEventListener('click', (e) => {
            e.preventDefault();
            searchForm.classList.toggle('active');
        });
    }
});