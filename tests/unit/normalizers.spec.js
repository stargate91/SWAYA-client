import { describe, it, expect } from 'vitest';
import { normalizeFaqItem, normalizeFaqList } from '../../src/site/data/faqNormalizer.js';
import { mergeReleaseWithLocale, normalizeChangelogList } from '../../src/site/data/changelog/changelogNormalizer.js';
import { mergeComparisonWithLocale } from '../../src/site/data/comparisons/comparisonNormalizer.js';
import { filterDocSections, getDocSections } from '../../src/site/data/docQueries.js';

describe('FAQ Normalizer', () => {
  it('should correctly normalize a single FAQ item with translation function', () => {
    const rawItem = {
      id: 'test-1',
      questionKey: 'faq.q1',
      answerKey: 'faq.a1',
      question: 'What is SWAYA?',
      answer: 'SWAYA is a desktop offline media center.',
    };

    const mockT = (key, opts) => opts?.defaultValue || key;
    const normalized = normalizeFaqItem(rawItem, mockT);

    expect(normalized.id).toBe('test-1');
    expect(normalized.question).toBe('What is SWAYA?');
    expect(normalized.answer).toBe('SWAYA is a desktop offline media center.');
  });

  it('should normalize a list of FAQ items', () => {
    const list = [
      { id: 1, questionKey: 'q1', answerKey: 'a1', question: 'Q1', answer: 'A1' },
      { id: 2, questionKey: 'q2', answerKey: 'a2', question: 'Q2', answer: 'A2' },
    ];
    const mockT = (k, opts) => opts?.defaultValue || k;
    const result = normalizeFaqList(list, mockT);

    expect(result).toHaveLength(2);
    expect(result[0].question).toBe('Q1');
    expect(result[1].question).toBe('Q2');
  });
});

describe('Changelog Normalizer', () => {
  const baseRelease = {
    version: '1.0.0',
    date: '2026-08-15',
    isLatest: true,
    title: 'Base Title',
    description: 'Base Description',
    highlights: ['Highlight 1', 'Highlight 2'],
    sections: [
      { type: 'added', title: 'New Features', items: ['Item 1'] },
      { type: 'fixed', title: 'Bug Fixes', items: ['Fix 1'] },
    ],
  };

  it('should return base release with translated section titles when override is empty', () => {
    const sectionTitles = { added: 'Új funkciók', fixed: 'Hibajavítások' };
    const merged = mergeReleaseWithLocale(baseRelease, null, sectionTitles);

    expect(merged.title).toBe('Base Title');
    expect(merged.sections[0].title).toBe('Új funkciók');
    expect(merged.sections[1].title).toBe('Hibajavítások');
  });

  it('should apply localized text overrides cleanly', () => {
    const override = {
      title: 'Lokalizált Cím',
      description: 'Lokalizált Leírás',
      highlights: ['Kiemelés 1'],
    };
    const merged = mergeReleaseWithLocale(baseRelease, override, { added: 'Új' });

    expect(merged.title).toBe('Lokalizált Cím');
    expect(merged.description).toBe('Lokalizált Leírás');
    expect(merged.highlights).toEqual(['Kiemelés 1']);
    expect(merged.sections[0].title).toBe('Új');
  });

  it('should normalize a full changelog list across versions', () => {
    const baseList = [baseRelease];
    const overrides = {
      sectionTitles: { added: 'Neu' },
      releases: {
        '1.0.0': { title: 'DE Title' },
      },
    };
    const result = normalizeChangelogList(baseList, overrides);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('DE Title');
    expect(result[0].sections[0].title).toBe('Neu');
  });
});

describe('Comparison Normalizer', () => {
  const baseComparison = {
    slug: 'filebot',
    name: 'FileBot',
    category: 'File Renamers',
    title: 'Base Compare Title',
    whenToChooseCompetitor: ['Base Reason 1'],
    whenToChooseSwaya: ['Base Reason 2'],
    matrix: [
      { feature: 'Renaming', swaya: true, competitor: true, swayaNote: 'Note 1' },
    ],
    deepDives: [
      { title: 'Base Deep Dive', content: 'Base content' },
    ],
    faqs: [
      { question: 'Base FAQ Q', answer: 'Base FAQ A' },
    ],
  };

  it('should merge comparison model with translation overlay without mutating base flags', () => {
    const locMap = {
      title: 'Lokalizált Összehasonlítás',
      whenToChooseCompetitor: ['Fordított ok'],
      matrix: [
        { swayaNote: 'Lokalizált jegyzet' },
      ],
    };

    const merged = mergeComparisonWithLocale(baseComparison, locMap);

    expect(merged.title).toBe('Lokalizált Összehasonlítás');
    expect(merged.whenToChooseCompetitor).toEqual(['Fordított ok']);
    expect(merged.whenToChooseSwaya).toEqual(['Base Reason 2']);
  });
});

describe('Documentation Search Filter', () => {
  it('should filter documentation sections and items based on search query', () => {
    const mockT = (k) => k;
    const sections = getDocSections(mockT, 'en');

    // Searching for "organizer"
    const organizerMatches = filterDocSections(sections, 'organizer');
    expect(organizerMatches.length).toBeGreaterThan(0);
    const hasOrganizerSlug = organizerMatches.some((s) =>
      s.items.some((item) => item.slug === 'organizer')
    );
    expect(hasOrganizerSlug).toBe(true);

    // Searching for non-existent term
    const noMatches = filterDocSections(sections, 'nonexistentqueryxyz');
    expect(noMatches).toHaveLength(0);

    // Empty query returns all sections
    const allMatches = filterDocSections(sections, '');
    expect(allMatches.length).toBe(sections.length);
  });
});

