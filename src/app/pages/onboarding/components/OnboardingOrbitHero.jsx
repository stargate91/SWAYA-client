import PropTypes from 'prop-types';
import { useOrbitChipLayout } from '../hooks/useOrbitChipLayout';
import styles from './OnboardingOrbitHero.module.css';

export default function OnboardingOrbitHero({
  icon: Icon,
  chips = [],
  className = '',
}) {
  const chipLayout = useOrbitChipLayout(chips);

  return (
    <div className={`${styles['welcome-hero-shell']} ${className}`.trim()}>
      <div className={`${styles['welcome-hero-orbit']} ${styles['welcome-hero-orbit-primary']}`} />
      <div className={`${styles['welcome-hero-orbit']} ${styles['welcome-hero-orbit-secondary']}`} />
      <div className={styles['welcome-logo-badge']}>
        <div className={styles['badge-glow']} />
        {Icon ? <Icon size={40} className={styles['badge-icon']} /> : null}
      </div>

      {chips.map((chip, index) => (
        <div
          key={`${chip.label}-${index}`}
          className={styles['welcome-hero-chip-orbit']}
          /* eslint-disable-next-line react/forbid-dom-props */
          style={{
            left: `${chipLayout[index]?.x ?? 160}px`,
            top: `${chipLayout[index]?.y ?? 84}px`,
            '--hero-float-dur': `${5.2 + (index * 0.45)}s`,
            '--hero-float-delay': `${index * -0.9}s`,
          }}
        >
          <div className={styles['welcome-hero-chip']}>
            <span>{chip.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

OnboardingOrbitHero.propTypes = {
  icon: PropTypes.elementType,
  chips: PropTypes.array,
  className: PropTypes.string,
};
