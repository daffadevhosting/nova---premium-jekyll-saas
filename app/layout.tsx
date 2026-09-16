import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'NOVA - Premium Jekyll SaaS Template',
  description: 'A highly customizable, production-ready, conversion-oriented premium Jekyll SaaS landing page template with modern visual dashboard, dark mode, sitemap, PWA-ready capabilities, and clean SEO tags.',
  openGraph: {
    title: 'NOVA - Premium Jekyll SaaS Template',
    description: 'A highly customizable, production-ready, conversion-oriented premium Jekyll SaaS landing page template with modern visual dashboard, dark mode, sitemap, PWA-ready capabilities, and clean SEO tags.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOVA - Premium Jekyll SaaS Template',
    description: 'A highly customizable, production-ready, conversion-oriented premium Jekyll SaaS landing page template with modern visual dashboard, dark mode, sitemap, PWA-ready capabilities, and clean SEO tags.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="antialiased min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 transition-colors duration-200">{children}</body>
    </html>
  );
}
