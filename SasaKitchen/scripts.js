// ===== GLOBAL VARIABLES =====
let isScrolled = false;
let isMobileMenuOpen = false;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    initializeMenuFilter();
    initializeMenuActions();
    initializeTestimonials();
    initializeServiceArea();
});

// Menu Filter Functionality
function initializeMenuFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter menu items with animation
            menuItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.classList.remove('hidden');
                    
                    // Stagger animation
                    setTimeout(() => {
                        item.style.animation = 'none';
                        item.offsetHeight; // Trigger reflow
                        item.style.animation = `fadeInUp 0.6s ease forwards`;
                        item.style.animationDelay = `${index * 0.1}s`;
                    }, 50);
                } else {
                    item.classList.add('hidden');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Menu Actions Functionality
function initializeMenuActions() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const action = this.getAttribute('data-action');
            const menuItem = this.closest('.menu-item');
            const menuName = menuItem.querySelector('.menu-name').textContent;
            
            if (action === 'view') {
                showMenuDetail(menuItem);
            } else if (action === 'nutrition') {
                showNutritionInfo(menuItem);
            }
        });
    });
}

// Show Menu Detail Modal
function showMenuDetail(menuItem) {
    const menuName = menuItem.querySelector('.menu-name').textContent;
    const menuDescription = menuItem.querySelector('.menu-description').textContent;
    const menuImg = menuItem.querySelector('.menu-img').src;
    const dietLabel = menuItem.querySelector('.diet-label').textContent;
    const calorieLabel = menuItem.querySelector('.calorie-label').textContent;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'menu-modal';
    modal.innerHTML = `
        <div class="menu-modal-content">
            <div class="menu-modal-header">
                <h3>${menuName}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="menu-modal-body">
                <img src="${menuImg}" alt="${menuName}" class="modal-menu-img">
                <div class="modal-menu-info">
                    <div class="modal-labels">
                        <span class="diet-label ${dietLabel.toLowerCase()}">${dietLabel}</span>
                        <span class="calorie-label">${calorieLabel}</span>
                    </div>
                    <p class="modal-description">${menuDescription}</p>
                    <div class="modal-actions">
                        <button class="cta-btn primary" onclick="orderMenu('${menuName}')">
                            <i class="fas fa-shopping-cart"></i>
                            <span>Pesan Sekarang</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        }
    });
}

// Show Nutrition Info
function showNutritionInfo(menuItem) {
    const menuName = menuItem.querySelector('.menu-name').textContent;
    const nutritionItems = menuItem.querySelectorAll('.nutrition-item');
    
    let nutritionHTML = '';
    nutritionItems.forEach(item => {
        const label = item.querySelector('.nutrition-label').textContent;
        const value = item.querySelector('.nutrition-value').textContent;
        nutritionHTML += `
            <div class="nutrition-detail">
                <span class="nutrition-detail-label">${label}</span>
                <span class="nutrition-detail-value">${value}</span>
            </div>
        `;
    });
    
    // Create nutrition modal
    const modal = document.createElement('div');
    modal.className = 'nutrition-modal';
    modal.innerHTML = `
        <div class="nutrition-modal-content">
            <div class="nutrition-modal-header">
                <h3>Informasi Nutrisi</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="nutrition-modal-body">
                <h4>${menuName}</h4>
                <div class="nutrition-details">
                    ${nutritionHTML}
                </div>
                <div class="nutrition-note">
                    <p><i class="fas fa-info-circle"></i> Nilai nutrisi dapat bervariasi tergantung porsi dan metode memasak</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        }
    });
}

