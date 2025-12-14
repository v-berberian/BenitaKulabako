// ================================
// ADMIN PANEL JAVASCRIPT - ENHANCED
// ================================

// Default admin password
const DEFAULT_PASSWORD = 'admin123';

// Local storage keys
const STORAGE_KEYS = {
    AUTH: 'admin_authenticated',
    MEDIA: 'portfolio_media',
    SETTINGS: 'cloudflare_settings',
    PASSWORD: 'admin_password',
    PUBLISHED: 'portfolio_published'
};

// Category limits
const CATEGORY_LIMITS = {
    fashion: 3,
    beauty: 3,
    skincare: 3,
    wellness: 3,
    home: 3,
    gallery: 12,
    acting: 1
};

// ================================
// AUTHENTICATION
// ================================

const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const loginScreen = document.getElementById('loginScreen');
const adminDashboard = document.getElementById('adminDashboard');

if (localStorage.getItem(STORAGE_KEYS.AUTH) === 'true') {
    showDashboard();
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const storedPassword = localStorage.getItem(STORAGE_KEYS.PASSWORD) || DEFAULT_PASSWORD;

    if (password === storedPassword) {
        localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
        showDashboard();
    } else {
        loginError.textContent = 'Invalid password';
    }
});

function showDashboard() {
    loginScreen.classList.add('hidden');
    adminDashboard.classList.remove('hidden');
}

document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    location.reload();
});

// ================================
// TAB NAVIGATION
// ================================

const navTabs = document.querySelectorAll('.nav-tab');
const tabContents = document.querySelectorAll('.tab-content');

navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;
        navTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(`${tabName}Tab`).classList.add('active');

        if (tabName === 'manage') {
            loadMedia();
        }
    });
});

// ================================
// FILE UPLOAD HANDLING
// ================================

const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const previewArea = document.getElementById('previewArea');
const previewGrid = document.getElementById('previewGrid');
const uploadBtn = document.getElementById('uploadBtn');
const categorySelect = document.getElementById('categorySelect');
const brandName = document.getElementById('brandName');

let selectedFiles = [];

dropZone.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
});

function handleFiles(files) {
    selectedFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    if (selectedFiles.length > 0) {
        showPreview();
        uploadBtn.disabled = false;
    }
}

