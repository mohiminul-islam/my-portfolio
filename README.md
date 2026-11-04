# Mohiminul Islam: Portfolio

Personal portfolio website for **Mohiminul Islam**, covering software development, ERP and business automation, and digital growth strategy.

It is a fully static site: plain HTML, CSS and vanilla JavaScript, with no build step, no framework and no server. It runs as-is on **GitHub Pages**.

---

## Folder structure

```
index.html              Main page (must stay in the repository root)
css/
  style.css             Design tokens, layout and components
  animations.css        Keyframes, hero intro, scroll-reveal system, reduced-motion rules
  responsive.css        Tablet / phone / small-phone layouts
js/
  config.js             ← ALL editable content lives here
  animations.js         Reveals, role rotator, parallax, magnetic buttons, counters
  projects.js           Featured case study, filters, project modal
  main.js               Renders sections, navigation, mobile menu, contact form
assets/
  fonts/                Self-hosted Space Grotesk, Inter, JetBrains Mono (woff2)
  images/               Portraits (AVIF / WebP / JPG in two sizes) + og-image.jpg
  images/projects/      Optional project screenshots
  documents/            Put resume.pdf here
  icons/                favicon.svg, PNG icons
.nojekyll               Tells GitHub Pages to serve files as-is
robots.txt, sitemap.xml SEO files (update the URL after deploying)
site.webmanifest        Browser/app metadata
```

There are **no external dependencies**. Fonts and icons are local, and no CDN or tracking scripts are used.

---

## Before you publish: things to configure

| What | Where | Status |
|---|---|---|
| **Resume PDF** | Save it as `assets/documents/resume.pdf` | Missing. Until it's added, every resume button automatically becomes a "Request Resume" email link. |
| **GitHub URL** | `js/config.js` → `links.github` | Empty, so the icon is hidden |
| **LinkedIn URL** | `js/config.js` → `links.linkedin` | Empty, so the icon is hidden |
| **Show / hide phone** | `js/config.js` → `person.showPhone` | `true` |
| **Live site URL** | `index.html` (canonical + og:url, currently commented out), `sitemap.xml`, `robots.txt` | Placeholder `YOUR-USERNAME.github.io/YOUR-REPO` |
| **Contact form service** (optional) | `js/config.js` → `contact.formEndpoint` | Empty, so the form opens the visitor's email app |
| **DoorsDeal screenshot** (optional) | Add the image, then set `cover` on the project | Uses a generated cover |

---

## Editing content

Everything in Expertise, Experience, Projects, Education, Learning, Philosophy and Contact is generated from **`js/config.js`**. Edit the text there; you don't need to touch the HTML.

### Add a new project
Add an object to the `projects` array:

```js
{
  id: "my-new-project",                 // unique, no spaces
  name: "Project Name",
  category: "E-Commerce Website",
  categories: ["software"],             // any of: "software", "marketing", "operations"
  year: "2025",
  role: "Full-stack development",
  url: "https://example.com/",          // "" if there is no public site
  icon: "globe",                        // any icon id from the sprite in index.html
  accent: ["#4F8CFF", "#22D3EE"],       // two colours for the generated cover
  cover: "",                            // or "assets/images/projects/my-project.webp"
  summary: "One or two sentences.",
  contributions: ["What you did", "Another thing you did"],
  tags: ["Laravel", "ERP"],
  highlight: "",                        // optional badge on the card, e.g. "30+ outlets"
}
```

Set `featured: true` on one project to show it as the large case study (currently DoorsDeal).

### Add a project screenshot
1. Export a screenshot at about **1600 × 1000 px**, ideally as `.webp`.
2. Save it in `assets/images/projects/`.
3. Set `cover: "assets/images/projects/your-file.webp"` on that project.

Only use public pages. Never use screenshots of private ERP screens, customer data or admin panels.

### Replace the portraits
The site uses pre-optimised versions of the two photos:

- `assets/images/profile-hero-560|960.(avif|webp|jpg)`: close-up portrait (hero)
- `assets/images/profile-full-520|860.(avif|webp|jpg)`: full-length portrait (About)

To swap a photo, export the new image at the same widths and file names, in any of the formats (the `<picture>` element picks the best one the browser supports). If the aspect ratio changes, update the `width`/`height` attributes on the `<img>` in `index.html` to avoid layout shift. The full-length photo was cropped slightly on both sides to centre the subject.

