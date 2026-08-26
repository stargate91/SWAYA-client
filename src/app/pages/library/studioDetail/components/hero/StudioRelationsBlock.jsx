import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LogoCard from '@/ui/data/LogoCard';
import Text from '@/ui/Text';
import Card from '@/ui/Card';
import Stack from '@/ui/Stack';
import { API_BASE } from '@/lib/backend';
import { resolveDetailsImageUrl } from '@/lib/imageUrls';
import { ROUTES } from '@/lib/routes';
import { useLazyList } from '@/hooks/useLazyList';
import styles from './StudioRelationsBlock.module.css';

export default function StudioRelationsBlock({ studio, filteredSubStudios, t }) {
  const { visibleItems: visibleSubStudios, handleScroll } = useLazyList({
    items: filteredSubStudios,
    pageSize: 24,
    threshold: 50,
  });

  if (!studio?.parent_studio && (!filteredSubStudios || filteredSubStudios.length === 0)) {
    return null;
  }

  return (
    <div className={styles['relations-container']}>
      {/* Parent Studio */}
      {studio.parent_studio && (
        <Card variant="flat-glass" padding="sm">
          <Stack gap="xs">
            <Text as="div" variant="small" weight="bold" color="secondary" uppercase tracking="wider">
              {t('library.studios.parentStudio') || 'Parent Studio'}
            </Text>
            <Link to={ROUTES.STUDIO_DETAIL(studio.parent_studio.id)} className={styles['parent-card']}>
              <LogoCard
                src={resolveDetailsImageUrl(studio.parent_studio.logo_path, API_BASE, 'logo')}
                alt={studio.parent_studio.name}
                size="md"
                invert
                className={styles['parent-logo']}
              />
              <Text variant="small" weight="medium" truncate className={styles['full-width-text']}>
                {studio.parent_studio.name}
              </Text>
            </Link>
          </Stack>
        </Card>
      )}

      {/* Sub Studios Relations */}
      {filteredSubStudios && filteredSubStudios.length > 0 && (
        <Card variant="flat-glass" padding="sm" className={styles['sub-studios-card']}>
          <Stack gap="xs">
            <Text as="div" variant="small" weight="bold" color="secondary" uppercase tracking="wider">
              {t('library.studios.subStudios') || 'Brands'}
            </Text>
            <div className={styles['sub-studio-grid']} onScroll={handleScroll}>
            {visibleSubStudios.map((child) => (
              <Link
                key={child.id}
                to={ROUTES.STUDIO_DETAIL(child.id)}
                className={styles['sub-studio-link']}
              >
                <LogoCard
                  src={resolveDetailsImageUrl(child.logo_path, API_BASE, 'logo')}
                  alt={child.name}
                  size="sm"
                  invert
                  className={styles['sub-studio-logo']}
                />
                <Text variant="small" weight="medium" truncate className={styles['full-width-text']}>
                  {child.name}
                </Text>
              </Link>
            ))}
          </div>
        </Stack>
      </Card>
      )}
    </div>
  );
}

StudioRelationsBlock.propTypes = {
  studio: PropTypes.object,
  filteredSubStudios: PropTypes.array,
  t: PropTypes.func.isRequired,
};


