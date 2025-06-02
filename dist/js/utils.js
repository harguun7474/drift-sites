// Utility functions for the website

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - The function to debounce
 * @param {number} wait - The time to wait in milliseconds
 * @param {boolean} immediate - Whether to trigger the function immediately
 * @returns {Function} - The debounced function
 */
function debounce(func, wait, immediate) {
    let timeout;
    
    return function() {
        const context = this;
        const args = arguments;
        
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        
        if (callNow) func.apply(context, args);
    };
}

/**
 * Throttle function to limit how often a function can be called
 * @param {Function} func - The function to throttle
 * @param {number} limit - The time limit in milliseconds
 * @returns {Function} - The throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    
    return function() {
        const args = arguments;
        const context = this;
        
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Check if an element is in the viewport
 * @param {HTMLElement} element - The element to check
 * @param {number} offset - Optional offset to trigger before element is fully visible
 * @returns {boolean} - Whether the element is in the viewport
 */
function isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    
    return (
        rect.top <= (window.innerHeight - offset || document.documentElement.clientHeight - offset) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
        rect.bottom >= offset &&
        rect.right >= 0
    );
}

/**
 * Get all URL parameters as an object
 * @returns {Object} - Object containing all URL parameters
 */
function getUrlParameters() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const pairs = queryString.split('&');
    
    for (let i = 0; i < pairs.length; i++) {
        if (!pairs[i]) continue;
        
        const pair = pairs[i].split('=');
        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    
    return params;
}

/**
 * Add a URL parameter
 * @param {string} url - The URL to add the parameter to
 * @param {string} param - The parameter name
 * @param {string} value - The parameter value
 * @returns {string} - The URL with the added parameter
 */
function addUrlParameter(url, param, value) {
    const urlObj = new URL(url, window.location.origin);
    urlObj.searchParams.set(param, value);
    return urlObj.toString();
}

/**
 * Remove a URL parameter
 * @param {string} url - The URL to remove the parameter from
 * @param {string} param - The parameter name to remove
 * @returns {string} - The URL with the parameter removed
 */
function removeUrlParameter(url, param) {
    const urlObj = new URL(url, window.location.origin);
    urlObj.searchParams.delete(param);
    return urlObj.toString();
}

/**
 * Generate a random string
 * @param {number} length - The length of the random string
 * @returns {string} - The random string
 */
function randomString(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return result;
}

/**
 * Format a date
 * @param {Date|string|number} date - The date to format
 * @param {string} format - The format string (e.g., 'YYYY-MM-DD')
 * @returns {string} - The formatted date
 */
function formatDate(date, format = 'YYYY-MM-DD') {
    const d = new Date(date);
    
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    
    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
}

/**
 * Format a number with commas
 * @param {number} number - The number to format
 * @returns {string} - The formatted number
 */
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Truncate text to a certain length and add ellipsis
 * @param {string} text - The text to truncate
 * @param {number} length - The maximum length
 * @returns {string} - The truncated text
 */
function truncateText(text, length = 100) {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
}

/**
 * Deep clone an object
 * @param {Object} obj - The object to clone
 * @returns {Object} - The cloned object
 */
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Convert hex color to RGB
 * @param {string} hex - The hex color (e.g., '#ff0000')
 * @returns {Object} - Object with r, g, b properties
 */
function hexToRgb(hex) {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Convert 3-digit hex to 6-digit
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return { r, g, b };
}

/**
 * Generate a random color
 * @param {boolean} asHex - Whether to return the color as a hex string
 * @returns {string|Object} - The random color
 */
function randomColor(asHex = true) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    
    if (asHex) {
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
    
    return { r, g, b };
}

/**
 * Preload an image
 * @param {string} src - The image source URL
 * @returns {Promise} - Promise that resolves when the image is loaded
 */
function preloadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

/**
 * Preload multiple images
 * @param {string[]} srcs - Array of image source URLs
 * @returns {Promise} - Promise that resolves when all images are loaded
 */
function preloadImages(srcs) {
    return Promise.all(srcs.map(src => preloadImage(src)));
}

/**
 * Get cookie by name
 * @param {string} name - The cookie name
 * @returns {string|null} - The cookie value or null if not found
 */
function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
    return match ? decodeURIComponent(match[3]) : null;
}

/**
 * Set a cookie
 * @param {string} name - The cookie name
 * @param {string} value - The cookie value
 * @param {number} days - Number of days until the cookie expires
 */
function setCookie(name, value, days = 30) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/`;
}

/**
 * Delete a cookie
 * @param {string} name - The cookie name
 */
function deleteCookie(name) {
    setCookie(name, '', -1);
}

// Export utilities for use in other files
window.utils = {
    debounce,
    throttle,
    isInViewport,
    getUrlParameters,
    addUrlParameter,
    removeUrlParameter,
    randomString,
    formatDate,
    formatNumber,
    truncateText,
    deepClone,
    hexToRgb,
    randomColor,
    preloadImage,
    preloadImages,
    getCookie,
    setCookie,
    deleteCookie
}; 