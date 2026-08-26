import { Layers, Bookmark } from '@/ui/icons';
import { useTranslation } from '@/providers/LanguageContext';
import SectionHeader from '@/ui/SectionHeader';
import ScrollRow from '@/ui/ScrollRow';
import Stack from '@/ui/Stack';
import Badge from '@/ui/Badge';
import PosterCard from '@/ui/PosterCard';
import { usePeopleKnownFor } from '../../hooks/usePeopleKnownFor';

export default function PeopleRightHeroSection({ item }) {
  const { t } = useTranslation();
  const { knownForCredits, hasKnownFor } = usePeopleKnownFor(item);

  if (!hasKnownFor) {
    return <Stack justify="end" fullHeight fullWidth />;
  }

  return (
    <Stack justify="end" fullHeight fullWidth>
      <Stack gap="md" fullWidth>
        <SectionHeader title={t('library.details.knownForTitle') || 'Known For'} />
        <ScrollRow>
          {knownForCredits.map((credit) => (
            <PosterCard
              key={credit.id}
              aspect={credit.aspect}
              size={credit.size}
              imageUrl={credit.posterUrl}
              loading="eager"
              icon={Layers}
              title={credit.title}
              onClick={credit.handleClick}
              topRightAction={
                credit.inLibrary ? (
                  <Badge
                    size="xs"
                    variant="top-right"
                    family="status"
                    tone="success"
                    roundness="full"
                    leftIcon={<Bookmark size={10} />}
                    title={t('library.details.inLibrary') || 'Have'}
                  />
                ) : null
              }
            />
          ))}
        </ScrollRow>
      </Stack>
    </Stack>
  );
}
