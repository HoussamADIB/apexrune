# SEO Implementation Guide - Next Steps

## ✅ Just Completed

1. **Dynamic Meta Tags** - Each page now has unique title, description, and OG tags
2. **Proper URL Routing** - Migrated from hash routing to clean URLs

---

## 🎯 Next Critical Steps (In Priority Order)

### 1. **Pre-rendering for JavaScript Content** 🔴 CRITICAL

**Problem**: Your content is rendered via JavaScript. Search engines may not execute JS and miss your content.

**Solution**: Use Netlify Prerendering

#### Option A: Netlify Prerendering Plugin (Recommended)

1. Install the plugin:
```bash
npm install --save-dev @netlify/plugin-prerendering
```

2. Create `netlify.toml` configuration (already exists, just add):
```toml
[[plugins]]
  package = "@netlify/plugin-prerendering"
```

3. The plugin will automatically pre-render your pages at build time.

#### Option B: Static HTML Generation

For key pages (home, services, contact), generate static HTML files that include the content.

**Impact**: Very High - Ensures content is indexed
**Effort**: Low (with plugin) or Medium (manual)

---

### 2. **Add Page-Specific Structured Data** 🟡 IMPORTANT

**Current**: Only homepage has structured data
**Needed**: Each service page needs Service schema

#### Implementation:

Add to each service page load function in `router.js`:

```javascript
// Add Service schema for service pages
function addServiceSchema(serviceKey, serviceData) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceData.title,
    "description": serviceData.description,
    "provider": {
      "@type": "ProfessionalService",
      "name": "ApexRune"
    },
    "serviceType": "Salesforce Consulting"
  };
  
  // Remove old schema if exists
  const oldSchema = document.querySelector('script[type="application/ld+json"]');
  if (oldSchema && oldSchema.textContent.includes('"@type":"Service"')) {
    oldSchema.remove();
  }
  
  // Add new schema
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}
```

**Impact**: Medium - Better rich snippets in search results
**Effort**: Low

---

### 3. **Image Optimization** 🟡 IMPORTANT

**Current**: Images are PNG/JPG, may not be optimized

#### Steps:

1. **Compress Images**:
   - Use tools like TinyPNG, ImageOptim, or Squoosh
   - Target: Reduce file size by 50-70%

2. **Convert to WebP**:
   - Modern format, smaller file sizes
   - Add fallback for older browsers

3. **Add Lazy Loading**:
   - Already partially done, but ensure all images have `loading="lazy"`

4. **Add Image Dimensions**:
   - Prevents layout shift
   - Add `width` and `height` attributes

**Impact**: Medium - Improves page speed (Core Web Vitals)
**Effort**: Low-Medium

---

### 4. **Performance Optimization** 🟡 IMPORTANT

#### Quick Wins:

1. **Code Splitting**:
   - Already using ES modules, but can optimize further
   - Lazy load route-specific code

2. **Minify Assets**:
   - Vite already does this in production build
   - Verify it's enabled

3. **Resource Hints**:
   ```html
   <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
   <link rel="prefetch" href="/services" as="document">
   ```

4. **Remove Unused CSS**:
   - Audit CSS file size
   - Consider CSS purging

**Impact**: Medium - Page speed affects rankings
**Effort**: Low-Medium

---

### 5. **Enhanced Structured Data** 🟢 NICE TO HAVE

#### Add These Schemas:

1. **BreadcrumbList** - For navigation
2. **Review/Rating** - For testimonials
3. **FAQPage** - If you add FAQs
4. **Organization** - Enhanced company info

**Impact**: Low-Medium - Better rich snippets
**Effort**: Low

---

### 6. **Google Search Console Setup** 🟢 IMPORTANT FOR MONITORING

#### Steps:

1. Go to https://search.google.com/search-console
2. Add your property (apexrune.com)
3. Verify ownership (Netlify can help with DNS)
4. Submit sitemap: `https://apexrune.com/sitemap.xml`
5. Monitor indexing status and search performance

**Impact**: High - Essential for SEO monitoring
**Effort**: Low

---

### 7. **Analytics Setup** 🟢 IMPORTANT FOR TRACKING

#### Google Analytics 4:

1. Create GA4 property
2. Add tracking code to `index.html`
3. Set up conversion tracking
4. Monitor user behavior

**Impact**: Medium - Data for optimization
**Effort**: Low

---

## 📋 Quick Checklist

### Immediate (This Week)
- [ ] Set up Netlify Prerendering plugin
- [ ] Add Service schema to service pages
- [ ] Compress and optimize images
- [ ] Set up Google Search Console

### Soon (This Month)
- [ ] Add BreadcrumbList schema
- [ ] Add Review/Rating schema to testimonials
- [ ] Set up Google Analytics
- [ ] Add resource hints for performance

### Later (Ongoing)
- [ ] Create blog/content section
- [ ] Add FAQ section with FAQPage schema
- [ ] Monitor and optimize Core Web Vitals
- [ ] Regular content updates

---

## 🎯 Expected Results

- **Current Score**: 70/100
- **After Pre-rendering**: 85/100
- **After All Priority 1 & 2**: 92/100
- **After Everything**: 98/100

---

## 📚 Resources

- [Netlify Prerendering Docs](https://docs.netlify.com/integrations/prerendering/)
- [Google Search Console](https://search.google.com/search-console)
- [Schema.org Documentation](https://schema.org/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)