// Order Menu Function
function orderMenu(menuName) {
    const message = `Halo Sasa Kitchen! Saya tertarik untuk memesan menu "${menuName}". Bisa tolong berikan informasi lebih detail tentang harga dan cara pemesanannya?`;
    const whatsappUrl = `https://wa.me/6285123456789?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// ===== TESTIMONIALS FUNCTIONALITY =====
function initializeTestimonials() {
    initializeVideoTestimonials();
    initializeStatsAnimation();
    initializeTestimonialCards();
}

// Video testimonials functionality
function initializeVideoTestimonials() {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            const customerName = this.querySelector('.video-customer').textContent;
            showVideoTestimonial(customerName);
        });
    });
}

function showVideoTestimonial(customerName) {
    // Create modal for video testimonial
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-modal-content">
            <div class="video-modal-header">
                <h3>Video Testimoni - ${customerName}</h3>
                <button class="close-video-modal">&times;</button>
            </div>
            <div class="video-modal-body">
                <div class="video-placeholder">
                    <i class="fas fa-play-circle"></i>
                    <p>Video testimoni akan segera tersedia</p>
                    <p class="video-note">Untuk saat ini, Anda dapat menghubungi kami melalui WhatsApp untuk mendengar testimoni langsung dari ${customerName}</p>
                    <button class="contact-testimonial-btn" onclick="contactForTestimonial('${customerName}')">
                        <i class="fab fa-whatsapp"></i>
                        Hubungi untuk Testimoni
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const modalStyles = `
        .video-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .video-modal-content {
            background: white;
            border-radius: 20px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow: hidden;
            animation: slideUp 0.3s ease;
        }
        
        .video-modal-header {
            padding: 20px 30px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: linear-gradient(135deg, #ff6b35, #f7931e);
            color: white;
        }
        
        .video-modal-header h3 {
            margin: 0;
            font-size: 1.3rem;
        }
        
        .close-video-modal {
            background: none;
            border: none;
            font-size: 2rem;
            color: white;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .video-modal-body {
            padding: 40px 30px;
        }
        
        .video-placeholder {
            text-align: center;
            padding: 40px 20px;
        }
        
        .video-placeholder i {
            font-size: 4rem;
            color: #ff6b35;
            margin-bottom: 20px;
        }
        
        .video-placeholder p {
            margin-bottom: 15px;
            color: #6c757d;
        }
        
        .video-note {
            font-size: 0.9rem;
            font-style: italic;
        }
        
        .contact-testimonial-btn {
            background: linear-gradient(135deg, #25d366, #128c7e);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 50px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            margin-top: 20px;
            transition: all 0.3s ease;
        }
        
        .contact-testimonial-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(37, 211, 102, 0.3);
        }
    `;
    
    if (!document.querySelector('#video-modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'video-modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-video-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function contactForTestimonial(customerName) {
    const message = `Halo Sasa Kitchen! Saya tertarik mendengar testimoni langsung dari ${customerName}. Bisakah saya mendapat informasi lebih lanjut tentang pengalaman beliau dengan program diet Sasa Kitchen?`;
    const whatsappUrl = `https://wa.me/6285123456789?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Stats animation functionality
function initializeStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatNumber(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateStatNumber(element) {
    const finalValue = element.textContent;
    const isNumber = /^\d+/.test(finalValue);
    
    if (isNumber) {
        const number = parseInt(finalValue.match(/\d+/)[0]);
        const suffix = finalValue.replace(/\d+/, '');
        let current = 0;
        const increment = number / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                element.textContent = number + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 30);
    }
}

// Testimonial cards functionality
function initializeTestimonialCards() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        // Add click functionality to show full testimonial
        card.addEventListener('click', function() {
            if (!this.classList.contains('expanded')) {
                showFullTestimonial(this);
            }
        });
        
        // Add hover effects for result items
        const resultItems = card.querySelectorAll('.result-item');
        resultItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.background = '#ff6b35';
                this.style.color = 'white';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.background = '#f8f9fa';
                this.style.color = '';
            });
        });
    });
}

