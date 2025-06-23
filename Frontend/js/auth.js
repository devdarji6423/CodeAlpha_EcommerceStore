// auth.js

const API_URL = 'http://localhost:5000/api';
let currentUser = null;

// Initialize event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get the login button and add click event listener
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showLoginModal();
        });
    }

    // Close buttons for modals
    document.querySelectorAll('.close').forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById('login-modal').style.display = 'none';
            document.getElementById('register-modal').style.display = 'none';
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
        fetchUserData(token);
    }
});

// Show login modal
function showLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Show register modal
function showRegisterModal() {
    document.getElementById('login-modal').style.display = 'none';
    document.getElementById('register-modal').style.display = 'block';
}

// Handle Registration
async function handleRegistration(event) {
    event.preventDefault();
    const name = document.querySelector('#register-form input[name="name"]').value;
    const email = document.querySelector('#register-form input[name="email"]').value;
    const password = document.querySelector('#register-form input[name="password"]').value;

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            currentUser = { name, email };
            updateLoginStatus();
            document.getElementById('register-modal').style.display = 'none';
            alert('Registration successful!');
        } else {
            alert(data.msg || 'Registration failed');
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed');
    }
}

// Handle Login
async function handleLogin(event) {
    event.preventDefault();
    const email = document.querySelector('#login-form input[name="email"]').value;
    const password = document.querySelector('#login-form input[name="password"]').value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            await fetchUserData(data.token);
            document.getElementById('login-modal').style.display = 'none';
            alert('Login successful!');
        } else {
            alert(data.msg || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed');
    }
}

// Fetch user data
async function fetchUserData(token) {
    try {
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
                'x-auth-token': token
            }
        });
        
        if (response.ok) {
            const userData = await response.json();
            currentUser = userData;
            updateLoginStatus();
        } else {
            localStorage.removeItem('token');
            currentUser = null;
            updateLoginStatus();
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token');
        currentUser = null;
        updateLoginStatus();
    }
}

// Update login status
function updateLoginStatus() {
    const loginBtn = document.getElementById('login-btn');
    if (currentUser) {
        loginBtn.textContent = `Hello, ${currentUser.name || currentUser.email}`;
        loginBtn.onclick = handleLogout;
    } else {
        loginBtn.textContent = 'Login';
        loginBtn.onclick = showLoginModal;
    }
}

// Handle Logout
function handleLogout() {
    localStorage.removeItem('token');
    currentUser = null;
    updateLoginStatus();
    alert('Logged out successfully');
}
// Form validation
const validateForm = (formData) => {
    const errors = {};
    
    if (!formData.email || !formData.email.includes('@')) {
        errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password || formData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
    }
    
    return errors;
};

// Show error messages
const showError = (message) => {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.animation = 'fadeIn 0.3s ease';
    return errorDiv;
};