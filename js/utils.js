/**
 * Utility Functions
 * The Crown Palace
 */

// Debounce function - limits how often a function can fire
function debounce(func, wait, immediate = false) {
  let timeout;
  return function executedFunction(...args) {
    const context = this;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Throttle function - ensures function is called at most once in specified period
// Uses leading + trailing execution to ensure final state is always captured
function throttle(func, limit) {
  let inThrottle;
  let lastArgs;
  let lastContext;
  return function executedFunction(...args) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
        // Execute trailing call if there were calls during throttle period
        if (lastArgs) {
          func.apply(lastContext, lastArgs);
          lastArgs = null;
          lastContext = null;
        }
      }, limit);
    } else {
      // Store the latest call to execute when throttle ends
      lastArgs = args;
      lastContext = context;
    }
  };
}

// Check if element is in viewport
function isInViewport(element, offset = 0) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
    rect.bottom >= 0 &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
    rect.right >= 0
  );
}

// Smooth scroll to element
function smoothScrollTo(target, offset = 0) {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

// Format date for display
function formatDate(date, options = {}) {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return new Date(date).toLocaleDateString('en-IN', { ...defaultOptions, ...options });
}

// Get URL parameters
function getUrlParams() {
  const params = {};
  const searchParams = new URLSearchParams(window.location.search);
  for (const [key, value] of searchParams) {
    params[key] = value;
  }
  return params;
}

// Set cookie
function setCookie(name, value, days = 30) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

// Get cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop().split(';').shift());
  }
  return null;
}

// Lazy load images using Intersection Observer
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
          }
          img.removeAttribute('data-src');
          img.removeAttribute('data-srcset');
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    images.forEach(img => {
      img.src = img.dataset.src;
      if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
      }
    });
  }
}

// Form validation helpers
const validators = {
  required: (value) => value.trim() !== '',
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  phone: (value) => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value),
  minLength: (value, min) => value.length >= min,
  maxLength: (value, max) => value.length <= max
};

// Validate form field
function validateField(input) {
  const value = input.value;
  const rules = input.dataset.validate ? input.dataset.validate.split('|') : [];
  let isValid = true;
  let errorMessage = '';

  for (const rule of rules) {
    const [ruleName, ruleValue] = rule.split(':');

    switch (ruleName) {
      case 'required':
        if (!validators.required(value)) {
          isValid = false;
          errorMessage = 'This field is required';
        }
        break;
      case 'email':
        if (value && !validators.email(value)) {
          isValid = false;
          errorMessage = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (value && !validators.phone(value)) {
          isValid = false;
          errorMessage = 'Please enter a valid phone number';
        }
        break;
      case 'minLength':
        if (!validators.minLength(value, parseInt(ruleValue))) {
          isValid = false;
          errorMessage = `Minimum ${ruleValue} characters required`;
        }
        break;
      case 'maxLength':
        if (!validators.maxLength(value, parseInt(ruleValue))) {
          isValid = false;
          errorMessage = `Maximum ${ruleValue} characters allowed`;
        }
        break;
    }

    if (!isValid) break;
  }

  // Update UI
  const errorElement = input.parentElement.querySelector('.form-error');
  if (isValid) {
    input.classList.remove('form-input--error');
    if (errorElement) errorElement.textContent = '';
  } else {
    input.classList.add('form-input--error');
    if (errorElement) errorElement.textContent = errorMessage;
  }

  return isValid;
}

// Validate entire form
function validateForm(form) {
  const inputs = form.querySelectorAll('[data-validate]');
  let isValid = true;

  inputs.forEach(input => {
    if (!validateField(input)) {
      isValid = false;
    }
  });

  return isValid;
}

// Export utilities (for module usage if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    debounce,
    throttle,
    isInViewport,
    smoothScrollTo,
    formatDate,
    getUrlParams,
    setCookie,
    getCookie,
    lazyLoadImages,
    validators,
    validateField,
    validateForm
  };
}
