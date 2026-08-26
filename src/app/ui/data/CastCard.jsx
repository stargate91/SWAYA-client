import PropTypes from 'prop-types';
import styles from './CastCard.module.css';
import Text from '../Text';
import Avatar from '../Avatar';

export default function CastCard({ src, name, character, fallbackIcon, className = '', ...props }) {
  return (
    <div
      className={`${styles.card} ${className}`.trim()}
      data-interactive={props.onClick ? 'true' : undefined}
      {...props}
    >
      <Avatar
        src={src}
        alt={name}
        fallbackIcon={fallbackIcon}
        className={styles.avatar}
        // eslint-disable-next-line react/forbid-component-props
        style={{ '--avatar-size': '5rem' }}
      />
      <div className={styles.content}>
        {name && (
          <Text variant="body" weight="bold" className={styles.name}>
            {name}
          </Text>
        )}
        {character && (
          <Text variant="caption" color="muted" className={styles.role}>
            {character}
          </Text>
        )}
      </div>
    </div>
  );
}

CastCard.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string.isRequired,
  character: PropTypes.string,
  fallbackIcon: PropTypes.node,
  className: PropTypes.string,
};
