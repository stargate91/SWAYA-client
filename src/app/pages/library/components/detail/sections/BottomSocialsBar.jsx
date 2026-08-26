import PropTypes from 'prop-types';
import { Minus, Plus } from '@/ui/icons';
import UtilityBarBottomPortal from '@/ui/UtilityBarBottomPortal';
import Tooltip from '@/ui/Tooltip';
import IconButton from '@/ui/IconButton';
import Inline from '@/ui/Inline';
import { useSocialLinksCollapse } from '@/hooks/useSocialLinksCollapse';
import styles from './BottomSocialsBar.module.css';

export default function BottomSocialsBar({
  socialLinks,
  t,
}) {
  const {
    hasLinks,
    hasExtra,
    mainLinks,
    extraLinks,
    isExpanded,
    toggleExpanded,
    toggleTooltip,
  } = useSocialLinksCollapse({
    socialLinks,
    maxVisible: 4,
    t,
  });

  if (!hasLinks) return null;

  return (
    <UtilityBarBottomPortal align="right">
      <div className={styles['hover-reveal']} data-active={isExpanded}>
        <div className={styles['pill-panel']}>
          {hasExtra && (
            <div
              className={styles['collapse-horizontal']}
              data-expanded={isExpanded}
            >
              <Inline gap="xs" wrap={false} align="center">
                {extraLinks.map((link) => (
                  <Tooltip key={link.key} content={link.label} side="top">
                    <IconButton
                      as="a"
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="sm"
                      variant="ghost"
                      radius="full"
                      aria-label={link.label}
                    >
                      <img src={link.iconSrc || 'links/website.svg'} alt="" />
                    </IconButton>
                  </Tooltip>
                ))}
              </Inline>
            </div>
          )}

          <Inline gap="xs" wrap={false} align="center">
            {mainLinks.map((link) => (
              <Tooltip key={link.key} content={link.label} side="top">
                <IconButton
                  as="a"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="sm"
                  variant="ghost"
                  radius="full"
                  aria-label={link.label}
                >
                  <img src={link.iconSrc || 'links/website.svg'} alt="" />
                </IconButton>
              </Tooltip>
            ))}
          </Inline>

          {hasExtra && (
            <Tooltip
              content={toggleTooltip}
              side="top"
            >
              <IconButton
                size="sm"
                variant="ghost"
                radius="full"
                onClick={toggleExpanded}
                aria-label={toggleTooltip}
              >
                {isExpanded ? <Minus size={14} /> : <Plus size={14} />}
              </IconButton>
            </Tooltip>
          )}
        </div>
      </div>
    </UtilityBarBottomPortal>
  );
}

BottomSocialsBar.propTypes = {
  socialLinks: PropTypes.array,
  t: PropTypes.func.isRequired,
};

