# 📱 ISOTEX Mobile — Sustainable Materials E-Commerce App

> The mobile companion to the ISOTEX platform. A premium, high-performance React Native application for sustainable architectural materials. Built with Expo and React Native.

---

## ✨ Key Features

### 🛍️ Mobile Shopping Experience

- **Product Discovery** — Browse the full sustainable catalogue with high-resolution imagery and detailed material specs.
- **Dynamic Shop** — Filter and find materials specifically curated for modern architectural needs.
- **Integrated Cart** — Seamlessly manage your selection with a native mobile cart experience.
- **Safe Checkout** — Guided mobile checkout process for quick and secure material ordering.

### 🔐 Authentication & Security

- **Secure Mobile Login** — Authenticate securely with your ISOTEX account.
- **JWT Persistence** — Tokens are stored securely using `expo-secure-store` for persistent sessions.
- **Native Signup** — Create new accounts directly from the mobile app with real-time validation.

### 🚀 Performance & UX

- **Native Navigation** — Fluid, high-performance screen transitions using React Navigation.
- **Optimized Assets** — Fast-loading images and smooth scrolling for a premium feel.
- **Responsive Layouts** — Beautifully adapted for all iOS and Android device sizes.

---

## 🏗️ Tech Stack

| Layer             | Technology                   |
| ----------------- | ---------------------------- |
| **Framework**     | React Native (Expo SDK 54)   |
| **Language**      | JavaScript (ES6+)            |
| **Navigation**    | React Navigation v7          |
| **API Client**    | Axios                        |
| **Security**      | Expo Secure Store            |
| **UI Components** | React Native Core Components |
| **Build System**  | Metro / EAS                  |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- Expo Go app on your [iOS](https://apps.apple.com/app/expo-go/id982107779) or [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) device.

### Installation

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd isotex-mobile
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure the API Endpoint:**
   Ensure the API URL in `src/services/api.js` (or equivalent) points to your running backend server (e.g., your computer's local IP if testing on a physical device).

4. **Start the development server:**

   ```bash
   npx expo start
   ```

5. **Run on your device:**
   Scan the QR code displayed in the terminal using the Expo Go app.

---

## 📁 Project Structure

```
isotex-mobile/
├── assets/             # Images, fonts, and splash screen
├── src/
│   ├── components/     # Reusable UI components (Buttons, Cards, Inputs)
│   ├── context/        # App-wide state (AuthContext, CartContext)
│   ├── navigation/     # Stack and Tab navigators
│   ├── screens/        # Main app screens (Home, Shop, Cart, Login)
│   └── services/       # API interaction and logic
├── App.js              # Root component and provider setup
└── app.json            # Expo configuration
```

---

## 🌱 Sustainability Mission

ISOTEX Mobile brings our mission of sustainable architecture to your pocket. We believe that choosing green materials should be as easy as tapping a button. By providing a mobile-first experience, we empower architects and builders to source eco-friendly materials on-site, in meetings, or on the go.

---
