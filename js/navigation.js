/**
 * Navigation Module
 * The Crown Palace
 * Handles responsive navigation, sticky header, and mobile menu
 */

(function () {
    'use strict';

    // DOM Elements
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const mobileNav = document.getElementById('mobileNav');
    const navOverlay = document.getElementById('navOverlay');

    // State
    let isMenuOpen = false;
    let lastScrollY = 0;
    const scrollThreshold = 100;

    // Initialize navigation
    function init() {
        if (!header) return;

        setupScrollHandler();
        setupMobileMenu();
        setupSmoothScroll();
        highlightCurrentPage();
    }

    // Handle header scroll behavior
    function setupScrollHandler() {
        // Check if this is a page with a hero section that has a background image
        const heroWithBackground = document.querySelector('.hero .hero__background');
        const hasHeroBackground = heroWithBackground !== null;

        const handleScroll = throttle(() => {
            const currentScrollY = window.scrollY;

            // Add/remove scrolled class based on scroll position
            if (currentScrollY > scrollThreshold) {
                header.classList.add('header--scrolled');
                header.classList.remove('header--transparent');
            } else {
                header.classList.remove('header--scrolled');
                // Add transparent if we're on a page with hero background
                if (hasHeroBackground) {
                    header.classList.add('header--transparent');
                }
            }

            lastScrollY = currentScrollY;
        }, 100);

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Initialize on page load - set correct initial state
        if (hasHeroBackground && window.scrollY <= scrollThreshold) {
            header.classList.add('header--transparent');
            header.classList.remove('header--scrolled');
        }
    }

    // Setup mobile menu toggle
    function setupMobileMenu() {
        if (!navToggle || !mobileNav || !navOverlay) return;

        // Toggle button click
        navToggle.addEventListener('click', toggleMenu);

        // Overlay click to close
        navOverlay.addEventListener('click', closeMenu);

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMenu();
            }
        });

        // Close menu on window resize (if switching to desktop)
        window.addEventListener('resize', debounce(() => {
            if (window.innerWidth >= 768 && isMenuOpen) {
                closeMenu();
            }
        }, 150));

        // Handle mobile nav link clicks
        const mobileNavLinks = mobileNav.querySelectorAll('.mobile-nav__link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });
    }

    // Toggle mobile menu
    function toggleMenu() {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // Open mobile menu
    function openMenu() {
        isMenuOpen = true;
        navToggle.classList.add('nav-toggle--active');
        navToggle.setAttribute('aria-expanded', 'true');
        mobileNav.classList.add('mobile-nav--open');
        navOverlay.classList.add('mobile-nav__overlay--visible');
        document.body.style.overflow = 'hidden';
    }

    // Close mobile menu
    function closeMenu() {
        isMenuOpen = false;
        navToggle.classList.remove('nav-toggle--active');
        navToggle.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('mobile-nav--open');
        navOverlay.classList.remove('mobile-nav__overlay--visible');
        document.body.style.overflow = '';
    }

    // Setup smooth scroll for anchor links
    function setupSmoothScroll() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = header ? header.offsetHeight : 0;
                    smoothScrollTo(target, headerHeight);

                    // Update URL without jumping
                    history.pushState(null, null, href);
                }
            });
        });
    }

    // Highlight current page in navigation
    function highlightCurrentPage() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';

        // Desktop nav
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (linkPath === currentPath) {
                link.classList.add('nav__link--active');
            } else {
                link.classList.remove('nav__link--active');
            }
        });

        // Mobile nav
        const mobileNavLinks = document.querySelectorAll('.mobile-nav__link');
        mobileNavLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (linkPath === currentPath) {
                link.classList.add('mobile-nav__link--active');
            } else {
                link.classList.remove('mobile-nav__link--active');
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
