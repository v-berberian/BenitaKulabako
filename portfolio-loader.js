// ================================
// PORTFOLIO DYNAMIC CONTENT LOADER
// ================================

const PORTFOLIO_STORAGE_KEY = 'portfolio_published';

// Load portfolio data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadPortfolioContent();
});

function loadPortfolioContent() {
    const publishedData = getPublishedData();

    if (!publishedData || Object.keys(publishedData).length === 0) {
        console.log('📝 No published content found. Use admin panel to upload and publish images.');
        return;
    }

    // Load categories (Fashion, Beauty, Skincare, Wellness, Home)
    loadCategory('fashion', publishedData.fashion || []);
    loadCategory('beauty', publishedData.beauty || []);
    loadCategory('skincare', publishedData.skincare || []);
    loadCategory('wellness', publishedData.wellness || []);
    loadCategory('home', publishedData.home || []);

    // Load gallery
    loadGallery(publishedData.gallery || []);

    // Load acting teaser
    loadActingTeaser(publishedData.acting || []);

    console.log('✅ Portfolio content loaded successfully');
}

function getPublishedData() {
    const data = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
}

function loadCategory(categoryName, items) {
    const categorySection = document.querySelector(`[data-category="${categoryName}"]`);
    if (!categorySection) {
        console.warn(`Category section not found: ${categoryName}`);
        return;
    }

    const gridContainer = categorySection.querySelector('.category-grid');
    if (!gridContainer) return;

    // Load up to 3 items
    const displayItems = items.slice(0, 3);

    // If no published content, keep the placeholders
    if (displayItems.length === 0) {
        console.log(`No published content for ${categoryName}, keeping placeholders`);
        return;
    }

    // Get existing grid items (placeholders)
    const existingItems = gridContainer.querySelectorAll('.grid-item');

    // Replace placeholders with actual content
    displayItems.forEach((item, index) => {
        if (existingItems[index]) {
            const imageDiv = existingItems[index].querySelector('.item-image');
            const brandP = existingItems[index].querySelector('.item-brand');

            if (imageDiv) {
                imageDiv.style.backgroundImage = `url('${item.url}')`;
                imageDiv.style.backgroundSize = 'cover';
                imageDiv.style.backgroundPosition = 'center';
            }

            if (brandP) {
                brandP.textContent = item.brand;
            }
        }
    });
}

function loadGallery(items) {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;

    const displayItems = items.slice(0, 12);

    // If no published content, keep the placeholders
    if (displayItems.length === 0) {
        console.log('No published content for gallery, keeping placeholders');
        return;
    }

    // Get existing gallery items (placeholders)
    const existingItems = galleryGrid.querySelectorAll('.gallery-item');

    // Replace placeholders with actual content
    displayItems.forEach((item, index) => {
        if (existingItems[index]) {
            const imageDiv = existingItems[index].querySelector('.gallery-image');
            const brandP = existingItems[index].querySelector('.gallery-brand');

            if (imageDiv) {
                imageDiv.style.backgroundImage = `url('${item.url}')`;
                imageDiv.style.backgroundSize = 'cover';
                imageDiv.style.backgroundPosition = 'center';
            }

            if (brandP) {
                brandP.textContent = item.brand;
            }
        } else {
            // If we have more items than placeholders, create new ones
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <div class="gallery-image" style="background-image: url('${item.url}'); background-size: cover; background-position: center;"></div>
                <p class="gallery-brand">${item.brand}</p>
            `;
            galleryGrid.appendChild(galleryItem);
        }
    });
}

function loadActingTeaser(items) {
    const actingImage = document.querySelector('.acting-image');
    if (!actingImage || items.length === 0) return;

    const firstItem = items[0];
    actingImage.style.backgroundImage = `url('${firstItem.url}')`;
    actingImage.style.backgroundSize = 'cover';
    actingImage.style.backgroundPosition = 'center';

    // Remove placeholder content
    const placeholder = actingImage.querySelector('.image-placeholder');
    if (placeholder) {
        placeholder.remove();
    }
}

// Export functions for manual reload if needed
window.reloadPortfolio = loadPortfolioContent;

console.log('📦 Portfolio loader initialized');
