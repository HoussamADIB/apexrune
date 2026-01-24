# Case Study Screenshots

This folder is for storing screenshots used in case study detail pages.

## Folder Structure

Organize screenshots by case study ID:

```
screenshots/
  ├── account-360-dashboard/
  │   ├── main-dashboard.png
  │   ├── flag-system.png
  │   └── activity-scorecard.png
  ├── platform-paralysis/
  │   └── ...
  └── ...
```

## Naming Convention

- Use kebab-case for filenames
- Be descriptive: `main-dashboard-view.png` not `img1.png`
- Include the component/feature name when relevant

## Image Requirements

- **Format**: PNG or JPG
- **Size**: Optimize for web (aim for < 500KB per image)
- **Anonymization**: Ensure all screenshots are anonymized/blurred as needed
- **Resolution**: Minimum 1200px width for desktop screenshots

## Usage in Code

Reference screenshots in case study pages like this:

```javascript
<img src="/images/case-studies/screenshots/account-360-dashboard/main-dashboard.png" alt="Account 360 Dashboard" />
```
