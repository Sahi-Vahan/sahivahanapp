# SahiVahan — Unified MVP (Customer & Admin Operations)

> **"Sahi Gaadi. Sahi Faisla."**  
> Streamlined, production-grade vehicle inspection web application with customer inquiry capture and administrative organization dispatch.

---

## 🚀 Overview

This single-repository application brings together:
1. **Public Customer Portal**: High-converting, trustworthy vehicle buyer experience.
2. **Admin Command Center**: Operations control for dispatching incoming inspection inquiries to certified regional partner organizations and moderating buyer feedback.
3. **Role-Based Authentication**: Email-authenticated customer login to verify legitimate users, and protected administrative credentials for operations staff.
4. **Supabase-Ready Architecture**: Modular state store persisting to `localStorage` now, with complete SQL migrations and RLS policies (`supabase_schema.sql`) ready for one-click Supabase activation.

---

## 📱 Page Map

### User Pages
| Route | Page | Purpose |
| :--- | :--- | :--- |
| `/` | **Home** | Hero value proposition, live stats, 200+ point checks, dynamic service teasers, buyer reviews, and recent blogs. |
| `/about` | **About** | Brand story, "Sahi Gaadi. Sahi Faisla.", solving India's used vehicle trust deficit, and our partner organization model. |
| `/contact` | **Contact Us** | Direct support hotline (1800-123-SAHI), email, regional hubs, and inquiry form. |
| `/services` | **Dynamic Services** | Full dynamic catalog (Cars, Bikes, EVs, Commercial Fleets) with detailed modal checklist viewer and direct inquiry CTA. |
| `/inquire` | **Query Taking Form** | Simple 60-second inspection inquiry form with vehicle category, make & model, city, slot, and user email verification. |
| `/blogs` | **Dynamic Blogs** | Dynamic automotive guides, scam alerts, flood damage detection, and rich reader modal. |
| `/reviews` | **Reviews Showcase** | Public feed of verified customer reviews with star ratings, vehicle inspected, and recommendation stats. |
| `/feedback` | **Feedback Form** | Verified customer feedback submission form with 1-5 star selector, vehicle details, and moderation queue. |
| `/login` | **Customer Login** | Email authentication for vehicle buyers with 1-click demo login option. |

### Admin Operations Pages
| Route | Page | Purpose |
| :--- | :--- | :--- |
| `/admin/login` | **Admin Login** | Secure admin portal credentials with pre-filled 1-click Demo Admin option. |
| `/admin/dashboard` | **Dashboard** | KPI radar, leads awaiting organization dispatch, active partner fleet count, and shortcuts. |
| `/admin/queries` | **Inspection Queries** | Table of all leads with status filters and interactive **Popup Modal** with complete inquiry info, WhatsApp/call links, and **1-click Partner Organization Assignment**. |
| `/admin/feedback` | **Customer Feedback** | Review moderation queue with modal viewer and Approve / Reject / Feature actions. |
| `/admin/organizations` | **Organization List** | Directory of regional partner organizations, coverage hubs, SLAs, and active lead count. |
| `/admin/organizations/create` | **Onboard Organization**| Form to register new partner organizations with GSTIN, hubs, vehicle capabilities, and SLA commitments. |

---

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript & Vite
- **Styling**: Tailwind CSS with SahiVahan Forest Green (`#154D3F`) & Emerald (`#10B981`) branding tokens
- **Icons**: Lucide React
- **Routing**: React Router DOM v6
- **Database / Backend**: Supabase Ready (`supabase_schema.sql` included)

---

## ⚡ Quick Start

```bash
# Navigate to the folder
cd sahivahan-app

# Install dependencies (already installed)
npm install

# Run the development server
npm run dev

# Build for production
npm run build
```

---

## 👥 Demo Credentials

- **Customer Demo User**: `rahul.verma@gmail.com` (Click *"Instant 1-Click Demo Customer Sign In"* on login or inquiry form)
- **Operations Admin**: `admin@sahivahan.com` / `admin123` (Click *"Instant 1-Click Demo Admin Sign In"* on `/admin/login`)

