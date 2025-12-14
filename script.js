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
    const scrolled = window.pageYOffset;

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
            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle) {
                const titleSpeed = 0.8;
                const titlePos = -(scrolled * titleSpeed);
                heroTitle.style.transform = `translateY(${titlePos}px)`;
            }

            // Intro - medium speed (more dramatic)
            const heroIntro = document.querySelector('.hero-intro');
            if (heroIntro) {
                const introSpeed = 0.5;
                const introPos = -(scrolled * introSpeed);
                heroIntro.style.transform = `translateY(${introPos}px)`;
            }

            // Scroll indicator - fastest movement (floats up much faster)
            const scrollIndicator = document.querySelector('.scroll-indicator');
            if (scrollIndicator) {
                const indicatorSpeed = 1.2;
                const indicatorPos = -(scrolled * indicatorSpeed);
                scrollIndicator.style.transform = `translate(-50%, ${indicatorPos}px)`;

                // Fade out scroll indicator faster
                const opacity = Math.max(0, 1 - (scrolled / 200));
                scrollIndicator.style.opacity = opacity;
            }

            // More pronounced zoom effect
            const scale = 1 + (scrolled / heroHeight) * 0.2; // Zoom from 1 to 1.2
            heroSection.style.transform = `scale(${scale})`;

            // More noticeable opacity fade
            const heroOpacity = Math.max(0.2, 1 - (scrolled / heroHeight) * 0.8);
            heroSection.style.opacity = heroOpacity;
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
