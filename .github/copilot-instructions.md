# WhatsApp Marketing Landing Page

WhatsApp Marketing Landing Page is a modern, responsive static website built with pure HTML5, CSS3, and JavaScript that promotes WhatsApp marketing services for businesses.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

- **Serve the website locally**:
  - `cd /home/runner/work/watsap-marketing-landing/watsap-marketing-landing`
  - `python3 -m http.server 8000` -- starts immediately (< 2 seconds). Server runs on http://localhost:8000
  - Use `pkill -f "python3 -m http.server"` to stop the server
- **No build process required**: This is a pure static website with no compilation, bundling, or build steps needed
- **No dependencies**: The site uses vanilla HTML, CSS, and JavaScript with no external libraries or packages
- **No tests**: There are no automated tests in this repository
- **GitHub Pages deployment**: The site deploys directly from the main branch to GitHub Pages

## Validation

- **ALWAYS test the website manually** after making any changes by serving it locally and visiting http://localhost:8000
- **ALWAYS verify core user scenarios** after changes:
  1. Navigation links work and scroll smoothly to sections (Beneficios, Cómo Funciona, Precios, Contacto)
  2. WhatsApp buttons open wa.me links (floating button and hero section buttons)
  3. Page loads without console errors (some minor JavaScript errors are expected and do not affect functionality)
  4. Responsive design works on different screen sizes
  5. All animations and scroll effects function properly
- You can interact with the website UI via browser tools to test functionality completely
- Test the page by taking a screenshot to verify visual appearance
- **No linting required**: There are no linters or code quality tools configured
- **No CI/CD validation**: The repository has no GitHub workflows or automated checks

## Important Notes

- **JavaScript errors**: The site has minor JavaScript errors related to undefined elements (`Cannot read properties of undefined (reading 'style')`) but these do not impact core functionality
- **Analytics tracking**: The site includes placeholder analytics tracking that logs events to console
- **Static content**: All contact information, testimonials, and pricing are hardcoded in index.html
- **Icon system**: Uses Unicode emoji symbols as fallbacks for Font Awesome icons for better compatibility

## File Structure

```
/
├── index.html          # Main landing page (16.6KB)
├── style.css           # All styles and responsive design (14.9KB)  
├── script.js           # Interactive functionality and animations (12.2KB)
├── favicon.svg         # Site icon (758 bytes)
└── README.md           # Project documentation (4.3KB)
```

## Common Tasks

The following are outputs from frequently run commands. Reference them instead of viewing, searching, or running bash commands to save time.

### Repository root files
```
ls -la
total 72
drwxr-xr-x 3 runner docker  4096 Aug 28 02:57 .
drwxr-xr-x 3 runner docker  4096 Aug 28 02:57 ..
drwxr-xr-x 7 runner docker  4096 Aug 28 02:57 .git
-rw-r--r-- 1 runner docker  4290 Aug 28 02:57 README.md
-rw-r--r-- 1 runner docker   758 Aug 28 02:57 favicon.svg
-rw-r--r-- 1 runner docker 16632 Aug 28 02:57 index.html
-rw-r--r-- 1 runner docker 12174 Aug 28 02:57 script.js
-rw-r--r-- 1 runner docker 14876 Aug 28 02:57 style.css
```

### Website sections (from index.html)
- **Hero Section**: Main headline with WhatsApp chat mockup and CTA buttons
- **Benefits Section (#beneficios)**: 4 benefit cards with emoji icons  
- **How It Works Section (#como-funciona)**: 3-step process with numbered circles
- **Pricing Section (#precios)**: 3 pricing tiers (Free, Pro, Enterprise)
- **Testimonials Section (#testimonios)**: Customer reviews with star ratings
- **Footer Section**: Contact info, navigation links, social media, legal links
- **WhatsApp Floating Button**: Fixed position contact button

### Key CSS classes for styling
- `.hero`, `.benefits`, `.steps`, `.pricing`, `.testimonials` - main sections
- `.btn`, `.btn-primary`, `.btn-secondary` - button styles
- `.benefit-card`, `.pricing-card`, `.testimonial-card` - card components
- `.whatsapp-float` - floating WhatsApp button
- `.animate-element`, `.animate-in` - animation classes

### JavaScript functionality
- Smooth scrolling navigation between sections
- Intersection Observer for scroll animations
- Header scroll effect (adds 'scrolled' class)
- Analytics event tracking for button clicks
- Scroll progress indicator (dynamic progress bar)
- Mobile navigation toggle (no mobile menu toggle button exists in current HTML)
- WhatsApp link click tracking

## Customization Guide

- **Contact Information**: Edit WhatsApp numbers and email in index.html (search for "wa.me" and "mailto:")
- **Pricing Plans**: Modify pricing cards in the pricing section of index.html
- **Colors**: Update CSS variables in style.css `:root` section (--primary-color, --secondary-color, etc.)
- **Content**: All text content is in index.html - no external content management
- **Analytics**: Replace placeholder analytics code in script.js with actual tracking implementation

## Known Issues

- Minor JavaScript errors appear in console related to undefined DOM elements (non-functional impact)
- Mobile navigation toggle button styling exists but no toggle button in HTML
- Some external links (social media, legal pages) point to "#" placeholders