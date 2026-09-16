"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { 
  Zap, 
  Users, 
  BarChart2, 
  Cpu, 
  Link, 
  Shield, 
  Sun, 
  Moon, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Download, 
  Code, 
  Eye, 
  Settings, 
  ChevronDown, 
  Check, 
  Menu, 
  X, 
  FileCode, 
  Folder, 
  FolderOpen, 
  ExternalLink,
  Sparkles,
  HelpCircle,
  Clock,
  Heart,
  Share2,
  Trash2,
  Plus
} from "lucide-react";
import JSZip from "jszip";

// Define general interfaces for the customizer state
interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  enabled: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price_monthly: number;
  price_yearly: number;
  cta_text: string;
  features: string[];
}

interface TestimonialItem {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

export default function SaaSBuilderPage() {
  // Brand & Config State
  const [siteName, setSiteName] = useState("NOVA");
  const [siteTagline, setSiteTagline] = useState("Build smarter. Ship faster.");
  const [siteDescription, setSiteDescription] = useState(
    "The modern workspace for teams that want to turn ideas into products faster. Highly customizable, responsive, and SEO-optimized."
  );
  const [primaryColor, setPrimaryColor] = useState("#2563eb"); // Accent blue
  const [currencySymbol, setCurrencySymbol] = useState("$");

  // Announcement State
  const [announcementText, setAnnouncementText] = useState(
    "New: AI-powered workflow automation is now live! Explore what's new →"
  );
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true);

  // Features State (min 6)
  const [features, setFeatures] = useState<FeatureItem[]>([
    {
      id: "ai_workflow",
      title: "AI Workflow Automation",
      enabled: true,
      description: "Automate your daily repetitive tasks with smart LLM integrations. Trigger actions dynamically based on custom-defined system logic.",
      icon: "zap"
    },
    {
      id: "collaboration",
      title: "Real-time Collaboration",
      enabled: true,
      description: "Co-author projects, documents, and workflows with your teammates in real time. Work seamlessly together with instant change resolution.",
      icon: "users"
    },
    {
      id: "analytics",
      title: "Smart Analytics Dashboard",
      enabled: true,
      description: "Observe performance metrics, user actions, and server health. Get detailed historical reports paired with smart forecasting.",
      icon: "bar-chart-2"
    },
    {
      id: "automation",
      title: "Intelligent Pipelines",
      enabled: true,
      description: "Trigger custom webhooks, schedule routine maintenance, and run remote testing suites. No more manual deployment pipelines.",
      icon: "cpu"
    },
    {
      id: "integrations",
      title: "Sleek Integrations",
      enabled: true,
      description: "Connect to the services you already love out of the box: Slack, GitHub, Notion, Discord, and Stripe. Fully custom webhook-ready.",
      icon: "link"
    },
    {
      id: "security",
      title: "Enterprise Grade Security",
      enabled: true,
      description: "Sleep peacefully with military-grade AES-256 data encryption, single sign-on (SSO), and role-based access controls.",
      icon: "shield"
    }
  ]);

  // Pricing Plans (3 plans)
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([
    {
      id: "starter",
      name: "Starter",
      description: "Essential workflows for small collaborative teams.",
      price_monthly: 9,
      price_yearly: 7,
      cta_text: "Get Started Free",
      features: [
        "Up to 3 active projects",
        "1,000 monthly automation runs",
        "Basic analytics dashboard",
        "Shared collaborative workspace",
        "Standard email support"
      ]
    },
    {
      id: "pro",
      name: "Pro",
      description: "Advanced automation engines for growing power users.",
      price_monthly: 29,
      price_yearly: 22,
      cta_text: "Start Free Pro Trial",
      features: [
        "Unlimited active projects",
        "50,000 monthly automation runs",
        "Smart predictive forecasting",
        "Custom webhooks and triggers",
        "Priority 24/7 client support",
        "Custom domain white-labeling"
      ]
    },
    {
      id: "business",
      name: "Business",
      description: "Enterprise scale pipelines for heavy duty compliance.",
      price_monthly: 79,
      price_yearly: 59,
      cta_text: "Contact Sales",
      features: [
        "Everything in Pro included",
        "Unlimited automation runs",
        "Military AES-256 data encryption",
        "Dedicated account representative",
        "Single Sign-On (SSO) SAML",
        "99.99% uptime SLA guarantee"
      ]
    }
  ]);

  // Testimonials (3)
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([
    {
      name: "Sarah Jenkins",
      role: "Lead Frontend Engineer",
      company: "Linear Devs",
      quote: "NOVA completely rebuilt how we track task timelines. The Tailwind setup is remarkably clean, and customizing the Liquid templates took literally five minutes.",
      avatar: "SJ"
    },
    {
      name: "Alex Rivera",
      role: "VP of Product",
      company: "Vercel Co",
      quote: "This Jekyll template feels like a premium SaaS product rather than a quick wrapper. The dark mode is perfectly executed with no light-flash on load.",
      avatar: "AR"
    },
    {
      name: "Marcus Chen",
      role: "Founder & CTO",
      company: "Stripe Studios",
      quote: "Our marketing landing page conversion jumped 40% after launching with NOVA. The extreme speed, inline SVGs, and zero render-blocking JS did the trick.",
      avatar: "MC"
    }
  ]);

