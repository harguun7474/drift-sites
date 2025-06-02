// Glitch Text Animation
class GlitchTextAnimation {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            glitchIntensity: options.glitchIntensity || 20,
            glitchInterval: options.glitchInterval || 100,
            colorShift: options.colorShift !== false,
            ...options
        };
        
        this.init();
    }
    
    init() {
        // Create glitch layers
        this.createGlitchLayers();
        
        // Add mouse interaction
        this.element.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.element.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        
        // Start random glitch effect
        this.startRandomGlitch();
        
        // Create noise effect
        this.createNoiseEffect();
    }
    
    createGlitchLayers() {
        // Create container for glitch layers if it doesn't exist
        if (!this.element.querySelector('.glitch-layers')) {
            const container = document.createElement('div');
            container.className = 'glitch-layers';
            container.style.position = 'absolute';
            container.style.top = '0';
            container.style.left = '0';
            container.style.width = '100%';
            container.style.height = '100%';
            container.style.pointerEvents = 'none';
            container.style.zIndex = '-1';
            
            // Create individual glitch layers
            for (let i = 0; i < 3; i++) {
                const layer = document.createElement('div');
                layer.className = 'glitch-layer';
                layer.style.position = 'absolute';
                layer.style.top = '0';
                layer.style.left = '0';
                layer.style.width = '100%';
                layer.style.height = '100%';
                layer.style.mixBlendMode = 'color-dodge';
                layer.style.opacity = '0.2';
                
                container.appendChild(layer);
            }
            
            this.element.style.position = 'relative';
            this.element.appendChild(container);
            this.glitchLayers = container.querySelectorAll('.glitch-layer');
        } else {
            this.glitchLayers = this.element.querySelectorAll('.glitch-layer');
        }
    }
    
    handleMouseMove(e) {
        const rect = this.element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Create glitch effect based on mouse position
        const intensity = Math.random() * 10;
        this.element.style.transform = `translate(${Math.random() * intensity - intensity/2}px, ${Math.random() * intensity - intensity/2}px)`;
        
        // Add color shift if enabled
        if (this.options.colorShift) {
            const hue = (x / rect.width) * 360;
            this.glitchLayers.forEach((layer, index) => {
                layer.style.background = `hsl(${hue + (index * 30)}, 100%, 50%)`;
                layer.style.opacity = '0.3';
                layer.style.transform = `translate(${Math.random() * 5 - 2.5}px, ${Math.random() * 5 - 2.5}px)`;
            });
        }
    }
    
    handleMouseLeave() {
        this.element.style.transform = 'translate(0, 0)';
        
        this.glitchLayers.forEach(layer => {
            layer.style.background = '#0a0a0a';
            layer.style.opacity = '0.2';
            layer.style.transform = 'translate(0, 0)';
        });
    }
    
    startRandomGlitch() {
        setInterval(() => {
            if (Math.random() > 0.95) {
                const intensity = Math.random() * this.options.glitchIntensity;
                this.element.style.transform = `translate(${Math.random() * intensity - intensity/2}px, ${Math.random() * intensity - intensity/2}px)`;
                
                // Add random color to layers during glitch
                this.glitchLayers.forEach((layer, index) => {
                    const hue = Math.random() * 360;
                    layer.style.background = `hsl(${hue}, 100%, 50%)`;
                    layer.style.opacity = Math.random() * 0.5;
                    layer.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
                });
                
                setTimeout(() => {
                    this.element.style.transform = 'translate(0, 0)';
                    
                    this.glitchLayers.forEach(layer => {
                        layer.style.background = '#0a0a0a';
                        layer.style.opacity = '0.2';
                        layer.style.transform = 'translate(0, 0)';
                    });
                }, 100);
            }
        }, this.options.glitchInterval);
    }
    
    createNoiseEffect() {
        // Create canvas for noise
        const noiseCanvas = document.createElement('canvas');
        noiseCanvas.width = 100;
        noiseCanvas.height = 100;
        const ctx = noiseCanvas.getContext('2d');
        
        // Generate noise texture
        const generateNoise = () => {
            const imageData = ctx.createImageData(noiseCanvas.width, noiseCanvas.height);
            const data = imageData.data;
            
            for (let i = 0; i < data.length; i += 4) {
                const value = Math.random() * 255;
                data[i] = value;
                data[i + 1] = value;
                data[i + 2] = value;
                data[i + 3] = 10; // Low opacity
            }
            
            ctx.putImageData(imageData, 0, 0);
            
            // Apply noise to all glitch layers
            this.glitchLayers.forEach(layer => {
                layer.style.backgroundImage = `url(${noiseCanvas.toDataURL()})`;
            });
        };
        
        // Generate noise initially and update periodically
        generateNoise();
        setInterval(generateNoise, 100);
    }
}

