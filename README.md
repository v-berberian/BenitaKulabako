# Benita Kulabako - Portfolio Website

A modern, minimal portfolio website for influencer and actress Benita Kulabako.

## Features

- **Super Modern Design**: Following 2024-2025 UI/UX trends
- **Minimal Aesthetic**: Clean, focused design with ample whitespace
- **Smooth Animations**: Scroll-triggered animations and transitions
- **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **Performance Optimized**: Fast loading with lazy loading and efficient code
- **Accessibility**: Keyboard navigation and reduced motion support

## File Structure

```
BenitaKulabako-CLAUDE/
├── index.html            # Main homepage
├── acting.html           # Acting portfolio page with videos
├── styles.css            # All styling and animations
├── script.js             # Interactive features and animations
├── admin.html            # Admin panel for content management
├── admin-styles.css      # Admin panel styling
├── admin-script.js       # Admin panel functionality
├── cloudflare-worker.js  # Cloudflare Worker for R2 uploads
├── wrangler.toml         # Cloudflare Worker configuration
├── ADMIN_SETUP.md        # Complete admin panel setup guide
└── README.md             # This file
```

## Sections

### Homepage (index.html)

1. **Hero Section**
   - Large bold title "BENITA KULABAKO"
   - Personal introduction
   - Scroll indicator

2. **Acting Teaser**
   - Clickable image linking to acting portfolio
   - Hover effects

3. **Content Categories** (5 sections)
   - Fashion
   - Beauty (hair + makeup)
   - Skincare
   - Wellness & Sport
   - Home Interior
   - Each with 3 example slots

4. **Photo Gallery**
   - Grid layout for brand collaborations
   - Hover animations

### Acting Portfolio (acting.html)

- 13 embedded YouTube videos showcasing commercial work
- Brands include: McDonald's, UNIBET, Brussels Airlines, Jupiler, and more
- Responsive video grid layout

## Admin Panel

A complete content management system for uploading and managing portfolio images.

**Quick Access:**
- Open `admin.html` in your browser
- Or visit: `http://localhost:8000/admin.html`
- Default password: `admin123` (change immediately!)

**Features:**
- Drag & drop image uploads
- Category organization (3 images per category)
- Drag & drop reordering (visual position badges)
- One-click publish to site
- Cloudflare R2 integration
- Media management dashboard
- Placeholders by default (replaced when you publish content)

**Full Setup Guide:** See `INTERACTIVE_ADMIN_GUIDE.md` for quick start or `ADMIN_SETUP.md` for Cloudflare deployment.

## How to Use

1. **Open the website**:
   - Simply open `index.html` in any modern web browser
   - No server or build process required

2. **Add Your Images**:
   Replace the placeholder backgrounds in the HTML:

   ```html
   <!-- Change this: -->
   <div class="item-image"></div>

   <!-- To this: -->
   <div class="item-image" style="background-image: url('path/to/your/image.jpg'); background-size: cover; background-position: center;"></div>
   ```

   Or add an `<img>` tag:

   ```html
   <div class="item-image">
       <img src="path/to/your/image.jpg" alt="Description">
   </div>
   ```

3. **Update Brand Names**:
   ```html
   <p class="item-brand">Your Brand Name</p>
   ```

4. **Customize the Acting Image**:
   In the acting teaser section, replace the placeholder with your photo:

   ```html
   <div class="acting-image" style="background-image: url('path/to/acting-photo.jpg'); background-size: cover; background-position: center;">
   ```

## Customization

### Colors

Edit the CSS variables in `styles.css` (lines 11-16):

```css
:root {
    --color-bg: #ffffff;           /* Background color */
    --color-text: #0a0a0a;         /* Main text color */
    --color-text-light: #6b6b6b;   /* Secondary text color */
    --color-accent: #0a0a0a;       /* Accent color */
    --color-border: #e5e5e5;       /* Border color */
}
```

### Typography

The site uses **Inter** font from Google Fonts. To use INTEGRAL-EB as suggested:

1. Upload the INTEGRAL-EB font files to your project
2. Add to `styles.css`:

```css
@font-face {
    font-family: 'Integral';
    src: url('path/to/integral-eb.woff2') format('woff2');
    font-weight: 900;
}

.hero-title {
    font-family: 'Integral', sans-serif;
}
```

### Spacing

Adjust spacing variables in `styles.css`:

```css
--spacing-xs: 1rem;
--spacing-sm: 2rem;
--spacing-md: 4rem;
--spacing-lg: 6rem;
--spacing-xl: 8rem;
```

## Modern Features Implemented

1. **Scroll Animations**: Elements fade in as you scroll
2. **Hero Parallax Effect**: Multi-layer parallax scrolling on hero section
   - Title, intro, and scroll indicator move at different speeds
   - Subtle zoom and fade effects as you scroll down
   - Scroll indicator fades out naturally
3. **Hover Effects**: Interactive feedback on all clickable elements
4. **Smooth Transitions**: Polished animations throughout
5. **Responsive Grid**: Adapts to any screen size
6. **Lazy Loading**: Optimized performance for images and videos
7. **Keyboard Navigation**: ESC key returns to homepage from acting page
8. **Reduced Motion**: Respects user accessibility preferences

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Tips for Adding Content

### Adding More Gallery Items

```html
<div class="gallery-item">
    <div class="gallery-image" style="background-image: url('image.jpg'); background-size: cover; background-position: center;"></div>
    <p class="gallery-brand">Brand Name</p>
</div>
```

### Adding More Acting Videos

```html
<div class="work-item" data-scroll>
    <div class="video-wrapper">
        <iframe
            src="https://www.youtube.com/embed/VIDEO_ID"
            title="Video Title"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
        </iframe>
    </div>
    <h3 class="work-title">Brand Name</h3>
</div>
```

## Deployment

To publish your website:

1. **GitHub Pages** (Free):
   - Create a GitHub repository
   - Upload all files
   - Enable GitHub Pages in settings

2. **Netlify** (Free):
   - Drag and drop the folder to Netlify
   - Get instant hosting

3. **Vercel** (Free):
   - Connect your GitHub repository
   - Auto-deploy on changes

## Support

For questions or customization help, refer to:
- HTML/CSS documentation: [MDN Web Docs](https://developer.mozilla.org)
- YouTube embed guide: [YouTube IFrame API](https://developers.google.com/youtube/iframe_api_reference)

---

Built with modern web technologies for optimal performance and user experience.
