// Massapage.id Landing Page JavaScript
// Author: UI/UX Designer
// Version: 1.0

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initHeaderScroll();
    initIntersectionObserver();
    initMobileMenu();
    initActiveNavigation();
    initAboutUsAnimations();
    initAboutUsTracking();
    initFormValidation();
    initAnalytics();
    initPortfolioFilter();
    initPortfolioTracking();
    initPortfolioHoverEffects();
    initRemainingButtons();
});

/**
 * Smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Header background change on scroll
 */
function initHeaderScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/**
 * Intersection Observer for animations
 */
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('service-card') || 
                    entry.target.classList.contains('feature-card') ||
                    entry.target.classList.contains('process-step')) {
                    
                    const siblings = Array.from(entry.target.parentNode.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                    entry.target.classList.add('loading');
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.service-card, .feature-card, .process-step, .stat-item, .portfolio-card').forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

/**
 * Modern Mobile menu functionality
 */
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const body = document.body;

    // Toggle mobile menu
    function toggleMobileMenu() {
        const isActive = mobileMenuToggle.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    // Open mobile menu
    function openMobileMenu() {
        mobileMenuToggle.classList.add('active');
        mobileNavOverlay.classList.add('active');
        body.style.overflow = 'hidden';
        
        // Track mobile menu open
        trackEvent('mobile_menu_open');
    }

    // Close mobile menu
    function closeMobileMenu() {
        mobileMenuToggle.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        body.style.overflow = '';
        
        // Track mobile menu close
        trackEvent('mobile_menu_close');
    }

    // Event listeners
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close menu when clicking on overlay
    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', function(e) {
            if (e.target === mobileNavOverlay) {
                closeMobileMenu();
            }
        });
    }

    // Close menu when clicking on nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
            
            // Track mobile nav link click
            trackEvent('mobile_nav_click', {
                link_text: this.textContent,
                link_href: this.getAttribute('href')
            });
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNavOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileNavOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

/**
 * Active navigation link highlighting
 */
function initActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.offsetHeight;
            
            if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Update active link on scroll
    window.addEventListener('scroll', throttle(updateActiveLink, 100));
    
    // Update active link on page load
    updateActiveLink();

    // Track navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('nav_link_click', {
                link_text: this.textContent,
                link_href: this.getAttribute('href')
            });
        });
    });
}

/**
 * Form validation (for future contact forms)
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (validateForm(data)) {
                submitForm(data);
            }
        });
    });
}

/**
 * Validate form data
 */
function validateForm(data) {
    let isValid = true;
    const errors = [];
    
    // Email validation
    if (data.email && !isValidEmail(data.email)) {
        errors.push('Email tidak valid');
        isValid = false;
    }
    
    // Phone validation
    if (data.phone && !isValidPhone(data.phone)) {
        errors.push('Nomor telepon tidak valid');
        isValid = false;
    }
    
    // Required fields
    const requiredFields = ['name', 'email', 'message'];
    requiredFields.forEach(field => {
        if (data[field] && data[field].trim() === '') {
            errors.push(`${field} harus diisi`);
            isValid = false;
        }
    });
    
    if (!isValid) {
        showErrors(errors);
    }
    
    return isValid;
}

/**
 * Email validation
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Phone validation
 */
function isValidPhone(phone) {
    const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Show validation errors
 */
function showErrors(errors) {
    // Create or update error display
    let errorDiv = document.querySelector('.form-errors');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'form-errors';
        errorDiv.style.cssText = `
            background: #2B4D9C;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            margin: 1rem 0;
        `;
    }
    
    errorDiv.innerHTML = errors.map(error => `<p>• ${error}</p>`).join('');
    
    // Insert before form or at top of page
    const form = document.querySelector('form');
    if (form) {
        form.parentNode.insertBefore(errorDiv, form);
    }
}

/**
 * Submit form data
 */