function showFullTestimonial(card) {
    const customerName = card.querySelector('.customer-name').textContent;
    const customerTitle = card.querySelector('.customer-title').textContent;
    const testimonialText = card.querySelector('.testimonial-text').textContent;
    const customerImg = card.querySelector('.customer-img').src;
    const rating = card.querySelectorAll('.rating i').length;
    const results = Array.from(card.querySelectorAll('.result-item')).map(item => {
        return {
            label: item.querySelector('.result-label').textContent,
            value: item.querySelector('.result-value').textContent
        };
    });
    
    // Create full testimonial modal
    const modal = document.createElement('div');
    modal.className = 'testimonial-modal';
    modal.innerHTML = `
        <div class="testimonial-modal-content">
            <div class="testimonial-modal-header">
                <div class="modal-customer-info">
                    <img src="${customerImg}" alt="${customerName}" class="modal-customer-img">
                    <div>
                        <h3>${customerName}</h3>
                        <p>${customerTitle}</p>
                        <div class="modal-rating">
                            ${Array(rating).fill('<i class="fas fa-star"></i>').join('')}
                        </div>
                    </div>
                </div>
                <button class="close-testimonial-modal">&times;</button>
            </div>
            <div class="testimonial-modal-body">
                <div class="modal-testimonial-text">
                    ${testimonialText}
                </div>
                <div class="modal-results">
                    ${results.map(result => `
                        <div class="modal-result-item">
                            <span class="modal-result-label">${result.label}</span>
                            <span class="modal-result-value">${result.value}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="modal-actions">
                    <button class="contact-customer-btn" onclick="contactForSimilarProgram('${customerName}')">
                        <i class="fab fa-whatsapp"></i>
                        Program Serupa dengan ${customerName}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles for testimonial
    const testimonialModalStyles = `
        .testimonial-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .testimonial-modal-content {
            background: white;
            border-radius: 20px;
            max-width: 700px;
            width: 90%;
            max-height: 80vh;
            overflow: hidden;
            animation: slideUp 0.3s ease;
        }
        
        .testimonial-modal-header {
            padding: 30px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            background: linear-gradient(135deg, #f8f9fa, #e9ecef);
        }
        
        .modal-customer-info {
            display: flex;
            align-items: center;
            gap: 20px;
        }
        
        .modal-customer-img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid #ff6b35;
        }
        
        .modal-customer-info h3 {
            margin: 0 0 5px 0;
            font-size: 1.5rem;
            color: #2c3e50;
        }
        
        .modal-customer-info p {
            margin: 0 0 10px 0;
            color: #6c757d;
        }
        
        .modal-rating i {
            color: #ffc107;
            margin-right: 3px;
        }
        
        .close-testimonial-modal {
            background: none;
            border: none;
            font-size: 2rem;
            color: #6c757d;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .testimonial-modal-body {
            padding: 30px;
        }
        
        .modal-testimonial-text {
            font-size: 1.1rem;
            line-height: 1.7;
            color: #495057;
            margin-bottom: 30px;
            font-style: italic;
            position: relative;
            padding-left: 30px;
        }
        
        .modal-testimonial-text::before {
            content: '"';
            position: absolute;
            left: 0;
            top: -10px;
            font-size: 3rem;
            color: #ff6b35;
            font-family: serif;
        }
        
        .modal-results {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-bottom: 30px;
        }
        
        .modal-result-item {
            background: linear-gradient(135deg, #ff6b35, #f7931e);
            color: white;
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        
        .modal-result-label {
            font-size: 0.9rem;
            opacity: 0.9;
        }
        
        .modal-result-value {
            font-size: 1.5rem;
            font-weight: 700;
        }
        
        .modal-actions {
            text-align: center;
        }
        
        .contact-customer-btn {
            background: linear-gradient(135deg, #25d366, #128c7e);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 50px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s ease;
        }
        
        .contact-customer-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(37, 211, 102, 0.3);
        }
    `;
    
    if (!document.querySelector('#testimonial-modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'testimonial-modal-styles';
        styleSheet.textContent = testimonialModalStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-testimonial-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function contactForSimilarProgram(customerName) {
    const message = `Halo Sasa Kitchen! Saya tertarik dengan program diet yang sama seperti yang dijalani ${customerName}. Bisakah saya mendapat informasi detail tentang program tersebut?`;
    const whatsappUrl = `https://wa.me/6285123456789?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// ===== INITIALIZE APPLICATION =====
function initializeApp() {
    setupNavigation();
    setupScrollEffects();
    setupMobileMenu();
    setupCTAButtons();
    setupAnimations();
    setupFormValidation();
}

// ===== NAVIGATION SETUP =====
function setupNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50 && !isScrolled) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            isScrolled = true;
        } else if (scrollTop <= 50 && isScrolled) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
            isScrolled = false;
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update active link
                    updateActiveNavLink(this);
                    
                    // Close mobile menu if open
                    if (isMobileMenuOpen) {
                        toggleMobileMenu();
                    }
                }
            }
        });
    });
}

// ===== MOBILE MENU SETUP =====
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (isMobileMenuOpen && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                toggleMobileMenu();
            }
        });
    }
}

function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const bars = hamburger.querySelectorAll('.bar');
    
    isMobileMenuOpen = !isMobileMenuOpen;
    
    if (isMobileMenuOpen) {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = 'rgba(255, 255, 255, 0.98)';
        navMenu.style.backdropFilter = 'blur(10px)';
        navMenu.style.padding = '2rem';
        navMenu.style.gap = '1.5rem';
        navMenu.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        
        // Animate hamburger to X
        bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        navMenu.style.display = 'none';
        
        // Reset hamburger
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
}

// ===== SCROLL EFFECTS =====
function setupScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.hero-text, .hero-image, .floating-card, .problem-card, .solution-text, .solution-image');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== CTA BUTTONS SETUP =====
function setupCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-btn');
    
    ctaButtons.forEach(button => {
        // Add ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Handle specific CTA actions
        const href = button.getAttribute('href');
        if (href === '#order') {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                openOrderModal();
            });
        } else if (href === '#consultation') {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                openConsultationModal();
            });
        }
    });
    
    // Service Duration Options Functionality
    setupServiceDurationOptions();
}

// ===== SERVICE DURATION OPTIONS =====
function setupServiceDurationOptions() {
    // Handle duration option selection
    const durationOptions = document.querySelectorAll('.duration-option');
    
    durationOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from siblings
            const siblings = this.parentNode.querySelectorAll('.duration-option');
            siblings.forEach(sibling => sibling.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Update the main price display
            const serviceCard = this.closest('.service-card');
            const priceAmount = serviceCard.querySelector('.price-amount');
            const newPrice = this.getAttribute('data-price');
            
            if (priceAmount && newPrice) {
                // Format price with thousand separator
                const formattedPrice = parseInt(newPrice).toLocaleString('id-ID');
                priceAmount.textContent = `Rp ${formattedPrice}`;
            }
            
            // Update WhatsApp link with selected package info
            const ctaButton = serviceCard.querySelector('.card-cta');
            const packageTitle = serviceCard.querySelector('.card-title').textContent;
            const duration = this.getAttribute('data-duration');
            const totalPrice = this.querySelector('.duration-total').textContent;
            
            if (ctaButton) {
                const baseUrl = 'https://wa.me/6285123456789?text=';
                const message = `Halo Sasa Kitchen! Saya ingin memesan ${packageTitle} untuk ${duration} hari (${totalPrice}). Mohon informasi detail dan cara pemesanan.`;
                const encodedMessage = encodeURIComponent(message);
                ctaButton.href = baseUrl + encodedMessage;
            }
        });
    });
    
    // Initialize default WhatsApp links for consultation cards
    const consultationCards = document.querySelectorAll('.consultation-card');
    consultationCards.forEach(card => {
        const ctaButton = card.querySelector('.card-cta');
        const packageTitle = card.querySelector('.card-title').textContent;
        
        if (ctaButton && !ctaButton.href.includes('data-duration')) {
            const baseUrl = 'https://wa.me/6285123456789?text=';
            let message = '';
            
            if (packageTitle.includes('Online')) {
                message = 'Halo Sasa Kitchen! Saya ingin konsultasi online dengan ahli gizi. Mohon informasi jadwal dan cara booking.';
            } else if (packageTitle.includes('Konsultasi + Catering')) {
                message = 'Halo Sasa Kitchen! Saya tertarik dengan Paket Konsultasi + Catering. Mohon informasi detail program ini.';
            }
            
            const encodedMessage = encodeURIComponent(message);
            ctaButton.href = baseUrl + encodedMessage;
        }
    });
    
    // Add hover effects for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click animation for card CTA buttons
    const cardCtaButtons = document.querySelectorAll('.card-cta');
    cardCtaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ===== ANIMATIONS SETUP =====
function setupAnimations() {
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.8s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .hero-text, .hero-image {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease-out;
        }
        
        .floating-card {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
            transition: all 0.6s ease-out;
        }
        
        .problem-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        
        .solution-text, .solution-image {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .menu-modal-content, .nutrition-modal-content {
            background: white;
            border-radius: 20px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            animation: slideUp 0.3s ease;
        }
        
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .menu-modal-header, .nutrition-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 25px;
            border-bottom: 1px solid #e9ecef;
        }
        
        .menu-modal-header h3, .nutrition-modal-header h3 {
            margin: 0;
            color: #2d3436;
            font-size: 24px;
            font-weight: 700;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            color: #6c757d;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .modal-close:hover {
            background: #f8f9fa;
            color: #2d3436;
        }
        
        .menu-modal-body {
            padding: 25px;
        }
        
        .modal-menu-img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 15px;
            margin-bottom: 20px;
        }
        
        .modal-labels {
            display: flex;
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .modal-description {
            color: #6c757d;
            line-height: 1.6;
            margin-bottom: 25px;
        }
        
        .modal-actions {
            text-align: center;
        }
        
        .nutrition-modal-body {
            padding: 25px;
        }
        
        .nutrition-modal-body h4 {
            color: #2d3436;
            margin-bottom: 20px;
            font-size: 18px;
        }
        
        .nutrition-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .nutrition-detail {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 10px;
            text-align: center;
        }
        
        .nutrition-detail-label {
            font-size: 12px;
            color: #6c757d;
            font-weight: 600;
            text-transform: uppercase;
            margin-bottom: 5px;
        }
        
        .nutrition-detail-value {
            font-size: 18px;
            font-weight: 700;
            color: #28a745;
        }
        
        .nutrition-note {
            background: #e8f5e8;
            padding: 15px;
            border-radius: 10px;
            border-left: 4px solid #28a745;
        }
        
        .nutrition-note p {
            margin: 0;
            color: #155724;
            font-size: 14px;
        }
        
        .nutrition-note i {
            color: #28a745;
            margin-right: 8px;
        }
    `;
    document.head.appendChild(style);
    
    // Trigger initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-text, .hero-image');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animate-in');
            }, index * 200);
        });
        
        // Animate floating cards
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-in');
            }, 1000 + (index * 300));
        });
        
        // Animate problem cards with stagger effect
        const problemCards = document.querySelectorAll('.problem-card');
        problemCards.forEach((card, index) => {
            setTimeout(() => {
                if (isElementInViewport(card)) {
                    card.classList.add('animate-in');
                }
            }, 200 + (index * 150));
        });
        
        // Animate solution elements
        const solutionElements = document.querySelectorAll('.solution-text, .solution-image');
        solutionElements.forEach((element, index) => {
            setTimeout(() => {
                if (isElementInViewport(element)) {
                    element.classList.add('animate-in');
                }
            }, 500 + (index * 200));
        });
    }, 500);
}

