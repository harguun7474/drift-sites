// DOM Elements
const elements = {
    glitchText: document.querySelector('.glitch-text'),
    glitchLayer: document.querySelector('.glitch-layer'),
    menuToggle: document.querySelector('.menu-toggle'),
    navMenu: document.querySelector('nav ul'),
    navLinks: document.querySelectorAll('nav ul li a'),
    animatedElements: document.querySelectorAll('.animate-on-scroll'),
    buttons: document.querySelectorAll('.cta-button, .view-work-button')
};

// Animation and Scroll Functions
const animations = {
    // Animate elements when they enter viewport
    animateOnScroll: () => {
        elements.animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    },
    
    // Initialize scroll animations
    initScrollAnimations: () => {
        window.addEventListener('load', animations.animateOnScroll);
        window.addEventListener('scroll', animations.animateOnScroll);
    }
};

// Mobile Menu Functions
const mobileMenu = {
    menuIcon: null,
    lastScrollTop: 0,
    
    // Close mobile menu
    closeMenu: () => {
        if (window.innerWidth <= 768) {
            elements.navMenu.classList.remove('active');
            mobileMenu.menuIcon.classList.remove('fa-times');
            mobileMenu.menuIcon.classList.add('fa-bars');
            setTimeout(() => {
                elements.navMenu.style.display = 'none';
            }, 300);
        }
    },
    
    // Initialize mobile menu functionality
    init: () => {
        mobileMenu.menuIcon = elements.menuToggle.querySelector('i');
        
        // Toggle menu on hamburger click
        elements.menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (window.innerWidth <= 768) {
                if (elements.navMenu.classList.contains('active')) {
                    mobileMenu.closeMenu();
                } else {
                    elements.navMenu.style.display = 'flex';
                    elements.navMenu.offsetHeight; // Force reflow
                    elements.navMenu.classList.add('active');
                    mobileMenu.menuIcon.classList.remove('fa-bars');
                    mobileMenu.menuIcon.classList.add('fa-times');
                }
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && 
                !elements.navMenu.contains(e.target) && 
                !elements.menuToggle.contains(e.target) && 
                elements.navMenu.classList.contains('active')) {
                mobileMenu.closeMenu();
            }
        });
        
        // Close menu when clicking on a link
        elements.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    mobileMenu.closeMenu();
                }
            });
        });
        
        // Handle scroll events for mobile menu
        window.addEventListener('scroll', () => {
            if (window.innerWidth <= 768) {
                const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
                
                // Only close menu if scrolling down
                if (currentScroll > mobileMenu.lastScrollTop && elements.navMenu.classList.contains('active')) {
                    mobileMenu.closeMenu();
                }
                
                mobileMenu.lastScrollTop = currentScroll;
            }
        });
    }
};

// Glitch Effect Functions
const glitchEffects = {
    noiseCanvas: null,
    ctx: null,
    
    // Generate noise texture
    generateNoise: () => {
        const imageData = glitchEffects.ctx.createImageData(glitchEffects.noiseCanvas.width, glitchEffects.noiseCanvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const value = Math.random() * 255;
            data[i] = value;
            data[i + 1] = value;
            data[i + 2] = value;
            data[i + 3] = 10;
        }
        
        glitchEffects.ctx.putImageData(imageData, 0, 0);
        elements.glitchLayer.style.backgroundImage = `url(${glitchEffects.noiseCanvas.toDataURL()})`;
    },
    
    // Random glitch animation
    randomGlitch: () => {
        setInterval(() => {
            if (Math.random() > 0.95) {
                const intensity = Math.random() * 20;
                elements.glitchText.style.transform = `translate(${Math.random() * intensity - intensity/2}px, ${Math.random() * intensity - intensity/2}px)`;
                setTimeout(() => {
                    elements.glitchText.style.transform = 'translate(0, 0)';
                }, 100);
            }
        }, 100);
    },
    
    // Initialize glitch effects
    init: () => {
        if (!elements.glitchText || !elements.glitchLayer) return;
        
        // Mouse move effect
        elements.glitchText.addEventListener('mousemove', (e) => {
            const rect = elements.glitchText.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create glitch effect based on mouse position
            const intensity = Math.random() * 10;
            elements.glitchText.style.transform = `translate(${Math.random() * intensity - intensity/2}px, ${Math.random() * intensity - intensity/2}px)`;
            
            // Add color shift
            const hue = (x / rect.width) * 360;
            elements.glitchLayer.style.background = `hsl(${hue}, 100%, 50%)`;
        });
        
        // Reset on mouse leave
        elements.glitchText.addEventListener('mouseleave', () => {
            elements.glitchText.style.transform = 'translate(0, 0)';
            elements.glitchLayer.style.background = '#0a0a0a';
        });
        
        // Initialize noise canvas
        glitchEffects.noiseCanvas = document.createElement('canvas');
        glitchEffects.noiseCanvas.width = 100;
        glitchEffects.noiseCanvas.height = 100;
        glitchEffects.ctx = glitchEffects.noiseCanvas.getContext('2d');
        
        glitchEffects.generateNoise();
        setInterval(glitchEffects.generateNoise, 100);
        
        // Start random glitch effect
        glitchEffects.randomGlitch();
    }
};