function submitForm(data) {
    // Show loading state
    showLoading();
    
    // Simulate API call
    setTimeout(() => {
        hideLoading();
        showSuccess('Terima kasih! Pesan Anda telah terkirim. Tim kami akan menghubungi Anda dalam 24 jam.');
        
        // Track conversion
        trackEvent('form_submit', {
            form_type: 'contact',
            page: window.location.pathname
        });
    }, 2000);
}

/**
 * Show loading state
 */
function showLoading() {
    const submitBtn = document.querySelector('form button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Mengirim...';
    }
}

/**
 * Hide loading state
 */
function hideLoading() {
    const submitBtn = document.querySelector('form button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Kirim Pesan';
    }
}

/**
 * Show success message
 */
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        background: #202950;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
        text-align: center;
    `;
    successDiv.innerHTML = message;
    
    const form = document.querySelector('form');
    if (form) {
        form.parentNode.insertBefore(successDiv, form);
        form.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
}

/**
 * Initialize remaining button functionality (portfolio buttons only)
 */
function initRemainingButtons() {
    // Handle portfolio view and demo buttons for booklet opening
    document.querySelectorAll('.btn-view, .btn-demo').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Use the href attribute from the button instead of hardcoded URL
            const bookletUrl = this.getAttribute('href') || 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view';
            window.open(bookletUrl, '_blank');
            
            // Track booklet view
            trackEvent('booklet_view', {
                source: 'portfolio_button'
            });
        });
    });
    
    // Handle secondary buttons that should open booklet
    document.querySelectorAll('.btn-secondary[data-action="booklet"]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Use the href attribute from the button instead of hardcoded URL
            const bookletUrl = this.getAttribute('href') || 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view';
            window.open(bookletUrl, '_blank');
            
            // Track booklet view
            trackEvent('booklet_view', {
                source: 'secondary_button'
            });
        });
    });
}

/**
 * Initialize analytics tracking
 */
function initAnalytics() {
    // Track page view
    trackEvent('page_view', {
        page: window.location.pathname,
        title: document.title
    });
    
    // Track CTA clicks
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('cta_click', {
                button_text: this.textContent,
                button_location: this.closest('section')?.className || 'unknown'
            });
        });
    });
    
    // Track service card interactions
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function() {
            const serviceName = this.querySelector('h3')?.textContent;
            trackEvent('service_interest', {
                service: serviceName
            });
        });
    });
}

// About Us Animations
function initAboutUsAnimations() {
    const aboutSection = document.querySelector('.about-us');
    const valueItems = document.querySelectorAll('.value-item');
    
    if (!aboutSection) return;
    
    // Animate value items on scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const valueObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, observerOptions);
    
    valueItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        valueObserver.observe(item);
    });
}

// About Us Tracking
function initAboutUsTracking() {
    const aboutSection = document.querySelector('.about-us');
    if (!aboutSection) return;
    
    // Track section view
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                trackEvent('About Us', 'Section View', 'About Us Section Viewed');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    sectionObserver.observe(aboutSection);
    
    // Track value item interactions
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            const valueTitle = item.querySelector('h4').textContent;
            trackEvent('About Us', 'Value Hover', valueTitle);
        });
    });
    
    // Track CTA button clicks
    const aboutCTAs = document.querySelectorAll('.about-cta .cta-button, .about-cta .btn-secondary');
    aboutCTAs.forEach(button => {
        button.addEventListener('click', (e) => {
            const buttonText = button.textContent.trim();
            trackEvent('About Us', 'CTA Click', buttonText);
        });
    });
    
    // Track scroll depth in about section
    let maxScrollDepth = 0;
    const trackScrollDepth = throttle(() => {
        const rect = aboutSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = rect.height;
        
        if (rect.top < windowHeight && rect.bottom > 0) {
            const visibleHeight = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top);
            const scrollDepth = Math.round((visibleHeight / sectionHeight) * 100);
            
            if (scrollDepth > maxScrollDepth) {
                maxScrollDepth = scrollDepth;
                
                // Track milestones
                if (scrollDepth >= 25 && maxScrollDepth < 25) {
                    trackEvent('About Us', 'Scroll Depth', '25%');
                } else if (scrollDepth >= 50 && maxScrollDepth < 50) {
                    trackEvent('About Us', 'Scroll Depth', '50%');
                } else if (scrollDepth >= 75 && maxScrollDepth < 75) {
                    trackEvent('About Us', 'Scroll Depth', '75%');
                } else if (scrollDepth >= 100 && maxScrollDepth < 100) {
                    trackEvent('About Us', 'Scroll Depth', '100%');
                }
            }
        }
    }, 250);
    
    window.addEventListener('scroll', trackScrollDepth);
}
    
    // Portfolio Filter Functionality
    function initPortfolioFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        // Check if elements exist
        if (filterButtons.length === 0) {
            console.warn('No filter buttons found');
            return;
        }
        
        if (portfolioItems.length === 0) {
            console.warn('No portfolio items found');
            return;
        }
        
        // Initialize filter counts
        updateFilterCounts();
        
        filterButtons.forEach((button, index) => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const filter = this.getAttribute('data-filter');
                
                // Prevent multiple clicks during animation
                if (this.classList.contains('filtering')) {
                    return;
                }
                
                // Update active button state
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });
                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');
                
                // Add filtering state
                filterButtons.forEach(btn => btn.classList.add('filtering'));
                
                // Filter portfolio items with smooth animation
                filterPortfolioItems(filter, portfolioItems).then(() => {
                    // Remove filtering state after animation
                    filterButtons.forEach(btn => btn.classList.remove('filtering'));
                }).catch(error => {
                    console.error('Error during filtering:', error);
                    // Remove filtering state even if there's an error
                    filterButtons.forEach(btn => btn.classList.remove('filtering'));
                });
                
                // Track filter usage
                if (typeof trackEvent === 'function') {
                    trackEvent('portfolio_filter', {
                        filter: filter
                    });
                }
            });
        });
    }
    
    function updateFilterCounts() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterButtons.forEach(button => {
            const filter = button.getAttribute('data-filter');
            const countElement = button.querySelector('.filter-count');
            
            if (countElement) {
                if (filter === 'all') {
                    countElement.textContent = portfolioItems.length;
                } else {
                    const count = document.querySelectorAll(`.portfolio-item[data-category="${filter}"]`).length;
                    countElement.textContent = count;
                }
            }
        });
    }
    
    function filterPortfolioItems(filter, items) {
        return new Promise((resolve) => {
            // Get items to show and hide
            const itemsToShow = [];
            const itemsToHide = [];
            
            items.forEach(item => {
                const category = item.getAttribute('data-category');
                const shouldShow = filter === 'all' || category === filter;
                
                if (shouldShow) {
                    itemsToShow.push(item);
                } else {
                    itemsToHide.push(item);
                }
            });
            
            // First phase: fade out items that should be hidden
            itemsToHide.forEach(item => {
                if (!item.classList.contains('fade-out')) {
                    item.classList.add('fade-out');
                    item.classList.remove('fade-in');
                }
            });
            
            // Second phase: after fade out animation, show items that should be visible
            setTimeout(() => {
                // Hide items that should be hidden
                itemsToHide.forEach(item => {
                    item.style.display = 'none';
                    item.classList.remove('fade-in');
                });
                
                // Show and animate items that should be visible
                itemsToShow.forEach((item, index) => {
                    item.style.display = 'block';
                    item.classList.remove('fade-out');
                    
                    // Stagger the animation for a smoother effect
                    setTimeout(() => {
                        item.classList.add('fade-in');
                    }, index * 50);
                });
                
                // Trigger AOS refresh for newly visible items
                setTimeout(() => {
                    if (typeof AOS !== 'undefined') {
                        AOS.refresh();
                    }
                    resolve();
                }, itemsToShow.length * 50 + 100);
                
            }, 250); // Reduced animation duration for snappier feel
        });
    }
    
    // Portfolio Item Interactions
    function initPortfolioTracking() {
        // Track project views
        document.querySelectorAll('.btn-view').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const projectTitle = this.closest('.portfolio-card').querySelector('h3').textContent;
                
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'project_view', {
                        'project_name': projectTitle,
                        'event_category': 'portfolio'
                    });
                }
                
                // Add your view logic here
                console.log('Viewing project:', projectTitle);
            });
        });
        
        // Track demo clicks
        document.querySelectorAll('.btn-demo').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const projectTitle = this.closest('.portfolio-card').querySelector('h3').textContent;
                
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'project_demo', {
                        'project_name': projectTitle,
                        'event_category': 'portfolio'
                    });
                }
                
                // Add your demo logic here
                console.log('Demo for project:', projectTitle);
            });
        });
        
        // Track load more button
        const loadMoreBtn = document.querySelector('.load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function(e) {
                // Track the event first
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'load_more_portfolio', {
                        'event_category': 'portfolio'
                    });
                }
                
                console.log('Navigating to portfolio page');
                
                // Ensure navigation works in all environments
                const href = this.getAttribute('href');
                if (href) {
                    // For deployment environments, use window.location
                    setTimeout(() => {
                        window.location.href = href;
                    }, 100);
                }
            });
        }
    }
    
    // Portfolio Card Hover Effects
    function initPortfolioHoverEffects() {
        const portfolioCards = document.querySelectorAll('.portfolio-card');
        
        portfolioCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                // Add subtle parallax effect to the image
                const image = this.querySelector('.portfolio-placeholder');
                if (image) {
                    image.style.transform = 'scale(1.05)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                // Reset image transform
                const image = this.querySelector('.portfolio-placeholder');
                if (image) {
                    image.style.transform = 'scale(1)';
                }
            });
            
            // Add click tracking for the entire card
            card.addEventListener('click', function(e) {
                // Only track if not clicking on action buttons
                if (!e.target.closest('.portfolio-actions')) {
                    const projectTitle = this.querySelector('h3').textContent;
                    
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'portfolio_card_click', {
                            'project_name': projectTitle,
                            'event_category': 'portfolio'
                        });
                    }
                }
            });
        });
    }
    

    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', throttle(function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            // Track milestone scrolls
            if (maxScroll >= 25 && maxScroll < 50) {
                trackEvent('scroll_depth', { depth: '25%' });
            } else if (maxScroll >= 50 && maxScroll < 75) {
                trackEvent('scroll_depth', { depth: '50%' });
            } else if (maxScroll >= 75 && maxScroll < 90) {
                trackEvent('scroll_depth', { depth: '75%' });
            } else if (maxScroll >= 90) {
                trackEvent('scroll_depth', { depth: '90%' });
            }
        }
    }, 1000));

/**
 * Track events (placeholder for analytics integration)
 */
function trackEvent(eventName, properties = {}) {
    // Console log for development
    console.log('Analytics Event:', eventName, properties);
    
    // Integration with Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    // Integration with Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, properties);
    }
    
    // Integration with other analytics tools
    // Add your analytics code here
}

/**
 * Throttle function for performance
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
 * Debounce function for performance
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
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
 * Utility function to check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Lazy loading for images (if needed)
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/**
 * Performance monitoring
 */
function initPerformanceMonitoring() {
    // Monitor page load time
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        trackEvent('page_load_time', { load_time: loadTime });
    });
    
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
        // This would require the web-vitals library
        // import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';
    }
}

/**
 * Error handling
 */
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    trackEvent('javascript_error', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno
    });
});

/**
 * Service Worker registration (for PWA features)
 */
function initServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('ServiceWorker registration successful');
                })
                .catch(function(err) {
                    console.log('ServiceWorker registration failed');
                });
        });
    }
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isValidEmail,
        isValidPhone,
        validateForm,
        trackEvent,
        throttle,
        debounce,
        isInViewport
    };
}