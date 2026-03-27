/**
 * Main Application Module
 * The Crown Palace
 * Initializes all components and handles global functionality
 */

(function () {
    'use strict';

    // Initialize application
    function init() {
        setupScrollAnimations();
        setupLazyLoading();
        setupFormValidation();
        addAccessibilityEnhancements();

        // Log initialization
        console.log('The Crown Palace - Website initialized');
    }

    // Setup scroll-triggered animations using Intersection Observer
    function setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

        if (animatedElements.length === 0) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            // Show all elements immediately without animation
            animatedElements.forEach(el => {
                el.classList.add('fade-in--visible', 'fade-in-left--visible', 'fade-in-right--visible');
            });
            return;
        }

        // Create Intersection Observer
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;

                    // Add a small delay based on index for staggered effect
                    const siblings = Array.from(el.parentElement.children).filter(
                        child => child.classList.contains('fade-in') ||
                            child.classList.contains('fade-in-left') ||
                            child.classList.contains('fade-in-right')
                    );
                    const index = siblings.indexOf(el);
                    const delay = Math.min(index * 100, 300);

                    setTimeout(() => {
                        if (el.classList.contains('fade-in')) {
                            el.classList.add('fade-in--visible');
                        }
                        if (el.classList.contains('fade-in-left')) {
                            el.classList.add('fade-in-left--visible');
                        }
                        if (el.classList.contains('fade-in-right')) {
                            el.classList.add('fade-in-right--visible');
                        }
                    }, delay);

                    observer.unobserve(el);
                }
            });
        }, observerOptions);

        // Observe all animated elements
        animatedElements.forEach(el => observer.observe(el));
    }

    // Setup lazy loading for images
    function setupLazyLoading() {
        // Use native lazy loading if supported
        if ('loading' in HTMLImageElement.prototype) {
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        } else {
            // Fallback to Intersection Observer
            if (typeof lazyLoadImages === 'function') {
                lazyLoadImages();
            }
        }
    }

    // Setup form validation
    function setupFormValidation() {
        const forms = document.querySelectorAll('form[data-validate]');

        forms.forEach(form => {
            // Real-time validation on blur
            const inputs = form.querySelectorAll('[data-validate]');
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    if (typeof validateField === 'function') {
                        validateField(input);
                    }
                });

                // Clear error on input
                input.addEventListener('input', () => {
                    input.classList.remove('form-input--error');
                    const errorElement = input.parentElement.querySelector('.form-error');
                    if (errorElement) errorElement.textContent = '';
                });
            });

            // Form submission
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                if (typeof validateForm === 'function' && validateForm(form)) {
                    // Form is valid - show success message
                    showFormSuccess(form);
                }
            });
        });
    }

    // Show form success message
    function showFormSuccess(form) {
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
      <p>Thank you for your message! We will get back to you shortly.</p>
    `;
        successMessage.style.cssText = `
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
      background: #E8F5E9;
      border: 1px solid #4CAF50;
      border-radius: 8px;
      color: #2E7D32;
      margin-top: 16px;
    `;

        form.reset();
        form.appendChild(successMessage);

        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }

    // Add accessibility enhancements
    function addAccessibilityEnhancements() {
        // Add focus visible class for keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Add skip link functionality
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(skipLink.getAttribute('href'));
                if (target) {
                    target.tabIndex = -1;
                    target.focus();
                }
            });
        }

        // Ensure all images have alt text
        const images = document.querySelectorAll('img:not([alt])');
        images.forEach(img => {
            img.alt = '';
            console.warn('Image missing alt text:', img.src);
        });
    }

    // Handle page visibility changes (pause/resume updates)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            console.log('Page hidden - pausing updates');
        } else {
            console.log('Page visible - resuming updates');
        }
    });

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Additional initialization after full page load
    window.addEventListener('load', () => {
        // Remove loading states
        document.body.classList.add('loaded');

        // Preload critical images for other pages
        preloadCriticalImages();
    });

    // Preload critical images for faster navigation
    function preloadCriticalImages() {
        const criticalImages = [
            'images/room-deluxe.png',
            'images/room-royal.png',
            'images/experience-aarti.png'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = src;
            link.as = 'image';
            document.head.appendChild(link);
        });
    }
})();
