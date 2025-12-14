# Interactive Admin Panel Guide

Your portfolio now has a fully interactive content management system with drag-and-drop reordering!

## 🚀 Quick Start (3 Steps)

### 1. Access Admin Panel

```
Open: http://localhost:8000/admin.html
Login: admin123
```

### 2. Upload Images

- Go to **"Upload Media"** tab
- Drag & drop your images (or click to browse)
- Select category (Fashion, Beauty, etc.)
- Add brand name
- Click **"Upload to Cloudflare"**

### 3. Organize & Publish

- Go to **"Manage Content"** tab
- Select a category from dropdown
- **Drag and drop** images to reorder them
- First 3 images will show on the site
- Click **"Publish to Site"**
- Refresh main page to see changes!

**Note:** The main site shows placeholder images by default. When you publish content from the admin panel, your real images replace the placeholders automatically!

## ✨ Key Features

### 📸 Upload Tab
- **Drag & drop** multiple images at once
- **Preview** before uploading
- **Organize** by category
- **Brand names** for each image

### 🎨 Manage Tab
- **Visual grid** of all your images
- **Drag & drop** to reorder (just grab and move!)
- **Position badges** show order (1, 2, 3...)
- **Green badges** = shown on site
- **Gray badges** = not displayed (extras)
- **Live counter** shows how many images per category

### 📊 Category Limits

| Category | Max on Site |
|----------|-------------|
| Fashion | 3 images |
| Beauty | 3 images |
| Skincare | 3 images |
| Wellness & Sport | 3 images |
| Home Interior | 3 images |
| Gallery | 12 images |
| Acting Teaser | 1 image |

## 🎯 How to Use Drag & Drop Reordering

1. **Go to Manage Tab**
2. **Select a category** (e.g., "Fashion")
3. **Grab an image** (click and hold on the drag handle ⋮⋮)
4. **Drag** it to new position
5. **Drop** it where you want
6. **Order updates** automatically
7. **Click "Publish to Site"** when done

### Visual Feedback:
- **While dragging**: Image becomes semi-transparent
- **Hover over target**: Dashed border appears
- **Position badges**: Update immediately (1, 2, 3...)
- **Featured items**: Green badge (shown on site)
- **Extra items**: Gray badge + warning (not shown)

## 📱 Workflow Example

### Adding Fashion Content:

```
1. Upload Tab
   ├── Drop 5 fashion images
   ├── Category: "Fashion"
   ├── Brands: "Nike", "Adidas", "Chanel", "Gucci", "Prada"
   └── Upload

2. Manage Tab
   ├── Select "Fashion" category
   ├── See all 5 images with position badges
   ├── Drag your favorites to positions 1, 2, 3
   ├── Images 4-5 show gray badge (not displayed)
   └── Publish to Site

3. Main Site
   ├── Refresh index.html
   └── See your top 3 fashion images!
```

## 🎭 Managing Content

### Reorder Images
1. Select category
2. Drag images to reorder
3. First 3 show on site
4. Publish when satisfied

### Delete Images
1. Find image in grid
2. Click **"Delete"** button
3. Confirm deletion
4. Publish changes

### Copy Image URLs
1. Click **"Copy URL"** on any image
2. URL copied to clipboard
3. Use anywhere you need

## 🔄 Publishing Workflow

**IMPORTANT:** Changes only appear on site after clicking "Publish to Site"!

```
Upload → Organize → Publish → Refresh Site
```

### Before Publishing:
- Changes only in admin panel
- Test different orders
- Upload more images
- Delete unwanted images

### After Publishing:
- Changes saved to browser
- Main site loads new content
- Categories show your selected images
- Order matches your arrangement

## 💡 Pro Tips

### 1. Upload Strategy
- Upload MORE than 3 images per category
- Keep extras for rotation
- Test different combinations
- Easy to swap featured images

### 2. Organization
- Use clear brand names
- Upload high-quality images
- Keep consistent aspect ratios
- Update regularly

### 3. Reordering
- Drag by the handle (⋮⋮) for best control
- Watch position badges update
- Green = on site, Gray = backup
- Experiment with order before publishing

### 4. Quality Check
- Preview in manage tab
- Check image quality
- Verify brand names
- Test on mobile (resize browser)

## 🛠️ Technical Details

### Storage
- **Admin data**: Browser localStorage
- **Images**: Base64 encoded (or Cloudflare R2 when configured)
- **Published data**: `portfolio_published` key
- **Automatic**: No database needed!

### Performance
- Lazy loading
- Optimized drag & drop
- Fast reordering
- Instant preview

### Limits
- No cloud storage needed (uses browser)
- Works offline
- Instant updates
- Free forever!

## 🔐 Security

### Change Default Password
1. Settings tab
2. "Change Admin Password"
3. Enter new password (min 6 chars)
4. Save

### Best Practices
- Change password immediately
- Don't share admin URL
- Keep admin.html private
- Use strong password

## 🚨 Troubleshooting

### Images Not Showing on Site?
1. Check you clicked **"Publish to Site"**
2. Refresh the main page (Cmd/Ctrl + R)
3. Check browser console for errors
4. Verify images uploaded successfully

### Can't Drag Images?
1. Make sure you're in Manage tab
2. Select a category first
3. Grab the drag handle (⋮⋮)
4. Try different browser if issues persist

### Lost Changes?
1. Click "Publish to Site" to save
2. Unpublished changes stay in admin
3. Refresh admin panel to see latest

### Upload Failed?
1. Check image file type (JPG, PNG, WebP)
2. Try smaller images (< 5MB)
3. Check browser console for errors

## 📦 Next Steps

### For Local Use:
1. ✅ Upload your images
2. ✅ Organize by drag & drop
3. ✅ Publish to site
4. ✅ Share your portfolio!

### For Cloudflare Hosting:
1. See `ADMIN_SETUP.md` for deployment
2. Configure R2 bucket
3. Deploy Worker
4. Same workflow, cloud storage!

## 🎨 Example Workflow

**Monday**: Upload 10 fashion images
**Tuesday**: Drag favorites to top 3, publish
**Wednesday**: Upload beauty content
**Thursday**: Reorder fashion (new favorites), publish
**Friday**: Review all categories, final publish

Your site stays fresh and current!

## 🔗 Quick Links

- **Admin Panel**: `/admin.html`
- **Main Site**: `/index.html`
- **Password**: `admin123` (change it!)
- **Full Setup**: `ADMIN_SETUP.md`

---

**Have fun managing your portfolio! 🎉**

The admin panel gives you complete control over your content with an intuitive drag-and-drop interface. No code required!
