# Contact Form Implementation Guide

This document describes how the contact form is implemented using Netlify Forms in our SPA (Single Page Application).

## Overview

We use Netlify Forms to handle form submissions without requiring a backend server. The form works in two contexts:
1. **Contact Page** (`/contact`) - Full page form
2. **Contact Modal** - Popup form accessible from various pages

## Implementation Details

### 1. Hidden Form in HTML (Required by Netlify)

Netlify detects forms by parsing static HTML at build time. Since our forms are rendered client-side with JavaScript, we include a hidden form in `index.html`:

**Location:** `web-app/index.html` (lines 96-120)

```html
<form name="contact" netlify netlify-honeypot="bot-field" hidden>
  <input type="hidden" name="form-name" value="contact" />
  <!-- All possible form fields must be included here -->
  <input type="text" name="name" />
  <input type="text" name="firstName" />
  <input type="text" name="lastName" />
  <input type="email" name="email" />
  <input type="text" name="company" />
  <select name="serviceInterest">...</select>
  <textarea name="message"></textarea>
  <select name="urgency">...</select>
  <input type="text" name="bot-field" />
</form>
```

**Important:** All fields that can be submitted must be present in this hidden form with matching `name` attributes.

### 2. JavaScript-Rendered Forms

#### Contact Page Form
**Location:** `web-app/src/router/pages/contact.js`

The contact page form is rendered dynamically and includes:
- Single `name` field (for contact page)
- `email`, `company`, `serviceInterest`, `message` fields
- Form handler: `handleContactPageFormSubmit()`

#### Contact Modal Form
**Location:** `web-app/src/contact-form.js`

The modal form includes:
- `firstName` and `lastName` fields (separate)
- `email`, `company`, `serviceInterest`, `message`, `urgency` fields
- Form handler: `handleFormSubmit()`

### 3. AJAX Form Submission

Both forms use AJAX to submit to Netlify Forms. The implementation follows Netlify's requirements:

```javascript
const formData = new FormData(form);

// Ensure form-name is set
if (!formData.has('form-name')) {
  formData.set('form-name', 'contact');
}

const response = await fetch(submitPath, {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  },
  body: new URLSearchParams(formData).toString(),
  redirect: 'follow'
});
```

**Key Requirements Met:**
- ✅ URL-encoded body using `URLSearchParams`
- ✅ `Content-Type: application/x-www-form-urlencoded` header
- ✅ Hidden `form-name` input included
- ✅ POST request to site root or current path

### 4. Success/Error Handling

#### Success Response
Netlify Forms returns:
- Status `200` (OK) for successful submissions
- Status `301`, `302`, or `303` (redirects) - also treated as success

On success, we show a custom success message instead of redirecting.

#### Error Handling
- Network errors are detected and shown with specific messaging
- HTTP errors (422, 404, etc.) are logged with details
- Users can retry without page reload
- Error messages include contact email for direct contact

### 5. Form Detection

**To verify form detection:**
1. Deploy your site to Netlify
2. Go to Netlify Dashboard → Forms
3. You should see a form named "contact" listed

**If form is not detected:**
- Ensure `data-netlify="true"` or `netlify` attribute is in the hidden form
- Verify all fields in hidden form match JavaScript-rendered form fields
- Check that form detection is enabled in Netlify dashboard
- Redeploy after making changes

### 6. Spam Protection

We use Netlify's honeypot field:
- Hidden field named `bot-field`
- If filled, submission is silently rejected
- Included in both hidden form and JavaScript forms

### 7. Troubleshooting

#### Form submissions not appearing in Netlify dashboard:
1. Check "Spam submissions" tab - test submissions often get flagged
2. Verify form detection is enabled in Netlify dashboard
3. Ensure hidden form includes all fields with matching names
4. Check browser console for submission errors
5. Verify network request returns 200 status

#### Form submission returns error:
1. Check browser console for detailed error logs
2. Verify `form-name` hidden input is present
3. Ensure Content-Type header is set correctly
4. Check that all required fields have `name` attributes
5. Verify form fields match between hidden form and JavaScript form

#### Common Issues:
- **Field name mismatch**: Hidden form field names must exactly match JavaScript form field names
- **Missing form-name**: Must include `<input type="hidden" name="form-name" value="contact" />`
- **Redirect issues**: If using SPA routing, ensure form posts to a path that doesn't redirect
- **CORS errors**: Should not occur with Netlify Forms, but check if using custom domain

### 8. Testing

**To test form submission:**
1. Fill out the form with realistic data (not `test@test.com`)
2. Submit the form
3. Check browser console for "Form submission response" log
4. Check Netlify dashboard → Forms → Submissions
5. If not visible, check "Spam submissions" tab

**Best practices for test submissions:**
- Use real email addresses
- Write full sentences in textareas
- Avoid obvious test data
- Don't submit repeatedly from same IP

## File Structure

```
web-app/
├── index.html                    # Hidden form for Netlify detection
├── src/
│   ├── contact-form.js          # Modal form implementation
│   └── router/
│       └── pages/
│           └── contact.js       # Contact page form implementation
```

## References

- [Netlify Forms Documentation](https://docs.netlify.com/manage/forms/setup/)
- [Netlify Forms Troubleshooting](https://docs.netlify.com/manage/forms/troubleshooting-tips/)
- [Submit JavaScript-rendered forms with AJAX](https://docs.netlify.com/manage/forms/setup/#submit-javascript-rendered-forms-with-ajax)


