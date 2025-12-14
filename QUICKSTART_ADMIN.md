# Admin Panel - Quick Start

Get started with the admin panel in 5 minutes.

## Immediate Use (No Setup Required)

1. **Open Admin Panel**
   ```
   Open: admin.html in your browser
   Or: http://localhost:8000/admin.html
   ```

2. **Login**
   - Password: `admin123`
   - ⚠️ Change this in Settings tab immediately!

3. **Upload Your First Image**
   - Go to "Upload Media" tab
   - Drag & drop an image
   - Select category (e.g., "Fashion")
   - Add brand name (e.g., "Nike")
   - Click "Upload to Cloudflare"

4. **Get Image URL**
   - Go to "Manage Content" tab
   - Find your image
   - Click "Copy URL"
   - Paste into `index.html`

## Local Storage (Current Mode)

Right now, images are stored in your browser's localStorage. This means:
- ✅ Works immediately, no setup
- ✅ Perfect for testing
- ❌ Images stay in browser only
- ❌ Lost if you clear browser data

**For Production:** Follow full setup in `ADMIN_SETUP.md` to use Cloudflare R2.

## Quick Tips

### Change Password
1. Go to Settings tab
2. Enter new password
3. Click "Update Password"

### Organize by Category
- **Fashion**: Fashion brands
- **Beauty**: Hair & makeup
- **Skincare**: Skincare products
- **Wellness**: Sport & wellness
- **Home**: Interior design
- **Gallery**: General gallery
- **Acting**: Acting teaser image

### Use Uploaded Images

After uploading, copy the URL and update your HTML:

```html
<!-- Before -->
<div class="item-image"></div>

<!-- After -->
<div class="item-image" style="background-image: url('PASTE_URL_HERE'); background-size: cover; background-position: center;"></div>
```

## Production Deploy (Cloudflare)

When ready for production:

1. **Create Cloudflare R2 Bucket**
   - Go to Cloudflare Dashboard
   - R2 Object Storage → Create Bucket
   - Name: `portfolio-media`

2. **Deploy Worker**
   ```bash
   npm install -g wrangler
   wrangler login
   wrangler deploy
   ```

3. **Configure Admin**
   - Settings tab in admin panel
   - Add Account ID, Bucket Name, API Token
   - Save & Test Connection

**Full Guide:** See `ADMIN_SETUP.md`

## Troubleshooting

### Can't Login?
- Use password: `admin123`
- Clear browser cache
- Check browser console for errors

### Upload Not Working?
- For local: Works automatically
- For Cloudflare: Check Settings tab configuration

### Need Help?
- Read `ADMIN_SETUP.md` for detailed instructions
- Check browser console for errors
- Verify all settings are filled in

## Next Steps

1. ✅ Upload your portfolio images
2. ✅ Organize by category
3. ✅ Copy URLs to your HTML
4. 🚀 Deploy to Cloudflare (when ready)

---

**Quick Access URLs:**
- Admin Panel: `/admin.html`
- Main Site: `/index.html`
- Acting Page: `/acting.html`
