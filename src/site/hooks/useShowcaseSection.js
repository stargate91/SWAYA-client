import { useMemo } from 'react';

/**
 * Custom hook that formats and prepares presentation data for a showcase section.
 * @param {object} section - Feature showcase section config
 * @param {Function} t - Translation function
 * @returns {object} Formatted showcase section data
 */
export function useShowcaseSection(section, t = (k) => k) {
  const {
    id,
    tagKey,
    icon: Icon,
    titleKey,
    titleAccentKey,
    descriptionKey,
    benefits = [],
    benefitKeyPrefix,
    benefitIndices,
    integrationsLabel,
    integrationsLabelKey,
    integrations = [],
    image,
    imageAltKey,
    reversed,
    isAlt,
  } = section;

  return useMemo(() => {
    let resolvedBenefits = benefits;
    if (benefitKeyPrefix && Array.isArray(benefitIndices)) {
      resolvedBenefits = benefitIndices.map((idx) => t(`${benefitKeyPrefix}.${idx}`));
    } else if (Array.isArray(benefits)) {
      resolvedBenefits = benefits.map((item) => {
        if (typeof item === 'string' && (item.startsWith('landing.') || item.includes('.'))) {
          return t(item);
        }
        return item;
      });
    }

    const resolvedIntegrationsLabel = integrationsLabelKey
      ? t(integrationsLabelKey)
      : (integrationsLabel
        ? (typeof integrationsLabel === 'string' && (integrationsLabel.startsWith('landing.') || integrationsLabel.includes('.'))
          ? t(integrationsLabel)
          : integrationsLabel)
        : null);

    return {
      id,
      tagText: tagKey ? t(tagKey) : '',
      Icon,
      titleText: titleKey ? t(titleKey) : '',
      titleAccentText: titleAccentKey ? t(titleAccentKey) : '',
      descriptionText: descriptionKey ? t(descriptionKey) : '',
      benefits: resolvedBenefits,
      integrationsLabel: resolvedIntegrationsLabel,
      integrations,
      image,
      srcSet: section.srcSet || null,
      altText: imageAltKey ? t(imageAltKey) : '',
      isAlt,
      reversed,
    };
  }, [
    id,
    tagKey,
    Icon,
    titleKey,
    titleAccentKey,
    descriptionKey,
    benefits,
    benefitKeyPrefix,
    benefitIndices,
    integrationsLabel,
    integrationsLabelKey,
    integrations,
    image,
    imageAltKey,
    reversed,
    isAlt,
    t,
  ]);
}

export default useShowcaseSection;

