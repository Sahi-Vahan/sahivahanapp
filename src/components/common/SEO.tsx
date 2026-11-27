import React, { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  schema?: Record<string, any> | Array<Record<string, any>>;
  noIndex?: boolean;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = 'used car inspection India, pre purchase car inspection, bike inspection, vehicle forensic audit, car valuation, OBD2 scan, paint depth meter, SahiVahan',
  canonicalUrl,
  ogType = 'website',
  ogImage = '/images/car-inspection-hero.jpg',
  schema,
  noIndex = false,
}) => {
  useEffect(() => {
    // 1. Update Document Title
    const formattedTitle = title.includes('SahiVahan') ? title : `${title} | SahiVahan`;
    document.title = formattedTitle;

    // Helper to set or create meta tag
    const setMetaTag = (attribute: 'name' | 'property', value: string, content: string) => {
      let tag = document.querySelector(`meta[${attribute}="${value}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, value);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description);
    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }
    setMetaTag('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('name', 'author', 'SahiVahan Technologies');

    // 3. Canonical Link Tag
    const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href.split('?')[0] : 'https://sahivahan.com');
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', currentUrl);

    // 4. Open Graph Meta Tags (Facebook / WhatsApp / LinkedIn / Slack)
    setMetaTag('property', 'og:title', formattedTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:site_name', 'SahiVahan');
    setMetaTag('property', 'og:locale', 'en_IN');

    const absoluteImage = ogImage.startsWith('http')
      ? ogImage
      : `${typeof window !== 'undefined' ? window.location.origin : 'https://sahivahan.com'}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;
    setMetaTag('property', 'og:image', absoluteImage);

    // 5. Twitter Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', formattedTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', absoluteImage);
    setMetaTag('name', 'twitter:site', '@sahivahan');

    // 6. JSON-LD Structured Data Schema Injection
    const schemaScriptId = 'sahivahan-dynamic-jsonld';
    let schemaScript = document.getElementById(schemaScriptId) as HTMLScriptElement | null;
    if (schema) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = schemaScriptId;
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    } else if (schemaScript) {
      schemaScript.remove();
    }

    return () => {
      // Clean up dynamic schema when unmounting page
      const el = document.getElementById(schemaScriptId);
      if (el) el.remove();
    };
  }, [title, description, keywords, canonicalUrl, ogType, ogImage, schema, noIndex]);

  return null;
};

