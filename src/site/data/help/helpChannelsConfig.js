import { Mail, ExternalLink } from 'lucide-react';
import { DiscordIcon } from '@/ui/icons';
import { DISCORD_INVITE_URL, DEV_EMAIL } from '../siteConfig.js';

export const HELP_CHANNEL_ICON_MAP = {
  discord: DiscordIcon,
  mail: Mail,
};

export const HELP_BUTTON_ICON_MAP = {
  external: ExternalLink,
  mail: Mail,
};

export const HELP_CHANNELS_CONFIG = [
  {
    id: 'discord',
    type: 'discord',
    badgeKey: 'landing.help.cards.discord.badge',
    badgeDefault: 'Online Community',
    badgeTone: 'accent',
    tagKey: 'landing.help.cards.discord.tag',
    tagDefault: 'Live Community & Chat',
    titleKey: 'landing.help.cards.discord.title',
    titleDefault: 'Discord Server',
    descKey: 'landing.help.cards.discord.description',
    descDefault:
      'Join our active community of media collectors. Ask questions, share tips, get fast assistance, and stay updated with the latest releases.',
    buttonKey: 'landing.help.cards.discord.button',
    buttonDefault: 'Join Discord Server',
    buttonHref: DISCORD_INVITE_URL,
    buttonVariant: 'primary',
    isExternal: true,
    iconType: 'discord',
    buttonIconType: 'external',
  },
  {
    id: 'email',
    type: 'email',
    badgeKey: 'landing.help.cards.email.badge',
    badgeDefault: DEV_EMAIL,
    badgeTone: 'neutral',
    tagKey: 'landing.help.cards.email.tag',
    tagDefault: 'Developer Contact',
    titleKey: 'landing.help.cards.email.title',
    titleDefault: 'Direct Email Support',
    descKey: 'landing.help.cards.email.description',
    descDefault:
      'Have questions about licensing, feature requests, private feedback, or encountered a bug? Reach out to the developer directly.',
    buttonKey: 'landing.help.cards.email.button',
    buttonDefault: 'Send Email',
    buttonHref: `mailto:${DEV_EMAIL}`,
    buttonVariant: 'secondary',
    isExternal: false,
    iconType: 'mail',
    buttonIconType: 'mail',
  },
];

/**
 * Resolves localized support channel definitions.
 * @param {Function} t
 * @returns {Array<object>}
 */
export function getHelpChannels(t = (k, opts) => opts?.defaultValue || k) {
  return HELP_CHANNELS_CONFIG.map((channel) => ({
    id: channel.id,
    type: channel.type,
    icon: HELP_CHANNEL_ICON_MAP[channel.iconType] || Mail,
    badgeText: t(channel.badgeKey, { defaultValue: channel.badgeDefault }),
    badgeTone: channel.badgeTone,
    tag: t(channel.tagKey, { defaultValue: channel.tagDefault }),
    title: t(channel.titleKey, { defaultValue: channel.titleDefault }),
    description: t(channel.descKey, { defaultValue: channel.descDefault }),
    buttonText: t(channel.buttonKey, { defaultValue: channel.buttonDefault }),
    buttonHref: channel.buttonHref,
    buttonVariant: channel.buttonVariant,
    buttonIcon: HELP_BUTTON_ICON_MAP[channel.buttonIconType] || null,
    isExternal: channel.isExternal,
  }));
}
