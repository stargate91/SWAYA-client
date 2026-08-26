import imgOrganizer from '../../assets/1.webp';
import imgOrganizer640 from '../../assets/1-640.webp';
import imgOrganizer1080 from '../../assets/1-1080.webp';

import imgLibrary from '../../assets/2.webp';
import imgLibrary640 from '../../assets/2-640.webp';
import imgLibrary1080 from '../../assets/2-1080.webp';

import imgDetails from '../../assets/3.webp';
import imgDetails640 from '../../assets/3-640.webp';
import imgDetails1080 from '../../assets/3-1080.webp';

export const SHOWCASE_SECTIONS = [
  {
    id: 'organizer',
    tagKey: 'landing.showcase.organizer.tag',
    iconName: 'FolderSync',
    titleKey: 'landing.showcase.organizer.title',
    titleAccentKey: 'landing.showcase.organizer.titleAccent',
    descriptionKey: 'landing.showcase.organizer.description',
    benefitIndices: [0, 1, 2],
    benefitKeyPrefix: 'landing.showcase.organizer.benefits',
    integrationsLabelKey: 'landing.showcase.organizer.supportedApisLabel',
    integrations: ['TMDb', 'OMDb', 'StashDB', 'FansDB', 'ThePornDB'],
    image: imgOrganizer,
    srcSet: `${imgOrganizer640} 640w, ${imgOrganizer1080} 1080w, ${imgOrganizer} 1920w`,
    imageAltKey: 'landing.showcase.organizer.title',
    reversed: false,
    isAlt: false,
  },
  {
    id: 'curation',
    tagKey: 'landing.showcase.curation.tag',
    iconName: 'Sparkles',
    titleKey: 'landing.showcase.curation.title',
    titleAccentKey: 'landing.showcase.curation.titleAccent',
    descriptionKey: 'landing.showcase.curation.description',
    benefitIndices: [0, 1, 2],
    benefitKeyPrefix: 'landing.showcase.curation.benefits',
    image: imgLibrary,
    srcSet: `${imgLibrary640} 640w, ${imgLibrary1080} 1080w, ${imgLibrary} 1920w`,
    imageAltKey: 'landing.showcase.curation.title',
    reversed: true,
    isAlt: true,
  },
  {
    id: 'privacy',
    tagKey: 'landing.showcase.privacy.tag',
    iconName: 'ShieldCheck',
    titleKey: 'landing.showcase.privacy.title',
    titleAccentKey: 'landing.showcase.privacy.titleAccent',
    descriptionKey: 'landing.showcase.privacy.description',
    benefitIndices: [0, 1, 2],
    benefitKeyPrefix: 'landing.showcase.privacy.benefits',
    image: imgDetails,
    srcSet: `${imgDetails640} 640w, ${imgDetails1080} 1080w, ${imgDetails} 1920w`,
    imageAltKey: 'landing.showcase.privacy.title',
    reversed: false,
    isAlt: false,
  },
];
