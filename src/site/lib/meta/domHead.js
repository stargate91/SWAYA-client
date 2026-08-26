/**
 * Updates or creates a <meta> element in document.head
 */
export function setMetaTag(attrName, attrVal, content) {
  if (!content || typeof document === 'undefined') return;
  let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrVal);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Updates or creates a <link rel="canonical"> element in document.head
 */
export function setCanonicalUrl(url) {
  if (!url || typeof document === 'undefined') return;
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

/**
 * Updates or creates a <script type="application/ld+json"> element in document.head
 */
export function setJsonLd(id, data) {
  if (!id || typeof document === 'undefined') return;
  try {
    let script = document.getElementById(id);
    if (!data) {
      if (script) script.remove();
      return;
    }
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data, null, 2);
  } catch {
    // Safe DOM fallback
  }
}

/**
 * Cleans up injected JSON-LD scripts on component unmount
 */
export function cleanupJsonLd(jsonLd) {
  if (typeof document === 'undefined') return;
  try {
    if (jsonLd && typeof jsonLd === 'object') {
      Object.keys(jsonLd).forEach((id) => {
        setJsonLd(id, null);
      });
    }
  } catch {
    // Safe cleanup
  }
}
