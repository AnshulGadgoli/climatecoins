# ClimateCoins - Hackathon Prototype

ClimateCoins is a platform connecting Indian farmers to global carbon markets via Farmer Producer Organisations (FPOs) and digital MRV (Monitoring, Reporting, and Verification).

This prototype was built frontend-first using React, Vite, Tailwind CSS, and Zustand. It contains mock data and simulated logic, so no backend is required to run the demo.

## Setup

1. Make sure you have Node.js installed.
2. Clone or open this folder.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open your browser to the local URL (usually `http://localhost:5173`).

## 2-Minute Demo Script

This script walks through the end-to-end flow using the shared local state.

1. **Landing Page**
   - Show the public landing page explaining the 4-step process and stats.
   - Click **"FPO Manager"** in the role picker.

2. **FPO Manager Flow**
   - **Dashboard:** Show the KPI cards, line chart of hectares enrolled, and recent farmer activity. Note the language toggle (English/Hindi) in the sidebar.
   - **Onboard Farmer:** Go to the "Onboard Farmer" tab. 
     - Enter some mock details (e.g., "Rajesh", "Shirur", "2.5" Hectares).
     - Click **Continue**.
     - Click **Fetch Satellite Data** (shows a simulated 1.5s loading state fetching NDVI/SOC data).
     - Click **Run Eligibility Model** -> Result is Eligible.
     - Click **Save Record**.
   - **Project Pooling:** Go to "Project Pooling". Show the Leaflet map clustering eligible farmers. Click **"Approve Pool"**.
   - **Payouts:** Show the quarterly payout schedule ready for download.
   - *Click Logout (bottom of sidebar).*

3. **Verifier Flow**
   - From the landing page, click **"Verifier"**.
   - Show the Project Queue. Click **Review** on the top project.
   - Show the MRV time-series chart and evidence checklist. Click **Approve**.
   - *Click Logout.*

4. **Corporate Buyer Flow**
   - From the landing page, click **"Corporate Buyer"**.
   - **Marketplace:** Filter by "Verified Available" or "Pipeline". Click **Buy Forward Contract** on a project.
   - **Forward Contract:** Adjust the volume slider (e.g., 500 tCO2e). Show how the price estimate updates. Click **Execute Contract**.
   - **Carbon Wallet:** Show the held credits, retired credits, and the new transaction in the ledger.
   - **Price Forecast:** Show the mock ML price prediction chart demonstrating why forward contracts are valuable.
   - *Click Logout.*

5. **Admin Flow (Optional)**
   - Log in as **Admin**.
   - Show the platform-wide KPIs, project funnel chart, and revenue split model.

## Technology Stack
- React + Vite (TypeScript)
- Tailwind CSS
- React Router
- Zustand (Global State)
- Recharts (Data Visualization)
- React Leaflet (Maps)
- Lucide React (Icons)
