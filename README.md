# LATTIS Industrial Adhesives — Production Website (www.lattis.in)

Official digital brand platform and enquiry portal for **LATTIS Industrial Adhesives**, Bengaluru, Karnataka, India.

### Contact Information
- **Phone:** +91 9742444744
- **Sales & General Info:** sales@lattis.in
- **Website:** https://www.lattis.in

---

## 1. Quick Deployment to GitHub Pages

This project is a high-performance React application built with Vite and Tailwind CSS. It builds directly to static HTML, CSS, and JavaScript files ready for zero-cost hosting on **GitHub Pages** with custom domain support for **www.lattis.in**.

### Step 1: Create a GitHub Repository
1. Log in to [GitHub](https://github.com).
2. Create a new repository (e.g. `lattis-website` or `lattis.github.io`).
3. Set the repository to **Public**.

### Step 2: Push the Code
```bash
git init
git add .
git commit -m "Initial release of LATTIS Industrial Adhesives platform"
git branch -M main
git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/lattis-website.git
git push -u origin main
```

### Step 3: Build for GitHub Pages
```bash
npm run build
```
The output directory is `/dist`. The `dist/` folder automatically includes the `CNAME` file containing `www.lattis.in`.

### Step 4: Configure GitHub Pages Settings
1. Go to your repository **Settings** tab.
2. In the left navigation, click **Pages** (under Code and automation).
3. Under **Build and deployment > Source**, select **Deploy from a branch**.
4. Choose the publishing branch (`main` or `gh-pages` if publishing the `dist` folder) and folder (`/` or `/dist`).
5. Under **Custom domain**, enter:
   ```
   www.lattis.in
   ```
6. Click **Save**. GitHub will verify the DNS records.
7. Once verified, check the box **Enforce HTTPS** (TLS certificate provisioning takes 5–15 minutes).

---

## 2. GoDaddy DNS Configuration for www.lattis.in

Log in to your [GoDaddy Account](https://www.godaddy.com):
1. Navigate to **Domain Portfolio** -> Select `lattis.in` -> Click **Manage DNS**.
2. Add or update the following DNS records:

### Primary Subdomain CNAME Record
| Type | Name / Host | Value / Target | TTL | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **CNAME** | `www` | `<YOUR-GITHUB-USERNAME>.github.io` | `1 Hour` (3600s) | Directs `www.lattis.in` to GitHub Pages |

*(Replace `<YOUR-GITHUB-USERNAME>` with your actual GitHub username, e.g., `sanki09c.github.io`)*

### Apex / Root Domain A Records (for root domain forwarding)
Add four **A** records with Host `@` pointing to GitHub Pages official server IP addresses:

| Type | Name / Host | Points to / Value | TTL | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` | `185.199.108.153` | `1 Hour` | GitHub Pages Anycast IP 1 |
| **A** | `@` | `185.199.109.153` | `1 Hour` | GitHub Pages Anycast IP 2 |
| **A** | `@` | `185.199.110.153` | `1 Hour` | GitHub Pages Anycast IP 3 |
| **A** | `@` | `185.199.111.153` | `1 Hour` | GitHub Pages Anycast IP 4 |

> **IMPORTANT:** Do NOT delete or modify your existing **MX records** (mail exchange) or **TXT records** (SPF/DKIM) used for business email on GoDaddy. Only modify the `CNAME` for `www` and `A` records for `@`.

---

## 3. Pre-Launch Verification Checklist

1. **Business Phone Number:**
   - Value in code: `+91 9742444744` (Configured for direct calls and WhatsApp).

2. **Sales & General Email:**
   - Value in code: `sales@lattis.in`.

3. **Address:**
   - `LATTIS INDUSTRIAL ADHESIVES, No.12, 10th main, 1st cross, Adarsha layout, Jnanabharathi, Mallathalli, Bangalore 560056`
   - Verified directly from label packaging artwork.

4. **Product Claims:**
   - TL-513: Prevents Loosening From Vibration (Medium strength anaerobic threadlocker, removable with hand tools).
   - TS-523: Seals and Locks Threaded Fittings (Medium strength anaerobic thread sealant, leak resistant and vibration resistant).

5. **Technical Data Sheets (TDS / MSDS):**
   - The website clearly marks formal PDF dossiers as available on request or upon batch shipment. When official PDFs are finalized, place them in `/public/docs/` and link them directly.
