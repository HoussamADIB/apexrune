# Schema Maintenance Guide

## Overview
This site uses **Service Schema** and **Breadcrumb Schema** to help search engines understand your content. Both are automatically generated and updated when you add new pages.

## What's Implemented

### ✅ Service Schema
- **Where**: Automatically added to all `/service/*` pages
- **What it does**: Tells Google about your services for rich snippets
- **Current services**: Custom Development, System Integration, Health Checks, Process Automation

### ✅ Breadcrumb Schema
- **Where**: Automatically added to ALL pages (except home)
- **What it does**: Shows navigation hierarchy in Google search results
- **Works for**: Services, Blog posts, Case studies, Contact, Legal pages, etc.

## How It Works

### Automatic Updates
Both schemas are **automatically generated** based on:
- **URL path** - Determines breadcrumb structure
- **Service data** - Pulls from `services.js` for service pages
- **Blog data** - Pulls from `blog.js` for blog posts

### No Manual Work Required
When you add a new page, the schema updates automatically:
- ✅ New service page → Service Schema added automatically
- ✅ New blog post → Breadcrumb Schema includes it automatically
- ✅ New case study → Breadcrumb Schema includes it automatically

## Adding New Pages

### Adding a New Service
1. Add service data to `web-app/src/services.js`
2. Add route in `web-app/src/router.js`
3. **Service Schema will be added automatically** ✅

### Adding a New Blog Post
1. Add post data to `web-app/src/blog.js`
2. **Breadcrumb Schema will include it automatically** ✅

### Adding a New Page Type
If you add a completely new page type (e.g., `/resources`):

1. **Update Breadcrumb Schema** (in `seo.js`):
   ```javascript
   const pathNameMap = {
     // ... existing mappings ...
     'resources': 'Resources',  // Add this
   };
   ```

2. **That's it!** Breadcrumb Schema will automatically work for all pages under `/resources/*`

## File Locations

- **Schema Functions**: `web-app/src/seo.js`
  - `addServiceSchema()` - Adds Service Schema
  - `addBreadcrumbSchema()` - Adds Breadcrumb Schema
  - `updateMetaTags()` - Calls both functions automatically

- **Service Data**: `web-app/src/services.js`
- **Blog Data**: `web-app/src/blog.js`

## Testing

To verify schemas are working:
1. Open any page (e.g., `/service/custom-development`)
2. Open browser DevTools → Elements
3. Look in `<head>` for `<script type="application/ld+json">` tags
4. You should see:
   - Breadcrumb Schema (on all pages except home)
   - Service Schema (on service pages only)

## Google Testing Tools

Test your schemas with:
- **Rich Results Test**: https://search.google.com/test/rich-results
- **Schema Markup Validator**: https://validator.schema.org/

## Notes

- ✅ Schemas are **invisible** to users (only search engines see them)
- ✅ They **don't affect** your site's appearance
- ✅ They **automatically update** when you add new pages
- ✅ They **improve SEO** and search result appearance

---

**Last Updated**: January 17, 2025