// ===== FORM VALIDATION =====
function setupFormValidation() {
    // This will be used for contact forms later
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'Field ini wajib diisi');
            isValid = false;
        } else {
            clearFieldError(field);
        }
        
        // Email validation
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                showFieldError(field, 'Format email tidak valid');
                isValid = false;
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && field.value.trim()) {
            const phoneRegex = /^[0-9+\-\s()]+$/;
            if (!phoneRegex.test(field.value)) {
                showFieldError(field, 'Format nomor telepon tidak valid');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#E74C3C';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.style.borderColor = '#E74C3C';
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '';
}

// ===== MODAL FUNCTIONS =====
function openOrderModal() {
    // Placeholder for order modal
    alert('Fitur pemesanan akan segera hadir! Silakan hubungi WhatsApp untuk pemesanan.');
    
    // In a real implementation, this would open a modal
    // showModal('order-modal');
}

function openConsultationModal() {
    // Placeholder for consultation modal
    alert('Fitur konsultasi akan segera hadir! Silakan hubungi WhatsApp untuk konsultasi.');
    
    // In a real implementation, this would open a modal
    // showModal('consultation-modal');
}

// ===== UTILITY FUNCTIONS =====
function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounced scroll handler
const debouncedScrollHandler = debounce(function() {
    // Additional scroll-based functionality can be added here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// ===== ACCESSIBILITY IMPROVEMENTS =====
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && isMobileMenuOpen) {
        toggleMobileMenu();
    }
    
    // Skip to main content with Tab
    if (e.key === 'Tab' && e.target === document.body) {
        const mainContent = document.querySelector('main') || document.querySelector('.hero');
        if (mainContent) {
            mainContent.focus();
        }
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// ===== SERVICE AREA FUNCTIONALITY =====
function initializeServiceArea() {
    initializeZoneSelection();
    initializeAddressChecker();
    initializeDeliveryCalculator();
}

// Zone selection functionality
function initializeZoneSelection() {
    const zoneCards = document.querySelectorAll('.zone-card');
    const zoneMap = document.querySelector('.zone-map');
    
    zoneCards.forEach(card => {
        card.addEventListener('click', function() {
            const zoneId = this.getAttribute('data-zone');
            
            // Remove active class from all cards
            zoneCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Highlight zone on map
            highlightZoneOnMap(zoneId);
            
            // Show zone details
            showZoneDetails(zoneId);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            const zoneId = this.getAttribute('data-zone');
            previewZoneOnMap(zoneId);
        });
        
        card.addEventListener('mouseleave', function() {
            clearMapPreview();
        });
    });
}

// Address checker functionality
function initializeAddressChecker() {
    const addressInput = document.querySelector('#address-input');
    const checkButton = document.querySelector('#check-address-btn');
    const resultsContainer = document.querySelector('#address-results');
    
    if (addressInput && checkButton) {
        checkButton.addEventListener('click', function() {
            const address = addressInput.value.trim();
            if (address) {
                checkDeliveryAddress(address);
            } else {
                showAddressError('Silakan masukkan alamat lengkap Anda');
            }
        });
        
        // Check address on Enter key
        addressInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkButton.click();
            }
        });
        
        // Auto-suggest as user types
        addressInput.addEventListener('input', debounce(function() {
            const query = this.value.trim();
            if (query.length > 3) {
                showAddressSuggestions(query);
            }
        }, 300));
    }
}

