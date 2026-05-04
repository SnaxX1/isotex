# Moving ISOTEX to a New Machine (Crash-Free Guide)

When you copy your project to a new PC (e.g., via a USB drive for your competition), the biggest risk is that native dependencies (like `sqlite3`) will crash because they were compiled for your old computer.

Follow these exact steps to ensure a flawless startup on **any** new machine.

## Prerequisites
Before you begin, ensure the new PC has **Node.js** installed. You can check by opening a terminal and typing `node -v`.

---

## Step 1: Setup the Web & Backend (Fixing Dependencies)
When you copy the `isotex-web` folder via USB, it brings along the old `node_modules`. We need to wipe and rebuild them for the new machine.

1. Open a terminal.
2. Navigate to the web folder:
   ```bash
   cd path/to/E-commerce compet/isotex-web
   ```
3. Run the setup script we created:
   ```bash
   npm run setup
   ```
   > [!TIP]
   > This command (`npm ci && npm rebuild`) is the magic step. It completely cleans your dependencies and recompiles `sqlite3` specifically for the new PC's operating system, guaranteeing no database crashes!

## Step 2: Setup the Mobile App
Similarly, ensure the Expo app has the correct dependencies.

1. Open a second terminal.
2. Navigate to the mobile folder:
   ```bash
   cd path/to/E-commerce compet/isotex-mobile
   ```
3. Install dependencies cleanly:
   ```bash
   npm install
   ```

---

## Step 3: Start the Project
Now that the dependencies are perfectly aligned with the new PC, you can start the project just like you normally do.

**1. Start the Backend and Web App:**
In your first terminal (`isotex-web`), run:
```bash
npm run dev
```
*(Wait until you see "✅ ISOTEX API: Listening on all network interfaces")*

**2. Start the Mobile App:**
In your second terminal (`isotex-mobile`), run:
```bash
npx expo start
```

## Step 4: Connecting Devices
Because of our dynamic IP setup, you do not need to configure any IPs manually!

- **To show the Web App to Judges:** Look at the terminal running Vite and find the **Network** URL (e.g., `http://192.168.x.x:5173`). Have the judges type that into their laptop browsers.
- **To show the Mobile App:** Connect your phone to the same Wi-Fi as the new PC, open the Expo Go app, and scan the QR code. It will automatically route to the new PC's IP address.

> [!IMPORTANT]
> **Firewall Warning:** The first time you run `npm run dev` on a new Windows PC, Windows Defender might pop up asking for network access for Node.js. You **must** click "Allow access", otherwise external devices won't be able to connect!
