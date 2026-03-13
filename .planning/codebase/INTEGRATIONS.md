# External Integrations

**Analysis Date:** 2026-03-13

## APIs & External Services

**Not configured** - This is a static portfolio site with no API integrations. All content is client-side rendered from local data.

## Data Storage

**Databases:**
- None - This is a static site

**File Storage:**
- Local filesystem only
- Project images stored in `public/images/` (static assets)
- Image paths referenced in `src/lib/projects.ts` (e.g., `/images/projects/house-01/01.JPG`)

**Caching:**
- None configured

## Authentication & Identity

**Auth Provider:**
- Not applicable - Static portfolio site with no authentication required

## Monitoring & Observability

**Error Tracking:**
- Not configured

**Logs:**
- Console logging only (standard browser console)
- No server-side logging infrastructure

## CI/CD & Deployment

**Hosting:**
- Not locked to any specific platform (agnostic deployment)
- Compatible with: Vercel, Netlify, AWS S3, GitHub Pages, or any static host
- Static export compatible via Next.js `next export`

**CI Pipeline:**
- Not configured in codebase

**Build Output:**
- Static HTML, CSS, JavaScript files (no server runtime required)
- Configured with `images.unoptimized: true` in `next.config.js` for static export

## Environment Configuration

**Required env vars:**
- None

**Optional env vars:**
- None

**Secrets location:**
- Not applicable (no secrets or API keys used)

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- Contact form (at `src/app/contact/page.tsx`) is a client-side form with no backend submission
  - Form collects: first name, last name, email, project type, location, project description
  - Currently displays "Thank you" message on submission but does not send data anywhere
  - **Note:** This is a UI stub - no form handling or email service is integrated

## Form Handling

**Contact Form:**
- Location: `src/app/contact/page.tsx`
- Behavior: Client-side state management only (shows submitted state)
- Integration: Not connected to any backend (would need email service like SendGrid, Mailgun, or API endpoint to function)

---

*Integration audit: 2026-03-13*