// Delivery calculator functionality
function initializeDeliveryCalculator() {
    const calculatorForm = document.querySelector('#delivery-calculator');
    
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const deliveryData = {
                zone: formData.get('delivery-zone'),
                address: formData.get('delivery-address'),
                orderValue: parseFloat(formData.get('order-value')) || 0,
                deliveryTime: formData.get('delivery-time')
            };
            
            calculateDeliveryFee(deliveryData);
        });
    }
}

// Highlight zone on map
function highlightZoneOnMap(zoneId) {
    const mapZones = document.querySelectorAll('.map-zone');
    
    mapZones.forEach(zone => {
        zone.classList.remove('active', 'highlighted');
        if (zone.getAttribute('data-zone') === zoneId) {
            zone.classList.add('active');
        }
    });
}

// Preview zone on map hover
function previewZoneOnMap(zoneId) {
    const mapZone = document.querySelector(`[data-zone="${zoneId}"]`);
    if (mapZone && !mapZone.classList.contains('active')) {
        mapZone.classList.add('highlighted');
    }
}

// Clear map preview
function clearMapPreview() {
    const mapZones = document.querySelectorAll('.map-zone');
    mapZones.forEach(zone => {
        if (!zone.classList.contains('active')) {
            zone.classList.remove('highlighted');
        }
    });
}

