// Form Validation and Submission
class FormHandler {
    constructor(formSelector, options = {}) {
        this.form = document.querySelector(formSelector);
        if (!this.form) return;
        
        this.options = {
            submitEndpoint: options.submitEndpoint || '',
            successMessage: options.successMessage || 'Form submitted successfully!',
            errorMessage: options.errorMessage || 'There was an error submitting the form. Please try again.',
            validationRules: options.validationRules || {},
            customValidation: options.customValidation || {},
            ...options
        };
        
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        
        // Add input validation on blur
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.removeErrorStyles(input));
        });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const isValid = this.validateForm();
        
        if (isValid) {
            // Submit form data
            this.submitForm();
        }
    }
    
    validateForm() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(input) {
        const name = input.name;
        const value = input.value.trim();
        
        // Skip validation for fields without name attribute or hidden fields
        if (!name || input.type === 'hidden') {
            return true;
        }
        
        // Check if field is required
        if (input.required && value === '') {
            this.showError(input, `${this.getFieldLabel(input)} is required`);
            return false;
        }
        
        // Apply specific validation rules
        if (name in this.options.validationRules) {
            const rule = this.options.validationRules[name];
            
            if (typeof rule === 'function') {
                const result = rule(value, input);
                if (result !== true) {
                    this.showError(input, result);
                    return false;
                }
            } else if (rule instanceof RegExp) {
                if (value !== '' && !rule.test(value)) {
                    this.showError(input, `Please enter a valid ${this.getFieldLabel(input)}`);
                    return false;
                }
            }
        } else {
            // Apply default validation based on input type
            if (value !== '') {
                switch (input.type) {
                    case 'email':
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(value)) {
                            this.showError(input, 'Please enter a valid email address');
                            return false;
                        }
                        break;
                    case 'tel':
                        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
                        if (!phoneRegex.test(value)) {
                            this.showError(input, 'Please enter a valid phone number');
                            return false;
                        }
                        break;
                    case 'url':
                        const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
                        if (!urlRegex.test(value)) {
                            this.showError(input, 'Please enter a valid URL');
                            return false;
                        }
                        break;
                }
            }
        }
        
        // Apply custom validation if provided
        if (name in this.options.customValidation) {
            const customValidation = this.options.customValidation[name];
            const result = customValidation(value, input, this.form);
            
            if (result !== true) {
                this.showError(input, result);
                return false;
            }
        }
        
        // If all validation passes, remove any error styling
        this.removeErrorStyles(input);
        return true;
    }
    
    getFieldLabel(input) {
        // Try to find a label
        const id = input.id;
        if (id) {
            const label = document.querySelector(`label[for="${id}"]`);
            if (label) {
                return label.textContent;
            }
        }
        
        // Fall back to name with first letter capitalized
        return input.name.charAt(0).toUpperCase() + input.name.slice(1).replace(/[-_]/g, ' ');
    }
    
    showError(input, message) {
        const formGroup = input.closest('.form-group') || input.parentElement;
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
        input.setAttribute('aria-invalid', 'true');
    }
    
    removeErrorStyles(input) {
        const formGroup = input.closest('.form-group') || input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.textContent = '';
        }
        
        input.style.borderColor = '';
        input.removeAttribute('aria-invalid');
    }
    
    submitForm() {
        const formData = new FormData(this.form);
        
        // Show loading state
        this.setFormState('loading');
        
        // If a submit endpoint is provided, use fetch to submit the form
        if (this.options.submitEndpoint) {
            fetch(this.options.submitEndpoint, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.showSuccessMessage(this.options.successMessage);
                this.form.reset();
                this.setFormState('success');
                
                // Call success callback if provided
                if (typeof this.options.onSuccess === 'function') {
                    this.options.onSuccess(data);
                }
            })
            .catch(error => {
                this.showErrorMessage(this.options.errorMessage);
                this.setFormState('error');
                
                // Call error callback if provided
                if (typeof this.options.onError === 'function') {
                    this.options.onError(error);
                }
                
                console.error('Form submission error:', error);
            });
        } else {
            // If no endpoint is provided, just show success message
            setTimeout(() => {
                this.showSuccessMessage(this.options.successMessage);
                this.form.reset();
                this.setFormState('success');
            }, 1000);
        }
    }
    
    setFormState(state) {
        // Remove all state classes
        this.form.classList.remove('form-loading', 'form-success', 'form-error');
        
        // Add the appropriate state class
        this.form.classList.add(`form-${state}`);
        
        // Update submit button state
        const submitButton = this.form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = state === 'loading';
            
            // Store original button text if not already stored
            if (!submitButton.dataset.originalText) {
                submitButton.dataset.originalText = submitButton.textContent;
            }
            
            // Update button text based on state
            if (state === 'loading') {
                submitButton.textContent = 'Sending...';
            } else {
                submitButton.textContent = submitButton.dataset.originalText;
            }
        }
    }
    
    showSuccessMessage(message) {
        this.removeStatusMessages();
        
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success-message';
        successMessage.textContent = message;
        successMessage.style.padding = '15px';
        successMessage.style.borderRadius = '8px';
        successMessage.style.backgroundColor = 'rgba(0, 255, 0, 0.1)';
        successMessage.style.color = '#00ff00';
        successMessage.style.marginTop = '20px';
        
        this.form.appendChild(successMessage);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
    
    showErrorMessage(message) {
        this.removeStatusMessages();
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'form-error-message';
        errorMessage.textContent = message;
        errorMessage.style.padding = '15px';
        errorMessage.style.borderRadius = '8px';
        errorMessage.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
        errorMessage.style.color = '#ff0055';
        errorMessage.style.marginTop = '20px';
        
        this.form.appendChild(errorMessage);
    }
    
    removeStatusMessages() {
        const successMessage = this.form.querySelector('.form-success-message');
        const errorMessage = this.form.querySelector('.form-error-message');
        
        if (successMessage) successMessage.remove();
        if (errorMessage) errorMessage.remove();
    }
}

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Contact form
    new FormHandler('.contact-form', {
        // Example validation rules
        validationRules: {
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            phone: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
            message: value => value.length < 10 ? 'Message must be at least 10 characters long' : true
        },
        // Custom success message
        successMessage: 'Thank you for your message! We will get back to you soon.',
        // Example custom validation
        customValidation: {
            name: value => value.length < 2 ? 'Name must be at least 2 characters long' : true
        }
    });
    
    // Newsletter form (if exists)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        new FormHandler('.newsletter-form', {
            validationRules: {
                email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            },
            successMessage: 'Thank you for subscribing to our newsletter!'
        });
    }
}); 