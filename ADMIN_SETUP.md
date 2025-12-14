# Admin Panel Setup Guide

Complete guide to setting up the portfolio admin panel with Cloudflare hosting.

## Overview

The admin panel allows you to:
- Upload and manage images
- Organize content by categories (Fashion, Beauty, Skincare, etc.)
- Assign brand names to images
- Store media in Cloudflare R2
- Update portfolio content without touching code

## Quick Start (Local Development)

1. **Access the Admin Panel**
   - Open `admin.html` in your browser
   - Or go to: `http://localhost:8000/admin.html`

2. **Login**
   - Default password: `admin123`
   - **IMPORTANT**: Change this immediately in Settings tab

3. **Upload Images**
   - Go to "Upload Media" tab
   - Drag & drop or click to browse
   - Select category and brand name
   - Click "Upload to Cloudflare"

## Cloudflare Deployment

### Prerequisites

- Cloudflare account (free tier works!)
- Cloudflare Pages or Workers account
- Basic terminal knowledge

### Step 1: Create Cloudflare R2 Bucket

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **R2 Object Storage**
3. Click **"Create Bucket"**
4. Name it: `portfolio-media` (or your choice)
5. Click **"Create Bucket"**

### Step 2: Enable Public Access

1. Open your bucket settings
2. Go to **Settings** tab
3. Under **Public Access**, click **"Allow Access"**
4. Copy the **Public Bucket URL** (looks like: `https://pub-xxxxx.r2.dev`)
5. Save this URL for later

### Step 3: Create API Token

1. Go to **My Profile** → **API Tokens**
2. Click **"Create Token"**
3. Use **"Edit Cloudflare Workers"** template
4. Add **R2** permissions:
   - Object Read
   - Object Write
   - Object Delete