// Show zone details
function showZoneDetails(zoneId) {
    const zoneData = getZoneData(zoneId);
    const detailsContainer = document.querySelector('#zone-details');
    
    if (detailsContainer && zoneData) {
        detailsContainer.innerHTML = `
            <div class="zone-detail-card">
                <div class="zone-detail-header">
                    <h4>${zoneData.name}</h4>
                    <span class="zone-status ${zoneData.status}">${zoneData.statusText}</span>
                </div>
                <div class="zone-detail-body">
                    <div class="detail-item">
                        <i class="fas fa-truck"></i>
                        <span>Biaya Pengiriman: ${zoneData.deliveryFee}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-clock"></i>
                        <span>Waktu Pengiriman: ${zoneData.deliveryTime}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>Cakupan: ${zoneData.coverage}</span>
                    </div>
                    ${zoneData.freeDelivery ? `
                        <div class="detail-item highlight">
                            <i class="fas fa-gift"></i>
                            <span>Gratis ongkir untuk pembelian minimal ${zoneData.freeDelivery}</span>
                        </div>
                    ` : ''}
                </div>
                <div class="zone-detail-actions">
                    <button class="btn-primary" onclick="orderFromZone('${zoneId}')">
                        <i class="fas fa-shopping-cart"></i>
                        Pesan Sekarang
                    </button>
                </div>
            </div>
        `;
        
        detailsContainer.style.display = 'block';
        detailsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Check delivery address
function checkDeliveryAddress(address) {
    const resultsContainer = document.querySelector('#address-results');
    
    // Show loading state
    showAddressLoading();
    
    // Simulate API call to check address
    setTimeout(() => {
        const result = validateAddress(address);
        displayAddressResult(result);
    }, 1500);
}

// Validate address (mock function)
function validateAddress(address) {
    const zones = {
        'jakarta': { zone: 'zone-1', name: 'Jakarta Pusat', fee: 'Rp 15.000', time: '1-2 jam', available: true },
        'bekasi': { zone: 'zone-2', name: 'Bekasi', fee: 'Rp 20.000', time: '2-3 jam', available: true },
        'depok': { zone: 'zone-3', name: 'Depok', fee: 'Rp 18.000', time: '1.5-2.5 jam', available: true },
        'tangerang': { zone: 'zone-4', name: 'Tangerang', fee: 'Rp 22.000', time: '2-3 jam', available: true },
        'bogor': { zone: 'zone-5', name: 'Bogor', fee: 'Rp 25.000', time: '2.5-3.5 jam', available: true }
    };
    
    const addressLower = address.toLowerCase();
    
    for (const [key, data] of Object.entries(zones)) {
        if (addressLower.includes(key)) {
            return {
                available: data.available,
                zone: data.zone,
                zoneName: data.name,
                deliveryFee: data.fee,
                deliveryTime: data.time,
                address: address
            };
        }
    }
    
    return {
        available: false,
        message: 'Maaf, area Anda belum terjangkau layanan kami. Silakan hubungi customer service untuk informasi lebih lanjut.'
    };
}

// Display address result
function displayAddressResult(result) {
    const resultsContainer = document.querySelector('#address-results');
    
    if (result.available) {
        resultsContainer.innerHTML = `
            <div class="address-result success">
                <div class="result-header">
                    <i class="fas fa-check-circle"></i>
                    <h4>Area Anda Terjangkau!</h4>
                </div>
                <div class="result-details">
                    <div class="result-item">
                        <span class="label">Zona Pengiriman:</span>
                        <span class="value">${result.zoneName}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">Biaya Pengiriman:</span>
                        <span class="value">${result.deliveryFee}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">Estimasi Waktu:</span>
                        <span class="value">${result.deliveryTime}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">Alamat:</span>
                        <span class="value">${result.address}</span>
                    </div>
                </div>
                <div class="result-actions">
                    <button class="btn-primary" onclick="orderToAddress('${result.address}', '${result.zone}')">
                        <i class="fas fa-shopping-cart"></i>
                        Pesan ke Alamat Ini
                    </button>
                    <button class="btn-secondary" onclick="calculateDetailedDelivery('${result.zone}')">
                        <i class="fas fa-calculator"></i>
                        Hitung Detail Ongkir
                    </button>
                </div>
            </div>
        `;
    } else {
        resultsContainer.innerHTML = `
            <div class="address-result error">
                <div class="result-header">
                    <i class="fas fa-times-circle"></i>
                    <h4>Area Belum Terjangkau</h4>
                </div>
                <div class="result-message">
                    <p>${result.message}</p>
                </div>
                <div class="result-actions">
                    <button class="btn-primary" onclick="contactForNewArea('${result.address || 'Area tidak diketahui'}')">
                        <i class="fab fa-whatsapp"></i>
                        Hubungi Customer Service
                    </button>
                </div>
            </div>
        `;
    }
    
    resultsContainer.style.display = 'block';
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Show address loading
function showAddressLoading() {
    const resultsContainer = document.querySelector('#address-results');
    resultsContainer.innerHTML = `
        <div class="address-loading">
            <div class="loading-spinner"></div>
            <p>Mengecek area pengiriman...</p>
        </div>
    `;
    resultsContainer.style.display = 'block';
}

// Show address error
function showAddressError(message) {
    const resultsContainer = document.querySelector('#address-results');
    resultsContainer.innerHTML = `
        <div class="address-result error">
            <div class="result-header">
                <i class="fas fa-exclamation-triangle"></i>
                <h4>Error</h4>
            </div>
            <div class="result-message">
                <p>${message}</p>
            </div>
        </div>
    `;
    resultsContainer.style.display = 'block';
}

// Show address suggestions
function showAddressSuggestions(query) {
    const suggestions = [
        'Jakarta Pusat, DKI Jakarta',
        'Jakarta Selatan, DKI Jakarta',
        'Jakarta Barat, DKI Jakarta',
        'Bekasi Timur, Bekasi',
        'Bekasi Selatan, Bekasi',
        'Depok, Jawa Barat',
        'Tangerang Selatan, Banten',
        'Bogor, Jawa Barat'
    ];
    
    const filteredSuggestions = suggestions.filter(addr => 
        addr.toLowerCase().includes(query.toLowerCase())
    );
    
    if (filteredSuggestions.length > 0) {
        const suggestionsContainer = document.querySelector('#address-suggestions');
        if (suggestionsContainer) {
            suggestionsContainer.innerHTML = filteredSuggestions.map(addr => 
                `<div class="suggestion-item" onclick="selectSuggestion('${addr}')">${addr}</div>`
            ).join('');
            suggestionsContainer.style.display = 'block';
        }
    }
}

// Select suggestion
function selectSuggestion(address) {
    const addressInput = document.querySelector('#address-input');
    const suggestionsContainer = document.querySelector('#address-suggestions');
    
    if (addressInput) {
        addressInput.value = address;
    }
    
    if (suggestionsContainer) {
        suggestionsContainer.style.display = 'none';
    }
}

// Calculate delivery fee
function calculateDeliveryFee(deliveryData) {
    const resultContainer = document.querySelector('#delivery-calculation-result');
    
    // Show loading
    resultContainer.innerHTML = `
        <div class="calculation-loading">
            <div class="loading-spinner"></div>
            <p>Menghitung biaya pengiriman...</p>
        </div>
    `;
    resultContainer.style.display = 'block';
    
    // Simulate calculation
    setTimeout(() => {
        const calculation = performDeliveryCalculation(deliveryData);
        displayDeliveryCalculation(calculation);
    }, 1000);
}

// Perform delivery calculation
function performDeliveryCalculation(data) {
    const baseFees = {
        'zone-1': 15000,
        'zone-2': 20000,
        'zone-3': 18000,
        'zone-4': 22000,
        'zone-5': 25000
    };
    
    const baseFee = baseFees[data.zone] || 20000;
    let finalFee = baseFee;
    let discount = 0;
    let freeDelivery = false;
    
    // Apply discounts based on order value
    if (data.orderValue >= 200000) {
        freeDelivery = true;
        finalFee = 0;
    } else if (data.orderValue >= 150000) {
        discount = baseFee * 0.5;
        finalFee = baseFee - discount;
    } else if (data.orderValue >= 100000) {
        discount = baseFee * 0.3;
        finalFee = baseFee - discount;
    }
    
    // Rush hour surcharge
    if (data.deliveryTime === 'rush') {
        const surcharge = baseFee * 0.2;
        finalFee += surcharge;
    }
    
    return {
        baseFee,
        discount,
        finalFee,
        freeDelivery,
        orderValue: data.orderValue,
        zone: data.zone,
        deliveryTime: data.deliveryTime
    };
}

// Display delivery calculation
function displayDeliveryCalculation(calc) {
    const resultContainer = document.querySelector('#delivery-calculation-result');
    
    resultContainer.innerHTML = `
        <div class="delivery-calculation">
            <div class="calculation-header">
                <h4>Rincian Biaya Pengiriman</h4>
            </div>
            <div class="calculation-details">
                <div class="calc-item">
                    <span class="label">Nilai Pesanan:</span>
                    <span class="value">Rp ${calc.orderValue.toLocaleString('id-ID')}</span>
                </div>
                <div class="calc-item">
                    <span class="label">Biaya Pengiriman Dasar:</span>
                    <span class="value">Rp ${calc.baseFee.toLocaleString('id-ID')}</span>
                </div>
                ${calc.discount > 0 ? `
                    <div class="calc-item discount">
                        <span class="label">Diskon Ongkir:</span>
                        <span class="value">- Rp ${calc.discount.toLocaleString('id-ID')}</span>
                    </div>
                ` : ''}
                ${calc.freeDelivery ? `
                    <div class="calc-item free-delivery">
                        <span class="label">🎉 Gratis Ongkir!</span>
                        <span class="value">Rp 0</span>
                    </div>
                ` : ''}
                <div class="calc-item total">
                    <span class="label">Total Ongkir:</span>
                    <span class="value">Rp ${calc.finalFee.toLocaleString('id-ID')}</span>
                </div>
            </div>
            <div class="calculation-actions">
                <button class="btn-primary" onclick="proceedWithDelivery(${JSON.stringify(calc).replace(/"/g, '&quot;')})">
                    <i class="fas fa-shopping-cart"></i>
                    Lanjut Pesan
                </button>
            </div>
        </div>
    `;
}

// Get zone data
function getZoneData(zoneId) {
    const zones = {
        'zone-1': {
            name: 'Jakarta Pusat',
            status: 'available',
            statusText: 'Tersedia',
            deliveryFee: 'Rp 15.000',
            deliveryTime: '1-2 jam',
            coverage: 'Menteng, Gambir, Tanah Abang, Kemayoran',
            freeDelivery: 'Rp 200.000'
        },
        'zone-2': {
            name: 'Bekasi',
            status: 'available',
            statusText: 'Tersedia',
            deliveryFee: 'Rp 20.000',
            deliveryTime: '2-3 jam',
            coverage: 'Bekasi Timur, Bekasi Selatan, Bekasi Barat',
            freeDelivery: 'Rp 200.000'
        },
        'zone-3': {
            name: 'Depok',
            status: 'available',
            statusText: 'Tersedia',
            deliveryFee: 'Rp 18.000',
            deliveryTime: '1.5-2.5 jam',
            coverage: 'Margonda, Beji, Pancoran Mas',
            freeDelivery: 'Rp 200.000'
        },
        'zone-4': {
            name: 'Tangerang',
            status: 'available',
            statusText: 'Tersedia',
            deliveryFee: 'Rp 22.000',
            deliveryTime: '2-3 jam',
            coverage: 'Tangerang Selatan, BSD, Alam Sutera',
            freeDelivery: 'Rp 200.000'
        },
        'zone-5': {
            name: 'Bogor',
            status: 'limited',
            statusText: 'Terbatas',
            deliveryFee: 'Rp 25.000',
            deliveryTime: '2.5-3.5 jam',
            coverage: 'Bogor Tengah, Bogor Timur (area tertentu)',
            freeDelivery: 'Rp 250.000'
        }
    };
    
    return zones[zoneId];
}

// Order from zone
function orderFromZone(zoneId) {
    const zoneData = getZoneData(zoneId);
    const message = `Halo Sasa Kitchen! Saya ingin memesan dari zona ${zoneData.name}. Mohon informasi menu dan cara pemesanan.`;
    const whatsappUrl = `https://wa.me/6285123456789?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Order to address
function orderToAddress(address, zoneId) {
    const message = `Halo Sasa Kitchen! Saya ingin memesan dengan pengiriman ke: ${address}. Mohon informasi menu dan konfirmasi ongkir.`;
    const whatsappUrl = `https://wa.me/6285123456789?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Calculate detailed delivery
function calculateDetailedDelivery(zoneId) {
    const calculatorSection = document.querySelector('#delivery-calculator');
    if (calculatorSection) {
        calculatorSection.scrollIntoView({ behavior: 'smooth' });
        
        // Pre-fill zone if available
        const zoneSelect = calculatorSection.querySelector('[name="delivery-zone"]');
        if (zoneSelect) {
            zoneSelect.value = zoneId;
        }
    }
}

// Contact for new area
function contactForNewArea(address) {
    const message = `Halo Sasa Kitchen! Saya tertarik dengan layanan Anda, tapi alamat saya di ${address} belum terjangkau. Apakah ada rencana untuk memperluas area pengiriman ke daerah saya?`;
    const whatsappUrl = `https://wa.me/6285123456789?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Proceed with delivery
function proceedWithDelivery(calcData) {
    const zoneData = getZoneData(calcData.zone);
    const message = `Halo Sasa Kitchen! Saya ingin melanjutkan pemesanan dengan detail:\n\nZona: ${zoneData.name}\nNilai Pesanan: Rp ${calcData.orderValue.toLocaleString('id-ID')}\nOngkir: Rp ${calcData.finalFee.toLocaleString('id-ID')}\n\nMohon informasi menu dan cara pembayaran.`;
    const whatsappUrl = `https://wa.me/6285123456789?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// ===== FAQ SECTION FUNCTIONALITY =====
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle i');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherToggle = otherItem.querySelector('.faq-toggle i');
                    otherToggle.classList.remove('fa-minus');
                    otherToggle.classList.add('fa-plus');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                toggle.classList.remove('fa-minus');
                toggle.classList.add('fa-plus');
            } else {
                item.classList.add('active');
                toggle.classList.remove('fa-plus');
                toggle.classList.add('fa-minus');
                
                // Smooth scroll to the FAQ item
                setTimeout(() => {
                    item.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }, 300);
            }
        });
        
        // Add keyboard accessibility
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
        
        // Make question focusable
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', item.classList.contains('active'));
    });
    
    // Initialize first FAQ as open by default
    const firstFaq = document.querySelector('.faq-item.active');
    if (firstFaq) {
        const firstToggle = firstFaq.querySelector('.faq-toggle i');
        firstToggle.classList.remove('fa-plus');
        firstToggle.classList.add('fa-minus');
    }
}

// Add FAQ initialization to existing DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.faq-section')) {
        initializeFAQ();
    }
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        validateForm,
        toggleMobileMenu,
        initializeServiceArea,
        initializeFAQ
    };
}