---

## Contact form: how it works

GitHub Pages can't run server code, so the form works in one of two honest ways:

- **Default (no setup):** after validation, it opens the visitor's email app with the subject and message pre-filled, addressed to you. The note under the form says so.
- **Optional, direct delivery:** create a free form at [formspree.io](https://formspree.io), copy its endpoint (e.g. `https://formspree.io/f/abcdwxyz`) into `contact.formEndpoint` in `js/config.js`. The form then sends via AJAX and shows a real success or error message based on the response.

---

## Deploying to GitHub Pages

### 1. Create the repository
1. Sign in to GitHub → **New repository**.
2. Name it, for example `portfolio`. If you want the address `https://<username>.github.io/` with no sub-path, name it exactly **`<username>.github.io`**.
3. Choose **Public**, then **Create repository**.

### 2. Upload the files
**Option A, in the browser:** on the new repo, click **Add file → Upload files**, then drag in **the contents** of this folder (`index.html`, `css/`, `js/`, `assets/`, `.nojekyll`, `robots.txt`, `sitemap.xml`, `site.webmanifest`, `README.md`). `index.html` must end up at the **top level** of the repository, not inside another folder. Commit the upload.

> The `.nojekyll` file starts with a dot and may be hidden in your file explorer. Enable "show hidden files" so it's included, or create it later on GitHub with **Add file → Create new file** named `.nojekyll` (empty).

**Option B, with Git:**
```bash
cd path/to/my-porfolio
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

### 3. Turn on Pages
1. In the repository, open **Settings → Pages**.
2. Under **Build and deployment**, set **Source: Deploy from a branch**.
3. Choose **Branch: `main`** and **Folder: `/ (root)`**, then **Save**.
4. Wait 1–2 minutes. The page shows your live URL: `https://<username>.github.io/<repo>/`.

### 4. Verify
Open the URL and check that:
- the portraits, fonts and icons load (no broken images or fallback fonts)
- navigation links scroll to each section, and the mobile menu opens and closes
- project filters and "View details" work
- the resume button downloads the PDF (once added)
- there are no red errors in DevTools → Console

### 5. Finish the SEO placeholders
Replace `https://YOUR-USERNAME.github.io/YOUR-REPO/` with your real URL in `sitemap.xml` and `robots.txt` (remove the `#`), and in `index.html` uncomment the canonical / `og:url` lines. For the best link previews, you can also change `og:image` / `twitter:image` to the absolute URL, e.g. `https://<username>.github.io/<repo>/assets/images/og-image.jpg`.

### 6. Updating later
Edit files and upload or commit them again (or `git add . && git commit -m "Update" && git push`). GitHub Pages redeploys automatically within a minute or two. Hard-refresh (Ctrl/Cmd + Shift + R) if you still see the old version.

### 7. Custom domain (optional)
1. **Settings → Pages → Custom domain**: enter e.g. `mohiminul.com` and save (GitHub adds a `CNAME` file).
2. At your domain registrar, add DNS records:
   - apex domain: four `A` records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www`: a `CNAME` record → `<username>.github.io`
3. Once DNS propagates, tick **Enforce HTTPS**.
4. Update the canonical URL, sitemap and robots file to the new domain.

All asset paths are relative, so the site works the same at `/<repo>/`, at the root, or on a custom domain.

### GitHub Pages limitations
- No server-side code (PHP, Python, databases). The contact form uses email hand-off or an external form service.
- Public repositories are publicly readable, so don't commit private documents or credentials.
- Soft limits: about 1 GB per site and 100 GB of bandwidth per month (far beyond what this site needs).

---

## Previewing locally

Opening `index.html` directly works for most things. For the most accurate preview (resume detection, etc.) run a tiny local server from this folder:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Accessibility & performance notes
- Semantic landmarks, one `h1`, labelled controls, visible focus rings, a skip link, a focus-trapped mobile menu and a native `<dialog>` for project details.
- `prefers-reduced-motion` disables all movement and shows content immediately. Low-power devices or Save-Data turn off ambient effects.
- Animations use `transform`/`opacity`. One passive, rAF-throttled scroll handler drives the progress bar, timeline and parallax.
- Only the hero portrait is preloaded. Other images lazy-load and have explicit dimensions to prevent layout shift.
