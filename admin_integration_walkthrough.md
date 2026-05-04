# Backend Integration Walkthrough (v2)

This guide explains how to transition your **entire Textura Admin Dashboard** (Products, Projects, Deliveries, and Analytics) from the current **LocalStorage** implementation to a real **Production Backend** (Node.js, Python, or Go).

## 📁 The Primary Integration Points

Because we used a **Service-Oriented Architecture**, your UI components are already "blind" to where the data comes from. To switch to a real database, you only need to modify the files in the `src/api/` folder.

### 1. Products API
👉 **`src/api/adminProducts.js`**
Switch the `adminApi` object to use `fetch()` or `axios`. 
- **Before:** Uses `localStorage.getItem('textura_products')`.
- **After:** Uses `fetch('https://api.textura.com/products')`.

### 2. Projects API
👉 **`src/api/adminProjectsApi.js`**
Replace the `projectsApi` object. This is critical for the "Project Workspace" to work across multiple users.
- **Backend Requirement:** You will need a `POST /projects` and `GET /projects` endpoint.
- **After:** 
  ```javascript
  getProjects: async () => {
    const res = await fetch('/api/projects');
    return res.json();
  }
  ```

---

## 📊 Connecting the Dashboard Analytics

The **Impact Analytics** and **Overview Stats** are currently hardcoded or derived from the product list length. 

👉 **`src/pages/admin/AdminImpact.jsx`**
👉 **`src/pages/admin/AdminDashboard.jsx`**

**The Strategy:**
Instead of calculating stats in the browser, your backend should provide an `/api/stats` endpoint that returns a summary of:
- Total waste diverted (summed from all projects in the DB).
- Active project count.
- Recent activity log.

---

## 🔐 Real-World Authentication (JWT)

Currently, the `AdminAuthContext.jsx` checks for a hardcoded `'true'` in localStorage. To move to production:

1. **Backend:** Implement a `/login` route that returns a **JWT Token**.
2. **Frontend (`AdminAuthContext.jsx`):** 
   - Send the username/password to your server.
   - Save the returned Token (not just "true") in localStorage.
3. **Interceptors:** Add the Token to the `Authorization` header of every API call in your `adminProducts.js` and `adminProjectsApi.js`.

---

## 🔄 Summary: The "Before vs After" Pattern

| Feature | LocalStorage (Current) | Production Backend (Future) |
| :--- | :--- | :--- |
| **Data Storage** | Browser Memory | MySQL / PostgreSQL / MongoDB |
| **Data Fetching** | `JSON.parse(localStorage)` | `await fetch('/api/...')` |
| **Multi-user** | No (Local to your PC) | Yes (Shared across all staff) |
| **Security** | None (Inspectable) | JWT + Server-side validation |

### Final Step Checklist for Backend Devs:
1. Replace all `setTimeout` delays in `src/api/*.js` with real network requests.
2. Ensure your backend returns the exact same JSON structure (e.g., `{ id, title, status... }`) so the UI components don't break.
3. Implement CORS on your server to allow your React frontend to connect.
