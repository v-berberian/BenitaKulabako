// ================================
// SMOOTH SCROLL REVEAL ANIMATIONS
// ================================

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add stagger delay for items in the same section
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 50);

            // Unobserve after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with data-scroll attribute
const scrollElements = document.querySelectorAll('[data-scroll]');
scrollElements.forEach(el => observer.observe(el));

// ================================
// ACTING PAGE VIDEO ANIMATIONS
// ================================

if (document.querySelector('.acting-page')) {
    const workItems = document.querySelectorAll('.work-item');

    const workObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                workObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    workItems.forEach(item => workObserver.observe(item));
}

// ================================
// SMOOTH SCROLL BEHAVIOR
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ================================
// CURSOR ENHANCEMENT (OPTIONAL)
// ================================

const cursor = {
    init() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);

        this.bindEvents();
    },

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });

        // Enhance cursor on hoverable elements
        const hoverElements = document.querySelectorAll('a, button, .grid-item, .gallery-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('cursor-hover');
            });
        });
    }
};

// ================================
// PARALLAX EFFECT ON SCROLL
// ================================

let ticking = false;
let hasScrolledOnce = false;

function updateParallax() {
    const scrolled = Math.max(0, window.pageYOffset || 0);

    // Mark that user has started scrolling
    if (scrolled > 0) {
        hasScrolledOnce = true;
    }

    // Hero section parallax - only when visible
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroHeight = heroSection.offsetHeight;

        if (scrolled < heroHeight) {
            // Title - slowest movement (more dramatic)
            // Title - slowest movement (more dramatic)
            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle) {
               // Internal parallax removed for layered effect
            }

            // Intro - medium speed (more dramatic)
            const heroIntro = document.querySelector('.hero-intro');
            if (heroIntro) {
               // Internal parallax removed for layered effect
            }

            // Scroll indicator - fastest movement (floats up much faster)
            const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator && scrolled > 0) {
            const indicatorSpeed = 1.2;
            const indicatorPos = -(scrolled * indicatorSpeed);
            scrollIndicator.style.transform = `translateY(${indicatorPos}px)`;
        }

            // Zoom effect removed
        }
    }

    // Always check scroll indicator visibility
    // We do this outside the hero check to ensure it hides even if we scroll past quickly
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        // Hide as soon as the user scrolls at all
        if (scrolled > 0) {
            scrollIndicator.classList.add('hidden');
            // Remove inline opacity that might have been set previously or by other scripts
            scrollIndicator.style.opacity = '';
            scrollIndicator.style.visibility = '';
        } else {
            scrollIndicator.classList.remove('hidden');
            // Clear transform so CSS animation can run
            scrollIndicator.style.transform = '';
        }
    }

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Hide the scroll indicator immediately on user scroll intent
['wheel', 'touchmove', 'keydown'].forEach((eventName) => {
    window.addEventListener(eventName, () => {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (!scrollIndicator) return;
        if ((window.pageYOffset || 0) > 0) scrollIndicator.classList.add('hidden');
    }, { passive: true });
});

// ================================
// MOUSE WHEEL AUTOSCROLL HELPER
// ================================

let isAutoScrolling = false;
window.addEventListener('wheel', (e) => {
    // Only apply on landing page
    if (!document.querySelector('.hero-minimal') || !document.querySelector('.portfolio-selection')) return;

    const scrolled = window.pageYOffset || document.documentElement.scrollTop;

    // Prevent overscroll bounce pulling the hero down when already at the top
    if (scrolled <= 0 && e.deltaY < 0) {
        e.preventDefault();
        return;
    }
    
    // Don't interrupt if we're already animating or scrolling
    if (isAutoScrolling) return;

    const vh = window.innerHeight;
    const threshold = vh * 0.25; // 25% threshold as requested

    if (e.deltaY > 0 && scrolled < threshold) {
        // User scrolls down while at the top
        isAutoScrolling = true;
        e.preventDefault();
        window.scrollTo({
            top: vh,
            behavior: 'smooth'
        });
        // Reset lock after animation finishes
        setTimeout(() => { isAutoScrolling = false; }, 1000);
    } else if (e.deltaY < 0 && scrolled > (vh - threshold) && scrolled < (vh + threshold)) {
        // User scrolls up while at the portfolio section
        isAutoScrolling = true;
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        // Reset lock after animation finishes
        setTimeout(() => { isAutoScrolling = false; }, 1000);
    }
}, { passive: false });