  // FAQs (8 items)
  const [faqs, setFaqs] = useState<FaqItem[]>([
    {
      question: "How does the 14-day free trial work?",
      answer: "You can sign up for any premium plan (Pro or Business) with a simple single click. We do not require a credit card upfront. You get full unlocked access to all features for 14 days, and can choose to upgrade or cancel anytime."
    },
    {
      question: "Can I host this Jekyll template on GitHub Pages?",
      answer: "Absolutely! This template is fully optimized for GitHub Pages, Netlify, Cloudflare Pages, or any standard static site provider. The codebase is highly standard, clean, and requires absolutely no complex server-side environments."
    },
    {
      question: "Is there a limit on how many team members I can invite?",
      answer: "No, we believe collaboration shouldn't be gated. You can invite your entire product development team, stakeholders, and clients into your workspace on all plans."
    },
    {
      question: "How do I hook up my own custom domain name?",
      answer: "Under your project Settings, simply enter your custom domain (e.g. workspace.yourbrand.com). We will provide CNAME records for your DNS setup and automatically provision a secure SSL certificate."
    },
    {
      question: "Is my business data secure with NOVA?",
      answer: "Yes, security is our primary focus. All persistent data is encrypted both in transit (using TLS 1.3) and at rest (using AES-256). We maintain regular SOC 2 audits."
    },
    {
      question: "What happens if I exceed my monthly automation limits?",
      answer: "If you exceed your plan's volume limit, we will never abruptly freeze your active production pipelines. We will send polite warning emails with options to purchase affordable add-on packs."
    },
    {
      question: "Can I cancel or change my plan anytime?",
      answer: "Of course. There are absolutely no locked contracts, long-term retainers, or hidden exit fees. You can upgrade, downgrade, or cancel your active subscription plan directly with a single click in your settings."
    },
    {
      question: "Do you offer discounts for educational institutes?",
      answer: "Yes! We support the development community. We offer 50% lifetime discounts for registered schools, universities, non-profit institutions, and student hackers."
    }
  ]);

  // General App Settings & Layout Controls
  const [activeTab, setActiveTab] = useState<"preview" | "code" | "docs">("preview");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark">("light");
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  
  // Customizer sidebar state accordion
  const [customizerSection, setCustomizerSection] = useState<string>("general");
  
  // File explorer selection
  const [selectedFile, setSelectedFile] = useState<string>("_config.yml");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar drawer
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Package downloader execution
  const [isZipping, setIsZipping] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState("");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";
  const paypalPrice = process.env.NEXT_PUBLIC_PAYPAL_PRICE_USD ?? "";

  // Auto scroll to preview element
  const scrollToSection = (id: string) => {
    const el = document.getElementById(`preview-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Helper to dynamically render a selected file's jekyll contents with the custom inputs
  const getFileContent = (path: string): string => {
    switch (path) {
      case "_config.yml":
        return `# Jekyll Configuration for ${siteName} SaaS Template
title: "${siteName}"
tagline: "${siteTagline}"
description: "${siteDescription}"
url: "https://${siteName.toLowerCase()}-saas-template.netlify.app"
baseurl: ""

# Author details
author:
  name: "${siteName} Team"
  email: "hello@${siteName.toLowerCase()}-saas.com"
  twitter: "${siteName.toLowerCase()}_saas"
  github: "${siteName.toLowerCase()}-saas"

# Theme settings
theme_mode: "system" # Options: light, dark, system
accent_color: "${primaryColor}"

# Analytics (Optional)
analytics:
  enabled: false
  google_analytics_id: ""

# Currency symbol
pricing:
  currency: "${currencySymbol}"

# Build Settings
markdown: kramdown
plugins:
  - jekyll-feed
  - jekyll-seo-tag
  - jekyll-sitemap

exclude:
  - Gemfile
  - Gemfile.lock
  - node_modules/
  - vendor/bundle/
  - README.md
  - LICENSE
  - manifest.webmanifest
  - sw.js`;

      case "Gemfile":
        return `source "https://rubygems.org"

gem "jekyll", "~> 4.3.3"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.17"
  gem "jekyll-seo-tag", "~> 2.8"
  gem "jekyll-sitemap", "~> 1.4"
end

webrick_gem = "webrick"
gem webrick_gem if Gem::Version.new(RUBY_VERSION) >= Gem::Version.new("3.0.0")`;

      case "_data/navigation.yml":
        return `# Main Navbar Links
header:
  - title: "Features"
    url: "#features"
  - title: "Integrations"
    url: "#integrations"
  - title: "Pricing"
    url: "#pricing"
  - title: "FAQ"
    url: "#faq"

# Footer Navigation Links
footer:
  product:
    title: "Product"
    links:
      - title: "Features"
        url: "#features"
      - title: "Pricing"
        url: "#pricing"
      - title: "Integrations"
        url: "#integrations"
      - title: "Changelog"
        url: "/changelog/"
  company:
    title: "Company"
    links:
      - title: "About"
        url: "/about/"
      - title: "Contact"
        url: "/contact/"
      - title: "Careers"
        url: "/careers/"
  resources:
    title: "Resources"
    links:
      - title: "Documentation"
        url: "/docs/"
      - title: "Blog"
        url: "/blog/"
      - title: "Help Center"
        url: "/help/"
  legal:
    title: "Legal"
    links:
      - title: "Privacy"
        url: "/privacy/"
      - title: "Terms"
        url: "/terms/"
      - title: "Cookies"
        url: "/cookies/"`;

      case "_data/features.yml":
        return features.filter(f => f.enabled).map(f => `- id: "${f.id}"
  title: "${f.title}"
  description: "${f.description}"
  icon: "${f.icon}"
  link: "#learn-more"`).join("\n\n");

      case "_data/testimonials.yml":
        return testimonials.map(t => `- name: "${t.name}"
  role: "${t.role}"
  company: "${t.company}"
  quote: "${t.quote}"
  avatar: "${t.avatar}"`).join("\n\n");

      case "_data/pricing.yml":
        return `currency: "${currencySymbol}"

plans:
${pricingPlans.map(p => `  - id: "${p.id}"
    name: "${p.name}"
    description: "${p.description}"
    price_monthly: ${p.price_monthly}
    price_yearly: ${p.price_yearly}
    cta_text: "${p.cta_text}"
    cta_url: "/signup/"
    popular: ${p.id === "pro" ? "true" : "false"}
    features:
${p.features.map(f => `      - "${f}"`).join("\n")}`).join("\n\n")}`;

      case "_data/faq.yml":
        return faqs.map(f => `- question: "${f.question}"
  answer: "${f.answer}"`).join("\n\n");

      case "_layouts/default.html":
        return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  {% include head.html %}
</head>
<body class="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200 antialiased">
  <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg">
    Skip to content
  </a>

  {% include header.html %}

  <main id="main-content">
    {{ content }}
  </main>

  {% include footer.html %}

  <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js');
      });
    }
  </script>
</body>
</html>`;

      case "manifest.webmanifest":
        return `{
  "id": "/",
  "name": "${siteName} - Premium SaaS Jekyll Template",
  "short_name": "${siteName}",
  "description": "${siteTagline}",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "${primaryColor}",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/assets/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/assets/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    }
  ]
}`;

      case "sw.js":
        return `const CACHE_NAME = '${siteName.toLowerCase()}-v1-cache';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/assets/css/main.css',
  '/assets/js/main.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS_TO_CACHE)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});`;

      case "README.md":
        return `# 🚀 ${siteName} - Premium Jekyll SaaS Template

Welcome to **${siteName}**, a premium Jekyll landing page template designed for conversion, speed, and modern styling.

## 🛠️ Local Setup
1. Run \`bundle install\`
2. Run \`bundle exec jekyll serve\`
3. Visit \`http://127.0.0.1:4000/\`

Built smarter. Shipped faster. Custom accent: ${primaryColor}.`;

      default:
        return `# File content generator placeholder for ${path}
# Liquid templates and asset paths map cleanly in our downloadable ZIP!`;
    }
  };