// Parallax Effect
class ParallaxEffect {
    constructor(elements, options = {}) {
        this.elements = elements;
        this.options = {
            speed: options.speed || 0.5,
            reverse: options.reverse || false,
            ...options
        };
        
        this.init();
    }
    
    init() {
        // Set initial position
        this.setPositions();
        
        // Add scroll listener
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Handle resize
        window.addEventListener('resize', this.setPositions.bind(this));
    }
    
    setPositions() {
        this.elements.forEach(element => {
            // Store element's initial position
            element.dataset.initialTop = element.getBoundingClientRect().top + window.scrollY;
        });
    }
    
    handleScroll() {
        const scrollY = window.scrollY;
        
        this.elements.forEach(element => {
            const initialTop = parseFloat(element.dataset.initialTop);
            const elementHeight = element.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Check if element is in viewport
            if (scrollY + windowHeight > initialTop && scrollY < initialTop + elementHeight) {
                const scrollProgress = (scrollY + windowHeight - initialTop) / (windowHeight + elementHeight);
                const moveY = this.options.reverse ? 
                    this.options.speed * 100 * (1 - scrollProgress) : 
                    this.options.speed * 100 * scrollProgress;
                
                element.style.transform = `translateY(${moveY}px)`;
            }
        });
    }
}

// Smooth Scroll
class SmoothScroll {
    constructor(options = {}) {
        this.options = {
            duration: options.duration || 800,
            easing: options.easing || 'easeInOutQuart',
            offset: options.offset || 0,
            ...options
        };
        
        this.easings = {
            linear: t => t,
            easeInQuad: t => t * t,
            easeOutQuad: t => t * (2 - t),
            easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
            easeInCubic: t => t * t * t,
            easeOutCubic: t => (--t) * t * t + 1,
            easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
            easeInQuart: t => t * t * t * t,
            easeOutQuart: t => 1 - (--t) * t * t * t,
            easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
        };
        
        this.init();
    }
    
    init() {
        // Add click event listener to all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.scrollToElement.bind(this));
        });
    }
    
    scrollToElement(e) {
        e.preventDefault();
        
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (!targetElement) return;
        
        this.scrollTo(targetElement);
    }
    
    scrollTo(element) {
        const startPosition = window.pageYOffset;
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - this.options.offset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        const animation = currentTime => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / this.options.duration, 1);
            const easedProgress = this.easings[this.options.easing](progress);
            
            window.scrollTo(0, startPosition + distance * easedProgress);
            
            if (timeElapsed < this.options.duration) {
                window.requestAnimationFrame(animation);
            }
        };
        
        window.requestAnimationFrame(animation);
    }
}

// Button Hover Animation
class ButtonHoverAnimation {
    constructor(button, options = {}) {
        this.button = button;
        this.options = {
            particleCount: options.particleCount || 5,
            particleSize: options.particleSize || 3,
            particleColor: options.particleColor || 'rgba(255, 255, 255, 0.5)',
            ...options
        };
        
        this.particles = [];
        this.isHovering = false;
        
        this.init();
    }
    
    init() {
        // Create container for particles
        this.createParticleContainer();
        
        // Add event listeners
        this.button.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
        this.button.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        this.button.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }
    
    createParticleContainer() {
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
        
        // Add keyframes if they don't exist
        if (!document.querySelector('.button-particle-keyframes')) {
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
        for (let i = 0; i < this.options.particleCount; i++) {
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
        particle.style.backgroundColor = this.options.particleColor;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Random size and animation duration
        const size = Math.random() * this.options.particleSize + 2;
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

// Apply animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize glitch text animations
    const glitchTextElements = document.querySelectorAll('.glitch-text');
    glitchTextElements.forEach(element => {
        new GlitchTextAnimation(element);
    });
    
    // Initialize parallax effects
    const parallaxElements = document.querySelectorAll('.parallax');
    if (parallaxElements.length > 0) {
        new ParallaxEffect(parallaxElements);
    }
    
    // Initialize smooth scroll
    new SmoothScroll();
    
    // Initialize button hover animations
    const buttons = document.querySelectorAll('.cta-button, .view-work-button, .nav-cta');
    buttons.forEach(button => {
        new ButtonHoverAnimation(button);
    });
}); 