import fs from 'node:fs';
import path from 'node:path';
import { BASE_URL, BUILD_DIR } from './constants.js';

export function getHrefLangTags(pathSuffix = '') {
  const cleanPath = pathSuffix.startsWith('/') ? pathSuffix : (pathSuffix ? '/' + pathSuffix : '');
  let tags = '';
  tags += `\n  <link rel="alternate" hreflang="x-default" href="${BASE_URL}${cleanPath || '/'}" />`;
  tags += `\n  <link rel="alternate" hreflang="en" href="${BASE_URL}${cleanPath || '/'}" />`;
  tags += `\n  <link rel="alternate" hreflang="de" href="${BASE_URL}/de${cleanPath}" />`;
  tags += `\n  <link rel="alternate" hreflang="ja" href="${BASE_URL}/ja${cleanPath}" />`;
  tags += `\n  <link rel="alternate" hreflang="hu" href="${BASE_URL}/hu${cleanPath}" />`;
  tags += `\n  <link rel="alternate" hreflang="fr" href="${BASE_URL}/fr${cleanPath}" />`;
  tags += `\n  <link rel="alternate" hreflang="es" href="${BASE_URL}/es${cleanPath}" />`;
  tags += `\n  <link rel="alternate" hreflang="zh" href="${BASE_URL}/zh${cleanPath}" />`;
  tags += `\n  <link rel="alternate" hreflang="it" href="${BASE_URL}/it${cleanPath}" />`;
  tags += `\n  <link rel="alternate" hreflang="ru" href="${BASE_URL}/ru${cleanPath}" />`;
  tags += `\n  <link rel="alternate" hreflang="pt" href="${BASE_URL}/pt${cleanPath}" />`;
  tags += `\n  <link rel="alternate" hreflang="ko" href="${BASE_URL}/ko${cleanPath}" />`;
  tags += `\n  <link rel="alternate" hreflang="nl" href="${BASE_URL}/nl${cleanPath}" />`;
  tags += `\n  <link rel="alternate" hreflang="pl" href="${BASE_URL}/pl${cleanPath}" />`;
  tags += `\n  <link rel="alternate" hreflang="zh-tw" href="${BASE_URL}/zh-tw${cleanPath}" />`;
  tags += `\n  <link rel="alternate" hreflang="sv" href="${BASE_URL}/sv${cleanPath}" />`;
  tags += `\n  <link rel="alternate" hreflang="tr" href="${BASE_URL}/tr${cleanPath}" />`;
  tags += `\n  <link rel="alternate" hreflang="cs" href="${BASE_URL}/cs${cleanPath}" />`;
  return tags;
}

export const OG_LOCALE_MAP = {
  en: 'en_US',
  de: 'de_DE',
  ja: 'ja_JP',
  hu: 'hu_HU',
  fr: 'fr_FR',
  es: 'es_ES',
  zh: 'zh_CN',
  it: 'it_IT',
  ru: 'ru_RU',
  pt: 'pt_BR',
  ko: 'ko_KR',
  nl: 'nl_NL',
  pl: 'pl_PL',
  'zh-tw': 'zh_TW',
  sv: 'sv_SE',
  tr: 'tr_TR',
  cs: 'cs_CZ',
};

export function getOgLocaleTags(locale = 'en') {
  const currentOgLocale = OG_LOCALE_MAP[locale] || 'en_US';
  let tags = `\n  <meta property="og:locale" content="${currentOgLocale}" />`;

  Object.values(OG_LOCALE_MAP).forEach((ogLoc) => {
    if (ogLoc !== currentOgLocale) {
      tags += `\n  <meta property="og:locale:alternate" content="${ogLoc}" />`;
    }
  });

  return tags;
}

export function stripLeadingH1(markdown) {
  if (!markdown) return '';
  return markdown.trimStart().replace(/^#\s+[^\r\n]+(?:\r?\n)*/, '');
}

export function preprocessAlerts(markdown) {
  if (!markdown) return '';
  return markdown.replace(
    /^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*\n((?:>.*\n?)*)/gim,
    (match, type, content) => {
      const cleanContent = content.replace(/^>\s?/gm, '').trim();
      const typeLower = type.toLowerCase();
      return `\n<div class="site-alert site-alert--${typeLower}" data-alert-type="${typeLower}">\n\n<strong>${type.toUpperCase()}</strong>\n\n${cleanContent}\n\n</div>\n`;
    }
  );
}

export function getHashedVideoUrl() {
  const assetsDir = path.join(BUILD_DIR, 'assets');
  if (fs.existsSync(assetsDir)) {
    const files = fs.readdirSync(assetsDir);
    const videoFile = files.find((f) => f.startsWith('action-') && f.endsWith('.mp4'));
    if (videoFile) {
      return `${BASE_URL}/assets/${videoFile}`;
    }
  }
  return `${BASE_URL}/assets/action.mp4`;
}