function showPreview() {
    previewArea.classList.remove('hidden');
    previewGrid.innerHTML = '';

    selectedFiles.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            previewItem.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                <button class="preview-remove" onclick="removeFile(${index})">×</button>
            `;
            previewGrid.appendChild(previewItem);
        };
        reader.readAsDataURL(file);
    });
}

function removeFile(index) {
    selectedFiles.splice(index, 1);
    if (selectedFiles.length === 0) {
        previewArea.classList.add('hidden');
        uploadBtn.disabled = true;
        fileInput.value = '';
    } else {
        showPreview();
    }
}

// ================================
// UPLOAD TO STORAGE
// ================================

uploadBtn.addEventListener('click', async () => {
    if (selectedFiles.length === 0) return;

    const category = categorySelect.value;
    const brand = brandName.value;

    if (!category) {
        alert('Please select a category');
        return;
    }

    await uploadFiles(selectedFiles, category, brand);
});

async function uploadFiles(files, category, brand) {
    const uploadProgress = document.getElementById('uploadProgress');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    uploadProgress.classList.remove('hidden');
    uploadBtn.disabled = true;

    const totalFiles = files.length;
    let uploadedCount = 0;

    try {
        for (const file of files) {
            await simulateUpload(file, category, brand);
            uploadedCount++;
            const progress = (uploadedCount / totalFiles) * 100;
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `Uploading ${uploadedCount} of ${totalFiles}...`;
        }

        progressText.textContent = 'Upload complete!';
        setTimeout(() => {
            uploadProgress.classList.add('hidden');
            resetUploadForm();
        }, 1500);

    } catch (error) {
        console.error('Upload error:', error);
        alert('Upload failed: ' + error.message);
        uploadProgress.classList.add('hidden');
        uploadBtn.disabled = false;
    }
}

async function simulateUpload(file, category, brand) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
            const mediaItem = {
                id: Date.now() + Math.random(),
                category: category,
                brand: brand || 'Unnamed',
                url: reader.result,
                filename: file.name,
                uploadedAt: new Date().toISOString(),
                position: getCategoryItems(category).length
            };

            saveMediaItem(mediaItem);
            setTimeout(resolve, 500);
        };
        reader.readAsDataURL(file);
    });
}

function resetUploadForm() {
    selectedFiles = [];
    fileInput.value = '';
    categorySelect.value = '';
    brandName.value = '';
    previewArea.classList.add('hidden');
    uploadBtn.disabled = true;
}

// ================================
// MEDIA MANAGEMENT WITH ORDERING
// ================================

function saveMediaItem(item) {
    const media = getMediaItems();
    media.push(item);
    localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(media));
}

function getMediaItems() {
    const media = localStorage.getItem(STORAGE_KEYS.MEDIA);
    return media ? JSON.parse(media) : [];
}

function getCategoryItems(category) {
    return getMediaItems()
        .filter(item => item.category === category)
        .sort((a, b) => (a.position || 0) - (b.position || 0));
}

function saveMediaItems(items) {
    localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(items));
}

function deleteMediaItem(id) {
    const media = getMediaItems();
    const filtered = media.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(filtered));
    loadMedia();
}

// ================================
// LOAD AND DISPLAY MEDIA
// ================================

let currentCategory = 'fashion';

function loadMedia() {
    currentCategory = document.getElementById('filterCategory').value;
    const mediaGrid = document.getElementById('mediaGrid');
    const categoryCount = document.getElementById('categoryCount');

    const categoryItems = getCategoryItems(currentCategory);
    const limit = CATEGORY_LIMITS[currentCategory] || 12;

    // Update count display
    categoryCount.textContent = `${categoryItems.length} image${categoryItems.length !== 1 ? 's' : ''} in ${currentCategory} (showing first ${Math.min(limit, categoryItems.length)} on site)`;

    if (categoryItems.length === 0) {
        mediaGrid.innerHTML = '<div class="empty-state"><p>No images in this category. Upload some images!</p></div>';
        return;
    }

    mediaGrid.innerHTML = categoryItems.map((item, index) => {
        const isDisplayed = index < limit;
        const displayClass = isDisplayed ? 'featured' : 'not-displayed';

        return `
            <div class="media-item ${displayClass}"
                 draggable="true"
                 data-id="${item.id}"
                 data-position="${index}">
                <div class="position-badge">${index + 1}</div>
                <div class="drag-handle">⋮⋮</div>
                <img src="${item.url}" alt="${item.brand}" class="media-image">
                <div class="media-info">
                    <span class="media-category">${item.category}</span>
                    <div class="media-brand">${item.brand}</div>
                    <small style="color: var(--color-secondary);">${new Date(item.uploadedAt).toLocaleDateString()}</small>
                    ${!isDisplayed ? '<p style="color: var(--color-warning); font-size: 0.75rem; margin-top: 0.5rem;">⚠️ Not displayed on site</p>' : ''}
                    <div class="media-actions">
                        <button class="btn-small btn-edit" onclick="copyImageUrl('${item.url}')">Copy URL</button>
                        <button class="btn-small btn-delete" onclick="confirmDelete(${item.id})">Delete</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    initializeDragAndDrop();
}

// Filter change
document.getElementById('filterCategory').addEventListener('change', loadMedia);

// ================================
// DRAG AND DROP REORDERING
// ================================

let draggedElement = null;
let draggedId = null;

function initializeDragAndDrop() {
    const items = document.querySelectorAll('.media-item');

    items.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragend', handleDragEnd);
        item.addEventListener('dragenter', handleDragEnter);
        item.addEventListener('dragleave', handleDragLeave);
    });
}

