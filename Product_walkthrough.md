# Site Management & Content Guide

This walkthrough explains exactly which files you need to edit to manage your products, update product images, and change the static photography across your entire E-commerce platform.

---

## 1. Product & Product Image Management

**Target File to Edit:** `src/data/products.js`

All product data (including product images, pricing, and descriptions) is centralized in this single local data file. Any changes made here will automatically reflect across the entire site (Shop page, Product pages, Category filters, etc.).

### How to Change an Existing Product

To update an existing product, simply open `src/data/products.js` and modify the values inside the product's object.

For example, to change the price or stock status:

```javascript
  {
    id: 1,
    title: 'NeoBrick - Indigo Indigo',
    price: '$55.00', // Update your price here
    stock: 'MADE TO ORDER: 2 WEEKS', // Update your stock status here
    // ...
  }
```

> [!WARNING]
> Do **NOT** change the `id` of an existing product. It is used heavily by the shopping cart system and page URLs.

### How to Change Product Pictures

Product images are managed via two fields in the `src/data/products.js` object:

1. `image`: The main featured image shown on the shop grid and product page.
2. `thumbnails`: An array of images shown in the gallery slider.

Simply replace the URLs with your own. You can use external links or place your images in your project's `public/` folder (e.g., `/my-product.jpg`).

```javascript
  {
    id: 1,
    title: 'NeoBrick - Indigo Indigo',
    image: 'https://your-new-image-url.com/main-photo.jpg', // Main image
    thumbnails: [
      'https://your-new-image-url.com/main-photo.jpg',      // Gallery image 1
      'https://your-new-image-url.com/gallery-1.jpg'        // Gallery image 2
    ],
    // ...
  }
```

### How to Add a New Product

To add a brand new product, copy this template and add it to the end of the `PRODUCTS` array in `src/data/products.js`.

**Template:**

```javascript
  {
    id: 5, // Make sure this is a UNIQUE number
    title: 'Your New Product',
    price: '$120.00',
    stock: 'IN STOCK: 100 UNITS',
    image: 'https://link-to-your-main-image.jpg',
    thumbnails: ['https://link-to-your-main-image.jpg'],
    category: 'DÉCORATION INTÉRIEURE',
    tag: 'NEW',
    visualStyle: 'Modern Style',
    color: 'Blue', // Determines where it shows up in the Color Filter (Blue, Grey, Multi, etc.)
    pill: 'PRODUCT TYPE',
    description: 'A brief description.',
    composition: '100% Recycled materials.',
    applications: ['Application 1', 'Application 2'],
    circularImpact: 'Brief impact statement.',
    technicalData: {
      certification: 'Your certification details.',
      breeam: 'BREEAM details.',
      standardForm: 'Size and dimensions.',
      density: 'Weight or density details.'
    }
  }
```

---

## 2. Managing Static Website Images

If you want to change the large background and aesthetic photography used across the informational pages, you will need to edit specific React components. Here is the exact mapping of where to find and edit the other pictures:

### About Page Images

**Target File to Edit:** `src/pages/AboutPage.jsx`

- **Hero Image (Right Side):** Search for `<img src="https://images.unsplash.com/photo-1547949003...`
- **Process Images (Bottom Grid):** Search for the `<img` tags inside the `grid-cols-1 md:grid-cols-3` section near the bottom of the file.

### Process / Methodology Page Images

**Target File to Edit:** `src/pages/ProcessPage.jsx`

- **Step-by-step Images:** Scroll to the bottom of the file where the `steps` array is defined. Each step has an `image` property with a URL. Update these URLs to change the pictures representing each phase (Waste Collection, Deconstruction, etc.).

### Landing Page Images

**Target Files to Edit:**

- **Innovation Section:** `src/components/landing/InnovationSection.jsx` (Contains the large hero image showing the material texture)
- **Durability Section:** `src/components/landing/DurabilitySection.jsx` (Contains the tall vertical image on the left)

### B2B Solutions Images

**Target File to Edit:** `src/pages/B2BPage.jsx`

- **Sector Images (Commercial, Residential, etc.):** Scroll down to the bottom where the `sectors` array is defined. Update the `image` property for each sector.
  node server/server.js