// Button Effects
class ButtonEffect {
    constructor(button) {
        this.button = button;
        this.createParticleContainer();
        this.particles = [];
        this.isHovering = false;
        
        this.init();
    }
    
    createParticleContainer() {
        // Create container for particles if it doesn't exist
        if (!this.button.querySelector('.button-particle-container')) {
            const container = document.createElement('div');
            container.className = 'button-particle-container';
            container.style.position = 'absolute';
            container.style.top = '0';
            container.style.left = '0';
            container.style.width = '100%';
            container.style.height = '100%';
            container.style.overflow = 'hidden';
            container.style.pointerEvents = 'none';
            container.style.zIndex = '1';
            this.button.style.position = 'relative';
            this.button.appendChild(container);
            this.particleContainer = container;
        } else {
            this.particleContainer = this.button.querySelector('.button-particle-container');
        }
    }

    init() {
        this.button.addEventListener('mouseenter', () => this.handleMouseEnter());
        this.button.addEventListener('mouseleave', () => this.handleMouseLeave());
        this.button.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }

    handleMouseEnter() {
        this.isHovering = true;
        this.startParticleEffect();
    }

    handleMouseLeave() {
        this.isHovering = false;
    }

    handleMouseMove(e) {
        if (!this.isHovering) return;
        
        const rect = this.button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Create particle at mouse position
        this.createParticle(x, y);
    }

    startParticleEffect() {
        // Create initial particles
        for (let i = 0; i < 5; i++) {
            const x = Math.random() * this.button.offsetWidth;
            const y = Math.random() * this.button.offsetHeight;
            this.createParticle(x, y);
        }
    }

    createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'button-particle';
        particle.style.position = 'absolute';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Random size and animation duration
        const size = Math.random() * 3 + 2;
        const duration = Math.random() * 1 + 0.5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Add keyframe animation
        particle.style.animation = `particleFloat ${duration}s ease-out forwards`;
        
        this.particleContainer.appendChild(particle);
        this.particles.push(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
            this.particles = this.particles.filter(p => p !== particle);
        }, duration * 1000);
    }
}

// Initialize Button Effects
const initButtonEffects = () => {
    if (!document.querySelector('.button-particle-keyframes')) {
        // Add keyframes for particle animation
        const keyframes = document.createElement('style');
        keyframes.className = 'button-particle-keyframes';
        keyframes.textContent = `
            @keyframes particleFloat {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.8;
                }
                100% {
                    transform: translate(${Math.random() > 0.5 ? '+' : '-'}${Math.random() * 20 + 10}px, -${Math.random() * 30 + 20}px) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(keyframes);
    }
    
    // Apply button effects to all relevant buttons
    elements.buttons.forEach(button => {
        new ButtonEffect(button);
    });
};

// 3D Model Viewer (if applicable)
const modelViewer = {
    init: () => {
        const modelContainer = document.getElementById('model-viewer');
        if (!modelContainer) return;
        
        // Initialize 3D model viewer (if using one)
        // This would need to be customized based on the 3D library you're using
    }
};

// Form validation
const formValidation = {
    init: () => {
        const contactForm = document.querySelector('.contact-form');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = contactForm.querySelector('input[name="name"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const messageInput = contactForm.querySelector('textarea[name="message"]');
            
            let isValid = true;
            
            // Simple validation
            if (!nameInput.value.trim()) {
                isValid = false;
                formValidation.showError(nameInput, 'Name is required');
            } else {
                formValidation.removeError(nameInput);
            }
            
            if (!emailInput.value.trim()) {
                isValid = false;
                formValidation.showError(emailInput, 'Email is required');
            } else if (!formValidation.isValidEmail(emailInput.value)) {
                isValid = false;
                formValidation.showError(emailInput, 'Please enter a valid email');
            } else {
                formValidation.removeError(emailInput);
            }
            
            if (!messageInput.value.trim()) {
                isValid = false;
                formValidation.showError(messageInput, 'Message is required');
            } else {
                formValidation.removeError(messageInput);
            }
            
            if (isValid) {
                // Here you would typically send the form data to a server
                // For now, we'll just show a success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                successMessage.style.padding = '15px';
                successMessage.style.borderRadius = '8px';
                successMessage.style.backgroundColor = 'rgba(0, 255, 0, 0.1)';
                successMessage.style.color = '#00ff00';
                successMessage.style.marginTop = '20px';
                
                contactForm.appendChild(successMessage);
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    },
    
    showError: (input, message) => {
        const formGroup = input.parentElement;
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.color = '#ff0055';
            errorElement.style.fontSize = '0.8rem';
            errorElement.style.marginTop = '5px';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.style.borderColor = '#ff0055';
    },
    
    removeError: (input) => {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        input.style.borderColor = '';
    },
    
    isValidEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
};

// Theme toggle (Dark/Light mode if needed)
const themeToggle = {
    init: () => {
        const themeToggleBtn = document.getElementById('theme-toggle');
        if (!themeToggleBtn) return;
        
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            
            // Save preference to localStorage
            const isDarkMode = document.body.classList.contains('light-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', isDarkMode);
        });
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
        }
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    mobileMenu.init();
    animations.initScrollAnimations();
    glitchEffects.init();
    initButtonEffects();
    modelViewer.init();
    formValidation.init();
    themeToggle.init();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}); 