import styles from './PlayerSlider.module.css';

export default function PlayerSlider({
  variant = 'progress',
  min = 0,
  max = 100,
  value = 0,
  onChange,
  chapters = [],
  duration = 0,
  className = '',
  ...props
}) {
  const isProgress = variant === 'progress';

  const sliderInput = (
    <input
      type="range"
      min={min}
      max={max || 100}
      value={value}
      onChange={onChange}
      className={`${styles.slider} ${styles[`slider--${variant}`]} ${!isProgress ? className : ''}`.trim()}
      {...props}
    />
  );

  if (!isProgress) {
    return sliderInput;
  }

  return (
    <div className={`${styles.wrapper} ${className}`.trim()}>
      {sliderInput}
      {duration > 0 &&
        chapters.map((chap, index) => {
          if (chap.time <= 1) return null;
          const pct = (chap.time / duration) * 100;
          return (
            <div
              key={`chap-${index}`}
              className={styles.marker}
              // eslint-disable-next-line react/forbid-dom-props
              style={{ left: `${pct}%` }}
            />
          );
        })}
    </div>
  );
}
