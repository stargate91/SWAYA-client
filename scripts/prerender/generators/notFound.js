export function buildHtmlForNotFound(templateHtml) {
  let html = templateHtml;
  // Normalize root-relative paths for deep 404 URLs
  html = html.replaceAll('src="./', 'src="/');
  html = html.replaceAll('href="./', 'href="/');

  // Update Title & Robots Meta
  html = html.replace(/<title>.*?<\/title>/i, '<title>404 - Page Not Found | SWAYA</title>');
  html = html.replace(
    /<meta name="robots" content=".*?" \/>/i,
    '<meta name="robots" content="noindex, follow" />'
  );

  // Remove home canonical link on 404 error page
  html = html.replace(/<link rel="canonical" href=".*?" \/>/i, '');

  // Update Description & Social Tags
  const desc = 'The page or documentation guide you are looking for does not exist on SWAYA.';
  html = html.replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${desc}" />`);
  html = html.replace(/<meta property="og:title" content=".*?" \/>/i, '<meta property="og:title" content="404 - Page Not Found | SWAYA" />');
  html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${desc}" />`);
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/i, '<meta name="twitter:title" content="404 - Page Not Found | SWAYA" />');
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/i, `<meta name="twitter:description" content="${desc}" />`);

  // Strip JSON-LD structured data from 404 fallback
  html = html.replace(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/i, '');

  return html;
}
