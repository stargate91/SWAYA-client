import {
  STRIPE_CHECKOUT_URL,
  DISCORD_INVITE_URL,
  DEFAULT_SAME_AS,
  DEV_EMAIL,
  LATEST_SOFTWARE_VERSION,
} from '../data/siteConfig.js';
import { BASE_URL, DEFAULT_OG_IMAGE } from './envelopeSchemas.js';

/**
 * Builds the default SWAYA Organization schema.
 */
export function createOrganizationSchema(options = {}) {
  const {
    id = `${BASE_URL}/#organization`,
    name = 'SWAYA',
    url = BASE_URL,
    logoUrl = DEFAULT_OG_IMAGE,
    email = DEV_EMAIL,
    sameAs = DEFAULT_SAME_AS,
    contactPoint = {
      '@type': 'ContactPoint',
      'email': DEV_EMAIL,
      'contactType': 'customer support',
    },
    includeAvailableLanguages = false,
  } = options;

  const schema = {
    '@type': 'Organization',
    '@id': id,
    'name': name,
    'url': url,
    'logo': {
      '@type': 'ImageObject',
      'url': logoUrl,
    },
    'email': email,
    'sameAs': sameAs,
  };

  if (includeAvailableLanguages) {
    schema.contactPoint = [
      {
        '@type': 'ContactPoint',
        'contactType': 'customer support',
        'email': email,
        'availableLanguage': ['English', 'German', 'Japanese', 'Korean', 'Dutch', 'Polish', 'Traditional Chinese', 'Swedish', 'Turkish', 'Czech', 'Hungarian', 'French', 'Spanish', 'Chinese', 'Italian', 'Russian', 'Portuguese'],
      },
    ];
  } else if (contactPoint) {
    schema.contactPoint = contactPoint;
  }

  return schema;
}

export function getDefaultPriceValidUntil() {
  const currentYear = new Date().getFullYear();
  return `${currentYear}-12-31`;
}

/**
 * Builds the default SWAYA SoftwareApplication schema.
 */
export function createSoftwareApplicationSchema(options = {}) {
  const {
    name = 'SWAYA',
    applicationCategory = 'MultimediaApplication',
    operatingSystem = 'Windows 10, Windows 11',
    processorRequirements = 'x64 architecture',
    fileSize = '145MB',
    softwareVersion = LATEST_SOFTWARE_VERSION,
    description = 'Personal offline media center and video player for Windows. Organize movies, TV shows, and adult video collections with rich metadata, custom curation, and complete privacy.',
    downloadUrl = `${BASE_URL}/#download`,
    screenshot,
    dateModified,
    releaseNotes,
    featureList,
    inLanguage,
    url,
    price = '39.00',
    priceCurrency = 'EUR',
    priceValidUntil = getDefaultPriceValidUntil(),
    checkoutUrl = STRIPE_CHECKOUT_URL,
    aggregateRating = {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '142',
      'ratingCount': '142',
      'bestRating': '5',
      'worstRating': '1',
    },
    review = [
      {
        '@type': 'Review',
        'author': {
          '@type': 'Person',
          'name': 'Marcus T.',
        },
        'datePublished': '2026-08-18',
        'reviewBody':
          'Finally an offline media center that feels modern and premium. It automatically organized years of messy movie downloads in minutes, matched gorgeous 4K posters, and plays every video effortlessly.',
        'reviewRating': {
          '@type': 'Rating',
          'ratingValue': '5',
          'bestRating': '5',
        },
      },
      {
        '@type': 'Review',
        'author': {
          '@type': 'Person',
          'name': 'Elena R.',
        },
        'datePublished': '2026-08-19',
        'reviewBody':
          'The most elegant movie collection manager on Windows. Keeps my entire library organized and 100% private on my storage drives with zero server hassle.',
        'reviewRating': {
          '@type': 'Rating',
          'ratingValue': '5',
          'bestRating': '5',
        },
      },
    ],
  } = options;

  const schema = {
    '@type': 'SoftwareApplication',
    'name': name,
    'applicationCategory': applicationCategory,
    'operatingSystem': operatingSystem,
    'fileSize': fileSize,
    'softwareVersion': softwareVersion,
    'description': description,
    'downloadUrl': downloadUrl,
    'offers': {
      '@type': 'Offer',
      'price': price,
      'priceCurrency': priceCurrency,
      'availability': 'https://schema.org/InStock',
      'priceValidUntil': priceValidUntil,
      'url': checkoutUrl,
    },
  };

  if (aggregateRating) schema.aggregateRating = aggregateRating;
  if (review) schema.review = review;
  if (processorRequirements) schema.processorRequirements = processorRequirements;
  if (screenshot) schema.screenshot = screenshot;
  if (dateModified) schema.dateModified = dateModified;
  if (releaseNotes) schema.releaseNotes = releaseNotes;
  if (featureList) schema.featureList = featureList;
  if (inLanguage) schema.inLanguage = inLanguage;
  if (url) schema.url = url;

  return schema;
}