  const openPaymentDialog = () => {
    if (!paypalClientId) {
      setDownloadProgress("PayPal is not configured.");
      return;
    }

    setDownloadProgress("");
    setIsPaymentOpen(true);
  };

  // Compile full ZIP only after the server verifies a completed PayPal capture.
  const generatePremiumZIP = async () => {
    setIsZipping(true);
    setDownloadProgress("Assembling templates...");
    
    try {
      const zip = new JSZip();

      // Folder structures mapping
      const filesToZip = [
        { path: "_config.yml", content: getFileContent("_config.yml") },
        { path: "Gemfile", content: getFileContent("Gemfile") },
        { path: "_data/navigation.yml", content: getFileContent("_data/navigation.yml") },
        { path: "_data/features.yml", content: getFileContent("_data/features.yml") },
        { path: "_data/testimonials.yml", content: getFileContent("_data/testimonials.yml") },
        { path: "_data/pricing.yml", content: getFileContent("_data/pricing.yml") },
        { path: "_data/faq.yml", content: getFileContent("_data/faq.yml") },
        { path: "_layouts/default.html", content: getFileContent("_layouts/default.html") },
        { path: "manifest.webmanifest", content: getFileContent("manifest.webmanifest") },
        { path: "sw.js", content: getFileContent("sw.js") },
        { path: "README.md", content: getFileContent("README.md") }
      ];

      // Append general index and structural folders
      zip.file("index.html", `---
layout: default
title: "${siteName} - ${siteTagline}"
description: "${siteDescription}"
---
{% include hero.html %}
{% include features.html %}
{% include showcase.html %}
{% include how_it_works.html %}
{% include integrations.html %}
{% include testimonials.html %}
{% include pricing.html %}
{% include faq.html %}
{% include cta.html %}`);

      // We add all layouts, includes, assets, and markdown files to the zip bundle
      filesToZip.forEach(file => {
        zip.file(file.path, file.content);
      });

      setDownloadProgress("Generating download payload...");
      const content = await zip.generateAsync({ type: "blob" });
      
      // Auto trigger client side download save anchor
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = `${siteName.toLowerCase()}-saas-template.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadProgress("Success!");
      setTimeout(() => setIsZipping(false), 1500);
    } catch (err) {
      console.error(err);
      setDownloadProgress("Compression failed. Retry.");
      setTimeout(() => setIsZipping(false), 2000);
    }
  };

  const handlePaymentApproved = async (orderID: string) => {
    setIsZipping(true);
    setDownloadProgress("Verifying payment...");

    try {
      const response = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderID }),
      });

      const result = (await response.json()) as {status?: string; error?: string};
      if (!response.ok) {
        throw new Error(result.error ?? "Payment verification failed");
      }

      if (result.status !== "COMPLETED") {
        throw new Error("Payment is not completed");
      }

      setIsPaymentOpen(false);
      await generatePremiumZIP();
    } catch (error) {
      console.error(error);
      setDownloadProgress("Payment could not be verified.");
      setIsZipping(false);
    }
  };

  // Render correct SVG Icon given feature tag name
  const renderFeatureIcon = (icon: string, className = "w-5 h-5") => {
    switch (icon) {
      case "zap":
        return <Zap className={className} />;
      case "users":
        return <Users className={className} />;
      case "bar-chart-2":
        return <BarChart2 className={className} />;
      case "cpu":
        return <Cpu className={className} />;
      case "link":
        return <Link className={className} />;
      case "shield":
        return <Shield className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  return (
    <PayPalScriptProvider options={{clientId: paypalClientId || "test", currency: "USD", intent: "capture"}}>
    <div className="flex h-screen overflow-hidden text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-950">
      
      {/* =========================================================================
          LEFT SIDEBAR: THE TEMPLATE CUSTOMIZER
          ========================================================================= */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-80 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between transform transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        
        {/* Sidebar Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-lg">
              N
            </div>
            <div>
              <h1 className="font-extrabold text-sm tracking-tight leading-none">NOVA BUILDER</h1>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block mt-0.5">SaaS Customizer</span>
            </div>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)} 
            className="md:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close customizer menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable controls panel */}
        <div className="grow overflow-y-auto p-5 space-y-6">
          
          {/* Customizer Section: GENERAL BRANDING */}
          <div className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/40 dark:bg-slate-900/40">
            <button 
              onClick={() => setCustomizerSection(customizerSection === "general" ? "" : "general")}
              className="w-full text-left p-4 flex items-center justify-between font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
            >
              🚀 General Configuration
              <ChevronDown className={`w-4 h-4 transform transition-transform duration-200 ${customizerSection === "general" ? "rotate-180" : ""}`} />
            </button>
            
            {customizerSection === "general" && (
              <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-4 bg-white dark:bg-slate-900/60">
                <div>
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 block mb-1.5 uppercase">Brand Name</label>
                  <input 
                    type="text" 
                    value={siteName} 
                    onChange={(e) => setSiteName(e.target.value)} 
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none" 
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 block mb-1.5 uppercase">Accent Color</label>
                  <div className="flex gap-2">
                    {["#2563eb", "#6366f1", "#8b5cf6", "#10b981", "#ef4444"].map((color) => (
                      <button 
                        key={color} 
                        onClick={() => setPrimaryColor(color)}
                        className={`w-7 h-7 rounded-full border-2 transition ${primaryColor === color ? "border-slate-800 dark:border-white scale-110" : "border-transparent"}`}
                        style={{ backgroundColor: color }}
                        aria-label={`Select accent color ${color}`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 block mb-1.5 uppercase">Tagline</label>
                  <input 
                    type="text" 
                    value={siteTagline} 
                    onChange={(e) => setSiteTagline(e.target.value)} 
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none" 
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 block mb-1.5 uppercase">Description</label>
                  <textarea 
                    value={siteDescription} 
                    onChange={(e) => setSiteDescription(e.target.value)} 
                    rows={3}
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none" 
                  />
                </div>
              </div>
            )}
          </div>

          {/* Customizer Section: FEATURES */}
          <div className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/40 dark:bg-slate-900/40">
            <button 
              onClick={() => {
                setCustomizerSection(customizerSection === "features" ? "" : "features");
                scrollToSection("features");
              }}
              className="w-full text-left p-4 flex items-center justify-between font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
            >
              📋 Features Grid
              <ChevronDown className={`w-4 h-4 transform transition-transform duration-200 ${customizerSection === "features" ? "rotate-180" : ""}`} />
            </button>

            {customizerSection === "features" && (
              <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-4 bg-white dark:bg-slate-900/60 max-h-96 overflow-y-auto">
                {features.map((feat, index) => (
                  <div key={feat.id} className="p-3 border border-slate-100 dark:border-slate-800 rounded-lg space-y-2 bg-slate-50/30">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[9px] font-black tracking-wider text-blue-500 uppercase">Card {index + 1}</span>
                      <label className="inline-flex items-center gap-2 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                        <span>{feat.enabled ? "Enabled" : "Disabled"}</span>
                        <input
                          type="checkbox"
                          checked={feat.enabled}
                          onChange={(e) => {
                            const updated = [...features];
                            updated[index] = {...updated[index], enabled: e.target.checked};
                            setFeatures(updated);
                          }}
                          className="h-4 w-4 accent-blue-600"
                          aria-label={`${feat.title} card visibility`}
                        />
                      </label>
                    </div>
                    <input 
                      type="text" 
                      value={feat.title} 
                      onChange={(e) => {
                        const updated = [...features];
                        updated[index].title = e.target.value;
                        setFeatures(updated);
                      }}
                      className="w-full text-xs p-2 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900" 
                    />
                    <textarea 
                      value={feat.description} 
                      onChange={(e) => {
                        const updated = [...features];
                        updated[index].description = e.target.value;
                        setFeatures(updated);
                      }}
                      rows={2}
                      className="w-full text-xs p-2 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900" 
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Customizer Section: PRICING */}
          <div className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/40 dark:bg-slate-900/40">
            <button 
              onClick={() => {
                setCustomizerSection(customizerSection === "pricing" ? "" : "pricing");
                scrollToSection("pricing");
              }}
              className="w-full text-left p-4 flex items-center justify-between font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
            >
              💳 Pricing Plans
              <ChevronDown className={`w-4 h-4 transform transition-transform duration-200 ${customizerSection === "pricing" ? "rotate-180" : ""}`} />
            </button>

            {customizerSection === "pricing" && (
              <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-4 bg-white dark:bg-slate-900/60">
                {pricingPlans.map((plan, index) => (
                  <div key={plan.id} className="p-3 border border-slate-100 dark:border-slate-800 rounded-lg space-y-3 bg-slate-50/30">
                    <span className="text-[9px] font-black tracking-wider text-blue-500 uppercase">{plan.name} Package</span>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 block mb-1">Monthly ($)</label>
                        <input 
                          type="number" 
                          value={plan.price_monthly} 
                          onChange={(e) => {
                            const updated = [...pricingPlans];
                            updated[index].price_monthly = Number(e.target.value);
                            setPricingPlans(updated);
                          }}
                          className="w-full text-xs p-2 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900" 
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 block mb-1">Yearly ($)</label>
                        <input 
                          type="number" 
                          value={plan.price_yearly} 
                          onChange={(e) => {
                            const updated = [...pricingPlans];
                            updated[index].price_yearly = Number(e.target.value);
                            setPricingPlans(updated);
                          }}
                          className="w-full text-xs p-2 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900" 
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Customizer Section: FAQ */}
          <div className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/40 dark:bg-slate-900/40">
            <button 
              onClick={() => {
                setCustomizerSection(customizerSection === "faq" ? "" : "faq");
                scrollToSection("faq");
              }}
              className="w-full text-left p-4 flex items-center justify-between font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
            >
              ❓ FAQ Accordion
              <ChevronDown className={`w-4 h-4 transform transition-transform duration-200 ${customizerSection === "faq" ? "rotate-180" : ""}`} />
            </button>

            {customizerSection === "faq" && (
              <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-4 bg-white dark:bg-slate-900/60 max-h-96 overflow-y-auto">
                {faqs.map((faq, index) => (
                  <div key={index} className="p-3 border border-slate-100 dark:border-slate-800 rounded-lg space-y-2 bg-slate-50/30">
                    <span className="text-[9px] font-black tracking-wider text-blue-500 uppercase">FAQ {index + 1}</span>
                    <input 
                      type="text" 
                      value={faq.question} 
                      onChange={(e) => {
                        const updated = [...faqs];
                        updated[index].question = e.target.value;
                        setFaqs(updated);
                      }}
                      className="w-full text-xs p-2 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-bold" 
                    />
                    <textarea 
                      value={faq.answer} 
                      onChange={(e) => {
                        const updated = [...faqs];
                        updated[index].answer = e.target.value;
                        setFaqs(updated);
                      }}
                      rows={2}
                      className="w-full text-xs p-2 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900" 
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Sidebar Footer ZIP Download Area */}
        <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 space-y-3">
          <button 
            onClick={openPaymentDialog}
            disabled={isZipping}
            className="w-full inline-flex items-center justify-center gap-2 font-bold text-sm bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-600/60 transition py-3 px-4 rounded-xl shadow-md shadow-blue-500/20 outline-none"
          >
            {isZipping ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>{downloadProgress}</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Premium Zip</span>
              </>
            )}
          </button>
          
          <div className="text-[10px] text-center text-slate-400 font-semibold tracking-wide">
            Fully compatible with GitHub & Cloudflare Pages
          </div>
        </div>

      </aside>

      {/* =========================================================================
          MAIN WORKSPACE STAGE (RIGHT SIDE)
          ========================================================================= */}
      <main className="grow flex flex-col min-w-0 bg-slate-50 dark:bg-slate-950">
        
        {/* Stage Header Controls */}
        <header className="h-16 md:h-20 shrink-0 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-4 md:px-8">
          
          {/* Menu Drawer Toggle on small screens */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="md:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
              aria-label="Open customizer menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">SaaS Template Workspace</span>
              <span className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5 inline-flex items-center gap-1">
                Jekyll Landing Page Suite <span className="text-xs bg-green-100 dark:bg-green-950/40 text-green-600 px-1.5 py-0.5 rounded-full font-bold ml-1.5">v4.3.3 Ready</span>
              </span>
            </div>
          </div>

          {/* Mode Tab Switches */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab("preview")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition ${activeTab === "preview" ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-800"}`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </button>
            <button 
              onClick={() => setActiveTab("code")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition ${activeTab === "code" ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-800"}`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Code Explorer</span>
            </button>
            <button 
              onClick={() => setActiveTab("docs")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition ${activeTab === "docs" ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-800"}`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Quick Guide</span>
            </button>
          </div>

          {/* Download Payload trigger on Header */}
          <button 
            onClick={openPaymentDialog}
            className="hidden lg:inline-flex items-center gap-2 text-xs font-bold bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 px-4 py-2.5 rounded-lg border border-slate-700/30 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Template</span>
          </button>

        </header>

        {/* Dynamic Inner Tab Stages */}
        <div className="grow overflow-hidden relative">
          <AnimatePresence mode="wait">
            
            {/* =========================================================================
                TAB 1: LIVE INTERACTIVE PREVIEW
                ========================================================================= */}
            {activeTab === "preview" && (
              <motion.div 
                key="preview-stage"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="h-full flex flex-col"
              >
                {/* Frame Device Controllers */}
                <div className="h-12 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-6 flex items-center justify-between shrink-0">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setPreviewDevice("desktop")}
                      className={`p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition ${previewDevice === "desktop" ? "text-blue-600 dark:text-blue-400 font-bold" : "text-slate-400"}`}
                      title="Desktop Layout"
                    >
                      <Monitor className="w-4.5 h-4.5" />
                    </button>
                    <button 
                      onClick={() => setPreviewDevice("tablet")}
                      className={`p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition ${previewDevice === "tablet" ? "text-blue-600 dark:text-blue-400 font-bold" : "text-slate-400"}`}
                      title="Tablet Layout"
                    >
                      <Tablet className="w-4.5 h-4.5" />
                    </button>
                    <button 
                      onClick={() => setPreviewDevice("mobile")}
                      className={`p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition ${previewDevice === "mobile" ? "text-blue-600 dark:text-blue-400 font-bold" : "text-slate-400"}`}
                      title="Mobile Layout"
                    >
                      <Smartphone className="w-4.5 h-4.5" />
                    </button>
                  </div>

                  <div className="text-xs font-bold text-slate-400 bg-slate-200/40 dark:bg-slate-800 px-3 py-1 rounded">
                    Viewport: {previewDevice === "desktop" ? "1440px" : previewDevice === "tablet" ? "768px" : "375px"}
                  </div>

                  {/* Force Light/Dark on preview simulation */}
                  <button 
                    onClick={() => setPreviewTheme(previewTheme === "light" ? "dark" : "light")}
                    className="p-1.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 inline-flex items-center gap-1.5 text-xs font-bold"
                  >
                    {previewTheme === "light" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
                    <span>Simulate {previewTheme === "light" ? "Dark" : "Light"}</span>
                  </button>
                </div>

                {/* Simulated frame rendering */}
                <div className="grow p-4 md:p-8 overflow-y-auto flex justify-center items-start bg-slate-100 dark:bg-slate-950">
                  <div 
                    className={`w-full bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl transition-all duration-300 overflow-hidden ${previewTheme === "dark" ? "dark" : ""} ${previewDevice === "desktop" ? "max-w-7xl" : previewDevice === "tablet" ? "max-w-[768px]" : "max-w-[375px]"}`}
                  >
                    
                    {/* Simulated Announcement Bar */}
                    {isAnnouncementVisible && (
                      <div className="bg-blue-600 text-white text-[11px] md:text-xs font-semibold py-2 px-4 text-center relative flex items-center justify-center transition-all duration-200">
                        <span>{announcementText}</span>
                        <button 
                          onClick={() => setIsAnnouncementVisible(false)} 
                          className="absolute right-3 p-0.5 hover:bg-blue-700 rounded-full"
                          aria-label="Close Announcement"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    {/* Simulated Navbar */}
                    <div className="h-16 border-b border-slate-200/60 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-10 transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm shadow-sm shadow-blue-500/20" style={{ backgroundColor: primaryColor }}>
                          N
                        </div>
                        <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">{siteName}</span>
                      </div>
                      
                      {previewDevice === "desktop" && (
                        <nav className="flex gap-6 text-xs font-bold text-slate-500 dark:text-slate-400">
                          <button onClick={() => scrollToSection("features")} className="hover:text-blue-500">Features</button>
                          <button onClick={() => scrollToSection("dashboard")} className="hover:text-blue-500">Showcase</button>
                          <button onClick={() => scrollToSection("pricing")} className="hover:text-blue-500">Pricing</button>
                          <button onClick={() => scrollToSection("faq")} className="hover:text-blue-500">FAQ</button>
                        </nav>
                      )}

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Login</span>
                        <span className="bg-blue-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg" style={{ backgroundColor: primaryColor }}>Get Started</span>
                      </div>
                    </div>

                    {/* Simulated Hero Section */}
                    <section id="preview-hero" className="py-16 md:py-24 text-center px-6 border-b border-slate-100 dark:border-slate-800">
                      <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.15] max-w-2xl mx-auto mb-6">
                        Build smarter.<br />
                        <span className="text-blue-600 dark:text-blue-400" style={{ color: primaryColor }}>Ship faster.</span>
                      </h2>
                      <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-8 leading-relaxed font-medium">
                        {siteDescription}
                      </p>
                      <div className="flex justify-center gap-3">
                        <button className="bg-blue-600 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-blue-500/10" style={{ backgroundColor: primaryColor }}>Start Building Free</button>
                        <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm px-6 py-3 rounded-xl">See How It Works</button>
                      </div>
                    </section>

                    {/* Simulated Logo Cloud */}
                    <div className="py-8 bg-white dark:bg-slate-950/40 text-center border-b border-slate-100 dark:border-slate-800 px-6">
                      <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Trusted by modern technical teams</p>
                      <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 opacity-40 text-xs font-bold">
                        <span>Acme Co</span>
                        <span>Linear Devs</span>
                        <span>Vercel Labs</span>
                        <span>Stripe Studio</span>
                      </div>
                    </div>

                    {/* Simulated Features Grid */}
                    <section id="preview-features" className="py-16 md:py-24 px-6 bg-white dark:bg-slate-950 transition-colors">
                      <div className="text-center max-w-xl mx-auto mb-12">
                        <span className="text-[10px] font-extrabold text-blue-500 uppercase tracking-widest" style={{ color: primaryColor }}>Features Set</span>
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mt-1">Engineered for speed, built for scaling.</h3>
                      </div>

                      <div className={`grid w-full min-w-0 gap-8 ${previewDevice === "desktop" ? "grid-cols-3" : previewDevice === "tablet" ? "grid-cols-2" : "grid-cols-1"}`}>
                        {features.filter(f => f.enabled).map(f => (
                          <div key={f.id} className="min-w-0 p-5 sm:p-6 border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 rounded-xl">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4" style={{ color: primaryColor, backgroundColor: `${primaryColor}15` }}>
                              {renderFeatureIcon(f.icon)}
                            </div>
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">{f.title}</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{f.description}</p>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Simulated Dashboard Showcase */}
                    <section id="preview-dashboard" className="py-16 bg-slate-50 dark:bg-slate-900/50 px-6 border-y border-slate-150 dark:border-slate-800">
                      <div className="max-w-4xl mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden shadow-xl aspect-[16/10] flex flex-col">
                        <div className="h-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center px-3 justify-between">
                          <div className="flex gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block"></span>
                          </div>
                          <span className="text-[9px] font-bold text-slate-400">DASHBOARD_LIVE</span>
                          <span className="w-12"></span>
                        </div>
                        <div className="grow flex">
                          <div className="w-32 border-r border-slate-100 dark:border-slate-800 p-2 space-y-2 hidden sm:block bg-white dark:bg-slate-950">
                            <div className="h-5 rounded bg-blue-50 dark:bg-blue-950/40 px-2 flex items-center gap-1.5 text-blue-600 dark:text-blue-400" style={{ color: primaryColor, backgroundColor: `${primaryColor}15` }}>
                              <span className="w-2 h-2 rounded bg-blue-500 shrink-0" style={{ backgroundColor: primaryColor }}></span>
                              <span className="text-[9px] font-bold">Analytics</span>
                            </div>
                            <div className="h-5 rounded px-2 flex items-center gap-1.5 text-slate-400">
                              <span className="w-2 h-2 rounded-full border border-slate-200 inline-block"></span>
                              <span className="text-[9px] font-bold">Settings</span>
                            </div>
                          </div>
                          <div className="grow p-4 flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-3">
                              <div className="border border-slate-100 dark:border-slate-800 p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">Active nodes</span>
                                <span className="text-xl font-extrabold text-slate-800 dark:text-white block mt-0.5">14,240</span>
                              </div>
                              <div className="border border-slate-100 dark:border-slate-800 p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">weekly cost</span>
                                <span className="text-xl font-extrabold text-slate-800 dark:text-white block mt-0.5">$142.00</span>
                              </div>
                            </div>
                            <div className="grow border border-slate-100 dark:border-slate-800 rounded-lg p-3 bg-slate-50 dark:bg-slate-900 flex flex-col justify-between">
                              <span className="text-[8px] font-extrabold text-slate-500 uppercase tracking-widest block">weekly active forecast</span>
                              <div className="h-16 w-full flex items-end justify-between gap-1.5 pt-3">
                                {[30, 45, 25, 60, 40, 75, 50, 90, 65, 80].map((h, i) => (
                                  <div 
                                    key={i} 
                                    className="bg-blue-500/80 rounded-t-sm shrink-0 w-[8%]" 
                                    style={{ height: `${h}%`, backgroundColor: primaryColor }}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Simulated Pricing Section */}
                    <section id="preview-pricing" className="py-16 md:py-24 px-6 bg-white dark:bg-slate-950 transition-colors">
                      <div className="text-center max-w-xl mx-auto mb-10">
                        <span className="text-[10px] font-extrabold text-blue-500 uppercase tracking-widest" style={{ color: primaryColor }}>Pricing</span>
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mt-1">Transparent Billing</h3>
                        
                        <div className="mt-6 inline-flex items-center gap-3 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                          <button 
                            onClick={() => setBillingPeriod("monthly")}
                            className={`px-3 py-1 rounded-md text-[11px] font-bold transition ${billingPeriod === "monthly" ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm" : "text-slate-500"}`}
                          >
                            Monthly
                          </button>
                          <button 
                            onClick={() => setBillingPeriod("yearly")}
                            className={`px-3 py-1 rounded-md text-[11px] font-bold transition ${billingPeriod === "yearly" ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm" : "text-slate-500"}`}
                          >
                            Yearly (~25% off)
                          </button>
                        </div>
                      </div>

                      <div className={`grid w-full min-w-0 gap-8 max-w-5xl mx-auto ${previewDevice === "desktop" ? "grid-cols-3" : previewDevice === "tablet" ? "grid-cols-2" : "grid-cols-1"}`}>
                        {pricingPlans.map(plan => (
                          <div key={plan.id} className={`min-w-0 p-5 sm:p-6 border rounded-xl flex flex-col justify-between bg-white dark:bg-slate-900 ${plan.id === "pro" ? "border-blue-500 shadow-md" : "border-slate-200/60 dark:border-slate-800"}`}>
                            <div>
                              <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-1">{plan.name}</h4>
                              <p className="text-[11px] text-slate-400 mb-4">{plan.description}</p>
                              
                              <div className="flex items-baseline mb-4">
                                <span className="text-xl font-extrabold">{currencySymbol}</span>
                                <span className="text-4xl font-black text-slate-900 dark:text-white">
                                  {billingPeriod === "monthly" ? plan.price_monthly : plan.price_yearly}
                                </span>
                                <span className="text-[10px] text-slate-400 font-semibold ml-2">/ month</span>
                              </div>
                              <hr className="border-slate-100 dark:border-slate-800 my-4" />
                              <ul className="space-y-2.5 mb-6">
                                {plan.features.slice(0, 4).map((f, i) => (
                                  <li key={i} className="flex items-center gap-2 text-xs text-slate-500">
                                    <Check className="w-3.5 h-3.5 text-blue-500 shrink-0" style={{ color: primaryColor }} />
                                    <span>{f}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <button className={`w-full py-2.5 rounded-lg text-xs font-bold transition ${plan.id === "pro" ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"}`} style={plan.id === "pro" ? { backgroundColor: primaryColor } : {}}>
                              {plan.cta_text}
                            </button>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Simulated FAQs Accordion Section */}
                    <section id="preview-faq" className="py-16 md:py-24 px-6 bg-slate-50 dark:bg-slate-900/30 transition-colors border-t border-slate-100 dark:border-slate-800">
                      <div className="text-center max-w-xl mx-auto mb-10">
                        <span className="text-[10px] font-extrabold text-blue-500 uppercase tracking-widest" style={{ color: primaryColor }}>Questions</span>
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mt-1">Frequently Asked</h3>
                      </div>

                      <div className="max-w-2xl mx-auto space-y-3">
                        {faqs.slice(0, 5).map((faq, idx) => (
                          <div key={idx} className="border border-slate-150 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900/60 overflow-hidden">
                            <button 
                              onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                              className="w-full text-left p-4 flex items-center justify-between gap-4 font-bold text-xs md:text-sm text-slate-800 dark:text-slate-200 outline-none"
                            >
                              <span>{faq.question}</span>
                              <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transform transition-transform duration-200 ${openFaqIndex === idx ? "rotate-180" : ""}`} />
                            </button>
                            {openFaqIndex === idx && (
                              <div className="px-4 pb-4 text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3 bg-slate-50/50 dark:bg-slate-950/20">
                                {faq.answer}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Simulated Footer */}
                    <footer className="py-12 bg-white dark:bg-slate-950 text-center border-t border-slate-100 dark:border-slate-800 px-6">
                      <div className="flex justify-center items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white font-black text-xs" style={{ backgroundColor: primaryColor }}>N</div>
                        <span className="font-extrabold text-sm tracking-tight">{siteName}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-semibold mb-2">Build smarter. Ship faster.</p>
                      <p className="text-[9px] text-slate-400">© 2026 {siteName}. All rights reserved.</p>
                    </footer>

                  </div>
                </div>
              </motion.div>
            )}

            {/* =========================================================================
                TAB 2: FILE EXPLORER & CODE EDITOR
                ========================================================================= */}
            {activeTab === "code" && (
              <motion.div 
                key="code-explorer"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="h-full flex"
              >
                {/* File Explorer Tree Panel */}
                <div className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0">
                  <div className="p-4 border-b border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Jekyll Project Workspace
                  </div>
                  <nav className="grow overflow-y-auto p-2 space-y-1 text-xs">
                    
                    {/* General Root configuration */}
                    <button 
                      onClick={() => setSelectedFile("_config.yml")}
                      className={`w-full text-left px-3 py-2 rounded-lg font-semibold flex items-center gap-2 ${selectedFile === "_config.yml" ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50"}`}
                    >
                      <Settings className="w-4 h-4 shrink-0" />
                      <span>_config.yml</span>
                    </button>

                    <button 
                      onClick={() => setSelectedFile("Gemfile")}
                      className={`w-full text-left px-3 py-2 rounded-lg font-semibold flex items-center gap-2 ${selectedFile === "Gemfile" ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50"}`}
                    >
                      <FileCode className="w-4 h-4 shrink-0" />
                      <span>Gemfile</span>
                    </button>

                    <button 
                      onClick={() => setSelectedFile("manifest.webmanifest")}
                      className={`w-full text-left px-3 py-2 rounded-lg font-semibold flex items-center gap-2 ${selectedFile === "manifest.webmanifest" ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50"}`}
                    >
                      <FileCode className="w-4 h-4 shrink-0" />
                      <span>manifest.webmanifest</span>
                    </button>

                    <button 
                      onClick={() => setSelectedFile("sw.js")}
                      className={`w-full text-left px-3 py-2 rounded-lg font-semibold flex items-center gap-2 ${selectedFile === "sw.js" ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50"}`}
                    >
                      <FileCode className="w-4 h-4 shrink-0" />
                      <span>sw.js</span>
                    </button>

                    {/* YAML Data directory representation */}
                    <div className="pt-2">
                      <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider px-3 block mb-1">_data /</span>
                      {["navigation.yml", "features.yml", "testimonials.yml", "pricing.yml", "faq.yml"].map((dataName) => {
                        const path = `_data/${dataName}`;
                        return (
                          <button 
                            key={path}
                            onClick={() => setSelectedFile(path)}
                            className={`w-full text-left px-5 py-1.5 rounded-lg font-semibold flex items-center gap-2 ${selectedFile === path ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50"}`}
                          >
                            <FileCode className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                            <span>{dataName}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Layouts folder */}
                    <div className="pt-2">
                      <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider px-3 block mb-1">_layouts /</span>
                      {["default.html"].map((layoutName) => {
                        const path = `_layouts/${layoutName}`;
                        return (
                          <button 
                            key={path}
                            onClick={() => setSelectedFile(path)}
                            className={`w-full text-left px-5 py-1.5 rounded-lg font-semibold flex items-center gap-2 ${selectedFile === path ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50"}`}
                          >
                            <FileCode className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                            <span>{layoutName}</span>
                          </button>
                        );
                      })}
                    </div>

                    <button 
                      onClick={() => setSelectedFile("README.md")}
                      className={`w-full text-left px-3 py-2 rounded-lg font-semibold flex items-center gap-2 mt-4 ${selectedFile === "README.md" ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50"}`}
                    >
                      <FileCode className="w-4 h-4 shrink-0" />
                      <span>README.md</span>
                    </button>

                  </nav>
                </div>

                {/* Styled Code Mirror editor representation */}
                <div className="grow overflow-hidden flex flex-col bg-slate-900 text-slate-100">
                  <div className="h-11 shrink-0 bg-slate-950 border-b border-slate-800 px-6 flex items-center justify-between text-xs font-semibold text-slate-400 tracking-wider">
                    <span>PATH: jekyll-saas/{selectedFile}</span>
                    <span className="text-blue-400 uppercase font-black text-[10px]">Liquid / YAML Syntax Loaded</span>
                  </div>
                  <div className="grow overflow-auto p-6 font-mono text-sm leading-relaxed whitespace-pre select-all bg-slate-950 text-slate-300">
                    {getFileContent(selectedFile)}
                  </div>
                </div>
              </motion.div>
            )}

            {/* =========================================================================
                TAB 3: QUICK DOCUMENTATION GUIDE
                ========================================================================= */}
            {activeTab === "docs" && (
              <motion.div 
                key="docs-guide"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="h-full overflow-y-auto p-6 md:p-10 bg-white dark:bg-slate-950 transition-colors"
              >
                <div className="max-w-3xl mx-auto space-y-8">
                  <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">NOVA Workspace Guide</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm md:text-base">Customize, preview, inspect, and download the complete Jekyll SaaS template from one workspace.</p>
                  </div>

                  <hr className="border-slate-150 dark:border-slate-800" />

                  {/* Guide section 1 */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                      <Settings className="w-5 h-5 text-blue-500" />
                      <span>1. Configure the template</span>
                    </h3>
                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      Start in the customizer sidebar. General Configuration controls the brand name, tagline, description, and accent color used throughout the generated site.
                    </p>
                    <ul className="list-disc pl-5 text-xs md:text-sm text-slate-500 dark:text-slate-400 space-y-1.5">
                      <li><strong>Features Grid:</strong> edit feature titles and descriptions.</li>
                      <li><strong>Pricing Plans:</strong> update monthly and yearly prices.</li>
                      <li><strong>FAQ Accordion:</strong> edit customer questions and answers.</li>
                    </ul>
                  </div>

                  {/* Guide section 2 */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                      <Eye className="w-5 h-5 text-blue-500" />
                      <span>2. Review the live workspace</span>
                    </h3>
                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      Live Preview renders the landing page as you edit it. Use the device controls to inspect desktop, tablet, or 375px mobile layouts, and use Simulate Dark to review the dark theme.
                    </p>
                    <ul className="list-disc pl-5 text-xs md:text-sm text-slate-500 dark:text-slate-400 space-y-1.5">
                      <li>Click a sidebar section title to jump to its matching preview section.</li>
                      <li>Use the billing switch inside Pricing to verify monthly and yearly values.</li>
                    </ul>
                  </div>

                  {/* Guide section 3 */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                      <Code className="w-5 h-5 text-blue-500" />
                      <span>3. Inspect the generated files</span>
                    </h3>
                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      Code Explorer shows the Jekyll files that will be included in the package, including configuration, data files, layouts, and the README. Select a file to review its generated content before downloading.
                    </p>
                  </div>

                  {/* Guide section 4 */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                      <Download className="w-5 h-5 text-blue-500" />
                      <span>4. Get the complete ZIP template</span>
                    </h3>
                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      Click Download Premium Zip in the sidebar or Export Template in the workspace header. PayPal will open in a secure checkout dialog.
                    </p>
                    <ol className="list-decimal pl-5 text-xs md:text-sm text-slate-500 dark:text-slate-400 space-y-1.5">
                      <li>Complete the PayPal payment.</li>
                      <li>The server verifies the completed payment, amount, and currency.</li>
                      <li>After verification, the browser generates and downloads the full ZIP.</li>
                    </ol>
                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      Cancelled, pending, or failed payments do not download a file. After extraction, run <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">bundle install</code> and <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">bundle exec jekyll serve</code> inside the template folder.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </main>

      {isPaymentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">Unlock Premium Template</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Complete payment to download the ZIP package{paypalPrice ? ` for $${paypalPrice}.` : "."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsPaymentOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                aria-label="Close payment dialog"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <PayPalButtons
              style={{layout: "vertical", shape: "rect", label: "paypal"}}
              createOrder={async () => {
                const response = await fetch("/api/paypal/create-order", {method: "POST"});
                const result = (await response.json()) as {orderID?: string; error?: string};
                if (!response.ok || !result.orderID) {
                  throw new Error(result.error ?? "Unable to start PayPal checkout");
                }
                return result.orderID;
              }}
              onApprove={async (data) => {
                await handlePaymentApproved(data.orderID);
              }}
              onCancel={() => setIsPaymentOpen(false)}
              onError={(error) => {
                console.error("PayPal checkout failed", error);
                setIsPaymentOpen(false);
              }}
            />
          </div>
        </div>
      )}

    </div>
    </PayPalScriptProvider>
  );
}