5. Click **"Continue to Summary"**
6. Click **"Create Token"**
7. **COPY THE TOKEN** (you won't see it again!)

### Step 4: Deploy Cloudflare Worker

#### Option A: Using Wrangler CLI (Recommended)

1. **Install Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Create `wrangler.toml`**
   ```toml
   name = "portfolio-upload-api"
   main = "cloudflare-worker.js"
   compatibility_date = "2024-01-01"

   [[r2_buckets]]
   binding = "PORTFOLIO_BUCKET"
   bucket_name = "portfolio-media"

   [vars]
   PUBLIC_URL = "https://pub-xxxxx.r2.dev"
   ```

4. **Deploy**
   ```bash
   wrangler deploy
   ```

5. **Copy the Worker URL** (e.g., `https://portfolio-upload-api.your-subdomain.workers.dev`)

#### Option B: Using Dashboard

1. Go to **Workers & Pages** → **Create Application**
2. Click **"Create Worker"**
3. Name it: `portfolio-upload-api`
4. Paste the code from `cloudflare-worker.js`
5. Click **"Save and Deploy"**
6. Go to **Settings** → **Variables**
7. Add R2 bucket binding:
   - Variable name: `PORTFOLIO_BUCKET`
   - R2 bucket: `portfolio-media`
8. Add environment variable:
   - Variable name: `PUBLIC_URL`
   - Value: Your R2 public URL

### Step 5: Deploy Portfolio Site

#### Using Cloudflare Pages

1. Go to **Workers & Pages** → **Create Application**
2. Choose **"Pages"**
3. Connect to your **Git repository** (GitHub, GitLab)
4. Or use **Direct Upload**:
   ```bash
   wrangler pages deploy .
   ```

5. Your site will be live at: `https://your-project.pages.dev`

### Step 6: Configure Admin Panel

1. Open `https://your-project.pages.dev/admin.html`
2. Login with default password
3. Go to **Settings** tab
4. Fill in:
   - **Account ID**: Find in Cloudflare Dashboard URL
   - **Bucket Name**: `portfolio-media`
   - **API Token**: Token from Step 3
   - **Public URL**: R2 public URL from Step 2
5. Click **"Save Settings"**
6. Click **"Test Connection"** to verify

### Step 7: Update Admin Script for Production

Update `admin-script.js` to use your Worker API:

```javascript
// Replace the simulateUpload function with:
async function uploadToCloudflare(files, category, brand) {
    const WORKER_URL = 'https://portfolio-upload-api.your-subdomain.workers.dev';

    for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', category);
        formData.append('brand', brand);

        const response = await fetch(`${WORKER_URL}/upload`, {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        console.log('Uploaded:', result);
    }
}
```

## Security Best Practices

### 1. Change Default Password

1. Go to **Settings** tab
2. Enter new password (min 6 characters)
3. Click **"Update Password"**

### 2. Restrict Admin Access

Add to `admin.html` (inside `<head>`):

```html
<meta name="robots" content="noindex, nofollow">
```

### 3. Add IP Restrictions (Optional)

In Cloudflare Workers, add:

```javascript
const ALLOWED_IPS = ['YOUR_IP_ADDRESS'];

export default {
    async fetch(request, env) {
        const clientIP = request.headers.get('CF-Connecting-IP');
        if (!ALLOWED_IPS.includes(clientIP)) {
            return new Response('Forbidden', { status: 403 });
        }
        // ... rest of code
    }
}
```

## Using the Admin Panel

### Upload Images

1. **Upload Tab**
   - Drag and drop images
   - Select category (Fashion, Beauty, etc.)
   - Add brand name
   - Click "Upload to Cloudflare"

2. **Supported Formats**
   - JPG, JPEG
   - PNG
   - WebP
   - Max 10MB per file (configurable)

### Manage Content

1. **Manage Tab**
   - View all uploaded media
   - Filter by category
   - Copy image URLs
   - Delete images

2. **Using Images in Portfolio**
   - Click "Copy URL" on any image
   - Edit `index.html`
   - Replace placeholder with:
     ```html
     <div class="item-image" style="background-image: url('PASTE_URL_HERE'); background-size: cover; background-position: center;"></div>
     ```

### Categories Reference

- **Fashion**: Fashion brand collaborations
- **Beauty**: Hair & makeup content
- **Skincare**: Skincare products
- **Wellness**: Wellness & sport content
- **Home**: Home interior content
- **Gallery**: Photo gallery section
- **Acting**: Acting teaser image

## Troubleshooting

### "Upload Failed"
- Check Cloudflare settings are correct
- Verify R2 bucket exists
- Check API token has correct permissions
- Ensure Worker is deployed

### "Connection Test Failed"
- Account ID is in Cloudflare Dashboard URL
- Bucket name matches exactly
- API token is valid (not expired)

### Images Not Showing
- Check R2 bucket has public access enabled
- Verify Public URL is correct
- Check browser console for errors

### Can't Login
- Try default password: `admin123`
- Check browser console for errors
- Clear browser cache and cookies
- Reset by clearing localStorage

## Advanced Features

### Custom Domain

1. In Cloudflare Pages settings
2. Add custom domain
3. Update DNS records
4. Enable SSL

### Automatic Image Optimization

Cloudflare automatically optimizes images when using:
- Cloudflare Images (paid)
- Image Resizing (Workers plan)

### Backup Data

Export portfolio data:
```javascript
// In browser console:
exportPortfolioData();
```

## Cost Estimate

**Cloudflare Free Tier:**
- R2: 10GB storage free
- Workers: 100,000 requests/day free
- Pages: Unlimited static requests
- Total: **$0/month** for small portfolios

**Cloudflare Paid (if needed):**
- R2: $0.015/GB/month
- Workers: $5/month for more requests
- Images: $5/month (optional optimization)

## Support

For issues:
1. Check browser console for errors
2. Verify Cloudflare dashboard settings
3. Test Worker endpoint directly
4. Review R2 bucket access logs

## Next Steps

After setup:
1. Upload your portfolio images
2. Copy URLs to `index.html`
3. Test the live site
4. Share with clients!

---

**Security Note**: This admin panel stores credentials in localStorage. For production use with sensitive content, consider implementing:
- JWT authentication
- Server-side sessions
- OAuth integration
- Two-factor authentication