// ================================
// LAZY LOADING IMAGES (IF ADDED)
// ================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ================================
// PERFORMANCE: DEBOUNCE UTILITY
// ================================

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

// ================================
// RESPONSIVE NAVIGATION
// ================================

let lastScroll = 0;
const nav = document.querySelector('.nav');

if (nav) {
    window.addEventListener('scroll', debounce(() => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    }, 10));
}

// ================================
// GRID ITEM HOVER EFFECT
// ================================

const gridItems = document.querySelectorAll('.grid-item, .gallery-item');

gridItems.forEach(item => {
    item.addEventListener('mouseenter', function(e) {
        const siblings = Array.from(this.parentElement.children);
        siblings.forEach(sibling => {
            if (sibling !== this) {
                sibling.style.opacity = '0.5';
            }
        });
    });

    item.addEventListener('mouseleave', function() {
        const siblings = Array.from(this.parentElement.children);
        siblings.forEach(sibling => {
            sibling.style.opacity = '1';
        });
    });
});

// ================================
// PRELOADER (OPTIONAL)
// ================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger initial animations
    const heroElements = document.querySelectorAll('.hero [data-scroll]');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 200);
    });

    // Initial parallax check to set correct state
    updateParallax();

    // Word-by-word reveal animation for hero intro
    const heroIntroText = document.querySelectorAll('.intro-text');
    if (heroIntroText.length > 0) {
        // Start after hero title animation (approx 0.2s delay + 1s duration = 1.2s total, but we want overlap)
        let baseDelay = 800; 

        heroIntroText.forEach(paragraph => {
            const text = paragraph.textContent.trim();
            const words = text.split(' ');
            
            paragraph.textContent = ''; // Clear original text
            
            words.forEach((word, index) => {
                const span = document.createElement('span');
                span.textContent = word + ' ';
                span.className = 'word-reveal';
                // Stagger each word by 50ms
                span.style.animationDelay = `${baseDelay}ms`;
                paragraph.appendChild(span);
                
                baseDelay += 50;
            });
            
            // Add a bigger pause between paragraphs
            baseDelay += 300; 
        });
    }
});

// ================================
// MOBILE MENU HANDLING
// ================================

const mobileBreakpoint = 768;

function handleResize() {
    if (window.innerWidth <= mobileBreakpoint) {
        // Mobile-specific adjustments
        document.body.classList.add('mobile');
    } else {
        document.body.classList.remove('mobile');
    }
}

window.addEventListener('resize', debounce(handleResize, 250));
handleResize(); // Initial check

// ================================
// VIDEO LAZY LOADING
// ================================

if (document.querySelector('.acting-page')) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const iframe = entry.target.querySelector('iframe');
            if (entry.isIntersecting && iframe) {
                // Video is in viewport
                iframe.style.opacity = '1';
            }
        });
    }, {
        rootMargin: '50px'
    });

    const videoWrappers = document.querySelectorAll('.video-wrapper');
    videoWrappers.forEach(wrapper => videoObserver.observe(wrapper));
}

// ================================
// KEYBOARD NAVIGATION
// ================================

document.addEventListener('keydown', (e) => {
    // ESC key to go back on acting page
    if (e.key === 'Escape' && document.querySelector('.acting-page')) {
        window.location.href = 'index.html';
    }
});

// ================================
// CONSOLE SIGNATURE
// ================================

console.log('%c Benita Kulabako Portfolio ', 'background: #0a0a0a; color: #ffffff; padding: 10px 20px; font-size: 16px; font-weight: bold;');
console.log('%c Built with modern web technologies ', 'background: #f5f5f5; color: #0a0a0a; padding: 5px 10px; font-size: 12px;');
