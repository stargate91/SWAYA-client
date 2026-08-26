import PropTypes from 'prop-types';
import Badge from '@/ui/Badge';
import Button from '@/ui/Button';
import { useHelpChannelCard } from '../../hooks/useHelpChannelCard';
import styles from './HelpChannelCard.module.css';


export default function HelpChannelCard({
  type,
  icon,
  badgeText,
  badgeTone = 'accent',
  tag,
  title,
  description,
  buttonText,
  buttonHref,
  buttonVariant = 'primary',
  buttonIcon,
  isExternal = false,
}) {
  const {
    cardModifierKey,
    renderedIcon,
    renderedButtonIcon,
    target,
    rel,
  } = useHelpChannelCard({
    type,
    icon,
    buttonIcon,
    isExternal,
  });

  return (
    <article className={`${styles.card} ${styles[cardModifierKey]}`}>
      <div className={styles.top}>
        <div className={styles['icon-box']}>
          {renderedIcon}
        </div>
        <Badge tone={badgeTone} size="xs">
          {badgeText}
        </Badge>
      </div>

      <div className={styles.body}>
        <div className={styles.tag}>{tag}</div>
        <h2 className={styles['card-title']}>{title}</h2>
        <p className={styles.desc}>{description}</p>
      </div>

      <div className={styles.action}>
        <Button
          as="a"
          href={buttonHref}
          target={target}
          rel={rel}
          variant={buttonVariant}
          size="md"
          className={styles.button}
          rightIcon={renderedButtonIcon}
        >
          {buttonText}
        </Button>
      </div>
    </article>
  );
}

HelpChannelCard.propTypes = {
  type: PropTypes.oneOf(['discord', 'email']).isRequired,
  icon: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node]).isRequired,
  badgeText: PropTypes.string.isRequired,
  badgeTone: PropTypes.string,
  tag: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonHref: PropTypes.string.isRequired,
  buttonVariant: PropTypes.string,
  buttonIcon: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node]),
  isExternal: PropTypes.bool,
};
