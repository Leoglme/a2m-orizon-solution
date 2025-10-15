<p align="center">
  <img src="/public/A2M-logo.svg" alt="A2M ÔRIZON SOLUTION Logo" width="160"/>
</p>

<h1 align="center">A2M ÔRIZON SOLUTION Website</h1>

<p align="center">
  Professional website for <strong>A2M ÔRIZON SOLUTION</strong>, a company providing external and customized social services for medico-social institutions, construction businesses, and individuals.
  <br/>
  Built with <a href="https://nuxt.com" target="_blank">Nuxt 4</a> and <a href="https://www.storyblok.com" target="_blank">Storyblok CMS</a>.
</p>

<div style="display: flex; align-items: center; gap: 10px; margin-top: 20px;">
<img src="https://a.storyblok.com/f/287711486895708/50x50/d93deb9fc2/folder-open.svg" alt="" title="" />
<p>Basée à Melun (77), j’interviens principalement en Seine-et-Marne et dans les départements voisins.</p>
</div>

---

## 🚀 Overview

This project is the official website for **A2M ÔRIZON SOLUTION**, a professional social services company.  
The website is built using **Nuxt 4** with a **Storyblok headless CMS** integration for flexible content management.  
All content (texts, images, FAQs, etc.) can be edited directly in Storyblok or through the `/admin` route for easy access.

It also integrates:

- **Umami Analytics** for privacy-friendly traffic monitoring.
- **Continuous Deployment (CI/CD)** via GitHub Actions — each push to the `main` branch automatically builds and deploys the latest version.
- **TypeScript** strict mode for a cleaner and more maintainable codebase.
- **Responsive and accessible UI**, optimized for performance and SEO.

---

## 🧠 Tech Stack

- **Nuxt 4 (Vue 3)**
- **TypeScript**
- **Storyblok CMS**
- **TailwindCSS**
- **Umami Analytics**
- **GitHub Actions (CI/CD)**
- **Node.js 22+**

---

## ⚙️ Prerequisites

Before you start, make sure you have:

- **Node.js 22+**
- **npm**, **yarn**, **pnpm**, or **bun**
- Access to the **Storyblok Space** (with your Delivery API token)

---

## 🧩 Environment Variables

Create a `.env` file at the root of the project using the provided example:

```bash
cp .env.example .env
````

Then edit the following values:

```bash
NODE_ENV=development
STORYBLOK_DELIVERY_API_TOKEN=<YOUR-ACCESS-TOKEN>
```

> ⚠️ The API token can be found in your Storyblok space under
> **Settings → Access Tokens → Preview or Public Token.**

---

## 🧑‍💻 Local Development

Install dependencies:

```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install

# bun
bun install
```

Start the development server:

```bash
# npm
npm run dev

# yarn
yarn dev

# pnpm
pnpm dev

# bun
bun run dev
```

The site will be available at:
👉 **[https://localhost:3000](https://localhost:3000)**

---

## 🧱 Production Build

Build the application for production:

```bash
# npm
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🧰 Deployment

This project uses **GitHub Actions** for automatic deployment.

Each **push** to the `main` branch triggers the CI/CD workflow, which:

1. Builds the Nuxt application.
2. Deploys it automatically to the production server.

No manual deployment is required.

---

## 🧾 Access to Storyblok CMS

To edit content (texts, images, pages, FAQ, etc.):

* Go to your Storyblok dashboard:
  👉 [https://app.storyblok.com](https://app.storyblok.com)
* Or directly through the website:
  👉 **`/admin`** route (redirects to the Storyblok editor)

---

## 📊 Analytics

This website integrates **Umami Analytics**, a privacy-focused analytics platform.
All metrics are collected anonymously to comply with GDPR requirements.

---

## 👥 Authors

Developed by **Léo Guillaume ([Dibodev](https://dibodev.fr))**.

---

## 📄 License

This project is proprietary and owned by **A2M ÔRIZON SOLUTION**.
All rights reserved.
