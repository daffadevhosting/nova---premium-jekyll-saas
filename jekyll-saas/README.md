# 🚀 NOVA - Premium Jekyll SaaS Template (Production Ready)

Welcome to **NOVA**, a highly customizable, ultra-fast, and professionally designed Jekyll landing page template built specifically for modern SaaS products. Engineered with modularity, conversions, and clean web development guidelines in mind.

---

## ✨ Features Out of the Box

- ⚡ **Jekyll 4.3+ Support**: Fully compatible with modern Ruby environments and static website engines.
- 🎨 **Tailwind CSS v4 Integration**: Clean, modern utility classes with modular styling.
- 🌓 **Instant Dark/Light Mode Switcher**: Fully functional theme-persistence without visual layout flashes.
- 📊 **Rich visual mockup layers**: Interactive visual dashboard elements built purely with HTML/CSS.
- 🤖 **PWA Capabilities**: Service worker and Web App Manifest standardizations out of the box.
- 🔍 **SEO & Sitemap Ready**: Clean metadata, canonical link injections, automated XML sitemap, and Schema.org JSON-LD microdata.
- 🗣️ **Reusable Data Models**: Central configuration controls inside `_config.yml` and YAML structures (`_data/`).
- ♿ **WCAG 2.2 AA Compliance**: Correct semantic tags, active ARIA triggers, keyboard control drawers, and visual skip links.

---

## 🛠️ Getting Started (Local Development)

### Prerequisites

Make sure you have **Ruby**, **Bundler**, and **Jekyll** installed on your operating system.

### 1. Install Dependencies

In your terminal, navigate to your project directory and run:

```bash
bundle install
```

### 2. Run the Development Server

Start Jekyll on your local server:

```bash
bundle exec jekyll serve
```

Your terminal will display your active address (usually `http://127.0.0.1:4000/`). Open this link in your web browser to view your live template!

### 3. Build for Production

Compile your static website into the final production directory `_site`:

```bash
bundle exec jekyll build
```

---

## ⚙️ Customization Guidelines

You can customize almost all branding and layout text blocks in under 30 seconds by simply modifying the centralized configuration files:

### Central Configuration (`_config.yml`)
- Update `title`, `tagline`, `description`, `url`, and `author` keys. Your updates will sync globally.

### Navigation (`_data/navigation.yml`)
- Customize main header and footer menu blocks cleanly by altering URLs and titles.

### Features Grid (`_data/features.yml`)
- Add or remove features cards from the home page block. Icons can be chosen from `zap`, `users`, `bar-chart-2`, `cpu`, `link`, or `shield`.

### Pricing (`_data/pricing.yml`)
- Configure Starter, Pro, and Business prices, feature checklists, or CTA buttons.

### Testimonials (`_data/testimonials.yml`)
- Customize reviews, avatars, names, roles, or client company details.

---

## 🚀 Final Deployment

### GitHub Pages

1. Push your active directory to a secure repository on GitHub.
2. In your GitHub Settings, navigate to **Pages**.
3. Choose **GitHub Actions** as the source, and use the standard Jekyll workflow template.

### Cloudflare Pages / Netlify

Set up your build settings with the following values:
- **Build Command:** `bundle exec jekyll build`
- **Output Directory:** `_site`
- **Ruby Version:** `3.2.0` (or matching environment)

---

## 📄 License

This digital product is licensed under the MIT License — feel free to customize, adjust, deploy, and sell!