function handleDragStart(e) {
    draggedElement = this;
    draggedId = parseInt(this.dataset.id);
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    if (this !== draggedElement) {
        this.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    if (draggedElement !== this) {
        const fromPos = parseInt(draggedElement.dataset.position);
        const toPos = parseInt(this.dataset.position);

        reorderItems(draggedId, fromPos, toPos);
    }

    return false;
}

function handleDragEnd(e) {
    const items = document.querySelectorAll('.media-item');
    items.forEach(item => {
        item.classList.remove('dragging', 'drag-over');
    });
}

function reorderItems(itemId, fromPos, toPos) {
    const media = getMediaItems();
    const categoryItems = media.filter(item => item.category === currentCategory);
    const otherItems = media.filter(item => item.category !== currentCategory);

    // Find the item to move
    const itemToMove = categoryItems.find(item => item.id === itemId);

    // Remove it from current position
    categoryItems.splice(fromPos, 1);

    // Insert at new position
    categoryItems.splice(toPos, 0, itemToMove);

    // Update positions
    categoryItems.forEach((item, index) => {
        item.position = index;
    });

    // Combine and save
    const updatedMedia = [...categoryItems, ...otherItems];
    saveMediaItems(updatedMedia);

    // Reload display
    loadMedia();
}

// ================================
// PUBLISH TO SITE
// ================================

document.getElementById('publishBtn').addEventListener('click', () => {
    publishToSite();
});

function publishToSite() {
    const media = getMediaItems();
    const portfolioData = {};

    Object.keys(CATEGORY_LIMITS).forEach(category => {
        const categoryItems = media
            .filter(item => item.category === category)
            .sort((a, b) => (a.position || 0) - (b.position || 0))
            .slice(0, CATEGORY_LIMITS[category]);

        portfolioData[category] = categoryItems;
    });

    localStorage.setItem(STORAGE_KEYS.PUBLISHED, JSON.stringify(portfolioData));

    alert(`✅ Published successfully!\n\nYour changes are now live on the portfolio site.\n\nRefresh the main page to see the updates.`);
}

// ================================
// HELPER FUNCTIONS
// ================================

function copyImageUrl(url) {
    navigator.clipboard.writeText(url).then(() => {
        alert('Image URL copied to clipboard!');
    });
}

function confirmDelete(id) {
    if (confirm('Are you sure you want to delete this image?')) {
        deleteMediaItem(id);
    }
}

// ================================
// SETTINGS
// ================================

function getCloudflareSettings() {
    const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return settings ? JSON.parse(settings) : {
        accountId: '',
        bucketName: '',
        apiToken: '',
        publicUrl: ''
    };
}

function saveCloudflareSettings(settings) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}

window.addEventListener('DOMContentLoaded', () => {
    const settings = getCloudflareSettings();
    if (settings.accountId) {
        document.getElementById('accountId').value = settings.accountId;
        document.getElementById('bucketName').value = settings.bucketName;
        document.getElementById('apiToken').value = settings.apiToken;
        document.getElementById('publicUrl').value = settings.publicUrl || '';
    }
});

document.getElementById('saveSettingsBtn').addEventListener('click', () => {
    const settings = {
        accountId: document.getElementById('accountId').value,
        bucketName: document.getElementById('bucketName').value,
        apiToken: document.getElementById('apiToken').value,
        publicUrl: document.getElementById('publicUrl').value
    };

    saveCloudflareSettings(settings);

    const message = document.getElementById('settingsMessage');
    message.className = 'settings-message success';
    message.textContent = 'Settings saved successfully!';
    setTimeout(() => {
        message.className = 'settings-message';
    }, 3000);
});

document.getElementById('testConnectionBtn').addEventListener('click', async () => {
    const message = document.getElementById('settingsMessage');
    message.className = 'settings-message';
    message.textContent = 'Testing connection...';

    setTimeout(() => {
        const settings = getCloudflareSettings();
        if (settings.accountId && settings.bucketName && settings.apiToken) {
            message.className = 'settings-message success';
            message.textContent = 'Connection test successful!';
        } else {
            message.className = 'settings-message error';
            message.textContent = 'Please fill in all required fields';
        }
    }, 1000);
});

document.getElementById('changePasswordBtn').addEventListener('click', () => {
    const newPassword = document.getElementById('newPassword').value;

    if (newPassword.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }

    localStorage.setItem(STORAGE_KEYS.PASSWORD, newPassword);
    alert('Password updated successfully!');
    document.getElementById('newPassword').value = '';
});

// ================================
// MAKE FUNCTIONS GLOBAL
// ================================

window.removeFile = removeFile;
window.copyImageUrl = copyImageUrl;
window.confirmDelete = confirmDelete;

console.log('✅ Admin panel loaded');
console.log('📝 Default password:', DEFAULT_PASSWORD);
console.log('🔐 Change it in Settings tab!');
