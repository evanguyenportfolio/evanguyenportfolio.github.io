// Dreamy Cloud Portfolio - Main JavaScript

// ==================== UTILITY FUNCTIONS ====================

// Create twinkling stars
function createStars() {
    const starsBg = document.getElementById('starsBg');
    if (!starsBg) return;
    
    starsBg.innerHTML = '';
    
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const size = Math.random() * 3 + 1;
        if (size < 1.5) star.classList.add('star-small');
        else if (size < 2.5) star.classList.add('star-medium');
        else star.classList.add('star-large');
        
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 3;
        
        star.style.left = `${left}%`;
        star.style.top = `${top}%`;
        star.style.animationDelay = `${delay}s`;
        
        starsBg.appendChild(star);
    }
}

// Create floating particles
function createParticles() {
    const cloudBg = document.querySelector('.cloud-bg');
    if (!cloudBg) return;
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.classList.add('cloud');
        
        const width = Math.random() * 100 + 50;
        const height = width * 0.3;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 40 + 20;
        const delay = Math.random() * 10;
        
        const colors = [
            'linear-gradient(135deg, var(--pink-dream), var(--pink-light))',
            'linear-gradient(135deg, var(--purple-dream), var(--purple-light))',
            'linear-gradient(135deg, var(--blue-dream), var(--blue-light))'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.width = `${width}px`;
        particle.style.height = `${height}px`;
        particle.style.left = `${left}%`;
        particle.style.top = `${top}%`;
        particle.style.background = randomColor;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.opacity = Math.random() * 0.3 + 0.2;
        
        cloudBg.appendChild(particle);
    }
}

// Update active navigation based on current page
function updateActiveNav() {
    const pathArray = window.location.pathname.split('/');
    let currentPage = pathArray[pathArray.length - 1];
    
    if (currentPage === '' || currentPage === '/') {
        currentPage = 'index.html';
    }
    
    currentPage = currentPage.replace('.html', '');
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    navButtons.forEach(button => {
        const buttonHref = button.getAttribute('href');
        const buttonPage = buttonHref.replace('.html', '');
        
        if (buttonPage === currentPage) {
            button.classList.add('active');
        }
    });
}

// ==================== ANIMATION FUNCTIONS ====================

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize animations
function initAnimations() {
    // Hover effects for project cards
    const projectCards = document.querySelectorAll('.project-card, .gallery-item');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = 'var(--shadow-strong)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-soft)';
        });
    });
    
    // Parallax effect for cloud background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const clouds = document.querySelectorAll('.cloud');
        
        clouds.forEach((cloud, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrolled * speed);
            cloud.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Ripple effect for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize floating shapes animation for hero
function initFloatingShapes() {
    const shapes = document.querySelectorAll('.floating-circle');
    shapes.forEach((shape, index) => {
        const duration = 15 + (index * 3);
        const delay = index * 2;
        shape.style.animationDuration = `${duration}s`;
        shape.style.animationDelay = `${delay}s`;
    });
}

// ==================== CONTACT FORM FUNCTIONS ====================

// Initialize contact form
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            showNotification('✨ Your message has been sent! I\'ll get back to you within 24 hours.', 'success');
            createConfetti();
        }, 1500);
    });
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--gradient-dream)' : '#ff6b6b'};
        color: white;
        padding: var(--space-md) var(--space-lg);
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-strong);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: var(--space-sm);
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 3s forwards;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3300);
}

// Create confetti effect
function createConfetti() {
    const colors = ['#ffcfe5', '#e6d1ff', '#d1eaff', '#f0d9ff'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            top: -20px;
            left: ${Math.random() * 100}vw;
            opacity: 0.8;
            z-index: 9998;
            animation: fall ${Math.random() * 3 + 2}s linear forwards;
            pointer-events: none;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
    
    if (!document.querySelector('#confetti-style')) {
        const style = document.createElement('style');
        style.id = 'confetti-style';
        style.textContent = `
            @keyframes fall {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes fadeOut {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ==================== MOBILE MENU FUNCTIONS ====================

// Mobile hamburger menu functionality
function initMobileMenu() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navButtons = document.getElementById('navButtons');
    
    if (!hamburgerMenu || !navButtons) return;
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
    
    // Toggle menu function (defined as function expression)
    const toggleMenu = function() {
        hamburgerMenu.classList.toggle('active');
        navButtons.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = navButtons.classList.contains('active') ? 'hidden' : '';
    };
    
    // Hamburger button click
    hamburgerMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
        toggleMenu();
    });
    
    // Close menu when clicking a nav link
    const navLinks = navButtons.querySelectorAll('.nav-btn');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            toggleMenu();
        });
    });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navButtons.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Close menu when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (navButtons.classList.contains('active') && 
            !navButtons.contains(e.target) && 
            !hamburgerMenu.contains(e.target)) {
            toggleMenu();
        }
    });
}

// ==================== INITIALIZATION ====================

// Main initialization function
function initializeApp() {
    createStars();
    createParticles();
    updateActiveNav();
    initSmoothScrolling();
    initAnimations();
    initFloatingShapes();
    initMobileMenu();
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        initContactForm();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Initialize floating shapes if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFloatingShapes);
} else {
    initFloatingShapes();
}