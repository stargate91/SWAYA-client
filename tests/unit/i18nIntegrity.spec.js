import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { VALID_LOCALES } from '../../src/site/data/localesConfig.js';

function flattenKeys(obj, prefix = '') {
  let keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      keys = keys.concat(flattenKeys(v, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

describe('i18n Localization Integrity Suite', () => {
  const localesDir = path.resolve(process.cwd(), 'src/site/locales');
  const enLandingPath = path.join(localesDir, 'en', 'landing.json');
  const enLanding = JSON.parse(fs.readFileSync(enLandingPath, 'utf8'));
  const enLandingKeys = flattenKeys(enLanding);

  it('should have all 17 supported locales present in the filesystem', () => {
    expect(VALID_LOCALES).toHaveLength(17);
    VALID_LOCALES.forEach((locale) => {
      const localePath = path.join(localesDir, locale);
      expect(fs.existsSync(localePath)).toBe(true);
      expect(fs.existsSync(path.join(localePath, 'landing.json'))).toBe(true);
    });
  });

  it('should have identical key parity across all language landing.json files', () => {
    VALID_LOCALES.filter((l) => l !== 'en').forEach((locale) => {
      const targetPath = path.join(localesDir, locale, 'landing.json');
      const targetContent = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
      const targetKeys = flattenKeys(targetContent);

      const missingInTarget = enLandingKeys.filter((k) => !targetKeys.includes(k));
      expect(missingInTarget, `Locale [${locale}] is missing translation keys`).toEqual([]);
    });
  });

  it('should ensure non-empty translation strings across all languages', () => {
    VALID_LOCALES.forEach((locale) => {
      const targetPath = path.join(localesDir, locale, 'landing.json');
      const targetContent = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
      const keys = flattenKeys(targetContent);

      keys.forEach((key) => {
        const parts = key.split('.');
        let current = targetContent;
        for (const p of parts) {
          current = current[p];
        }
        expect(current, `Empty translation string at [${locale}]: ${key}`).not.toBe('');
      });
    });
  });
});
