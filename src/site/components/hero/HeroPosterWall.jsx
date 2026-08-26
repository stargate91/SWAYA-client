import styles from './HeroPosterWall.module.css';
import { usePosterWall } from '../../hooks/usePosterWall';

export default function HeroPosterWall() {
  const { columns } = usePosterWall();

  return (
    <div className={styles['poster-wall-container']} aria-hidden="true">
      <div className={styles['poster-grid']}>
        {columns.map((column) => (
          <div key={column.id} className={styles['poster-col']}>
            {column.posters.map((poster, posterIdx) => {
              const src = typeof poster === 'string' ? poster : poster.src;
              const alt = typeof poster === 'object' && poster.title ? `${poster.title} Poster` : 'Movie Poster';
              return (
                <div key={posterIdx} className={styles['poster-card']}>
                  <img
                    src={src}
                    alt={alt}
                    width={700}
                    height={1050}
                    loading="lazy"
                    decoding="async"
                    fetchpriority="low"
                    className={styles['poster-img']}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className={styles.overlay} />
    </div>
  );
}
