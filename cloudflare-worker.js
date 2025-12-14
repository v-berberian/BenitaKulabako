// ================================
// CLOUDFLARE WORKER FOR R2 UPLOADS
// ================================

// This worker handles image uploads to Cloudflare R2
// Deploy this to Cloudflare Workers and bind your R2 bucket

export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        // Handle CORS
        if (request.method === 'OPTIONS') {
            return handleCORS();
        }

        // Upload endpoint
        if (url.pathname === '/upload' && request.method === 'POST') {
            return handleUpload(request, env);
        }

        // List media endpoint
        if (url.pathname === '/media' && request.method === 'GET') {
            return handleListMedia(request, env);
        }

        // Delete endpoint
        if (url.pathname === '/delete' && request.method === 'DELETE') {
            return handleDelete(request, env);
        }

        return new Response('Not Found', { status: 404 });
    }
};

// ================================
// UPLOAD HANDLER
// ================================

async function handleUpload(request, env) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');
        const category = formData.get('category');
        const brand = formData.get('brand');

        if (!file) {
            return jsonResponse({ error: 'No file provided' }, 400);
        }

        // Generate unique filename
        const timestamp = Date.now();
        const extension = file.name.split('.').pop();
        const filename = `${category}/${timestamp}-${sanitizeFilename(brand)}.${extension}`;

        // Upload to R2
        await env.PORTFOLIO_BUCKET.put(filename, file.stream(), {
            httpMetadata: {
                contentType: file.type,
            },
            customMetadata: {
                category: category,
                brand: brand,
                uploadedAt: new Date().toISOString()
            }
        });

        // Get public URL
        const publicUrl = `${env.PUBLIC_URL}/${filename}`;

        return jsonResponse({
            success: true,
            url: publicUrl,
            filename: filename,
            category: category,
            brand: brand
        });

    } catch (error) {
        console.error('Upload error:', error);
        return jsonResponse({ error: error.message }, 500);
    }
}

// ================================
// LIST MEDIA HANDLER
// ================================

async function handleListMedia(request, env) {
    try {
        const url = new URL(request.url);
        const category = url.searchParams.get('category');

        const options = category ? { prefix: `${category}/` } : {};
        const listed = await env.PORTFOLIO_BUCKET.list(options);

        const media = await Promise.all(
            listed.objects.map(async (obj) => {
                const metadata = obj.customMetadata || {};
                return {
                    filename: obj.key,
                    url: `${env.PUBLIC_URL}/${obj.key}`,
                    category: metadata.category || 'unknown',
                    brand: metadata.brand || 'Unnamed',
                    uploadedAt: metadata.uploadedAt || obj.uploaded,
                    size: obj.size
                };
            })
        );

        return jsonResponse({ media });

    } catch (error) {
        console.error('List error:', error);
        return jsonResponse({ error: error.message }, 500);
    }
}

// ================================
// DELETE HANDLER
// ================================

async function handleDelete(request, env) {
    try {
        const { filename } = await request.json();

        if (!filename) {
            return jsonResponse({ error: 'No filename provided' }, 400);
        }

        await env.PORTFOLIO_BUCKET.delete(filename);

        return jsonResponse({ success: true });

    } catch (error) {
        console.error('Delete error:', error);
        return jsonResponse({ error: error.message }, 500);
    }
}

// ================================
// HELPER FUNCTIONS
// ================================

function handleCORS() {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    });
}

function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    });
}

function sanitizeFilename(filename) {
    return filename
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}
