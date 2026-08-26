import { memo } from 'react';
import { User } from '@/ui/icons';
import { useMediaDetailContext } from '../MediaDetailContext';
import { navigateToLibraryItem } from '@/lib/routes';
import Tooltip from '@/ui/Tooltip';
import ScrollRow from '@/ui/ScrollRow';
import Card from '@/ui/Card';
import Tabs from '@/ui/Tabs';
import CastCard from '@/ui/data/CastCard';
import LogoCard from '@/ui/data/LogoCard';
import { useCastAndCrewViewModel } from '@/pages/library/hooks/useCastAndCrewViewModel';

function BespokeCastSection({ item, t, navigate }) {
  const settings = useMediaDetailContext()?.state?.settings;

  const {
    allPeople,
    totalTabs,
    tabs,
    activeTab,
    setActiveTab,
    handleCompanyClick,
    resolvePersonAvatarUrl,
    resolveCompanyLogoUrl,
  } = useCastAndCrewViewModel({ item, settings, t, navigate });

  if (totalTabs === 0) return null;

  const headerContent = tabs.length > 1 ? (
    <Tabs
      tabs={tabs}
      value={activeTab}
      onChange={setActiveTab}
      variant="underline"
    />
  ) : (
    tabs[0]?.label || ''
  );

  return (
    <Card
      variant="glass-shaded"
      headerVariant="shaded"
      padding="md"
      title={headerContent}
    >
      <ScrollRow showArrows={true}>
        {activeTab === 'cast' && allPeople.map((person, index) => {
          return (
            <CastCard
              key={`${person.id}-${index}`}
              src={person.profile_path && !person.isFilteredOut ? resolvePersonAvatarUrl(person.profile_path) : undefined}
              name={person.displayName}
              character={person.displayRole}
              fallbackIcon={<User size={24} />}
              onClick={person.isFilteredOut ? undefined : () => navigateToLibraryItem(navigate, person, 'person')}
              data-filtered={person.isFilteredOut || undefined}
            />
          );
        })}

        {activeTab === 'companies' && item.companies?.map((c, i) => (
          <Tooltip key={i} content={c.name} side="top">
            <LogoCard
              src={c.logo_path ? resolveCompanyLogoUrl(c.logo_path) : undefined}
              alt={c.name}
              size="lg"
              invert
              onClick={c.id ? () => handleCompanyClick(c) : undefined}
            />
          </Tooltip>
        ))}

        {activeTab === 'networks' && item.networks?.map((n, i) => (
          <Tooltip key={i} content={n.name} side="top">
            <LogoCard
              src={n.logo_path ? resolveCompanyLogoUrl(n.logo_path) : undefined}
              alt={n.name}
              size="lg"
              invert
              onClick={n.id ? () => handleCompanyClick(n) : undefined}
            />
          </Tooltip>
        ))}
      </ScrollRow>
    </Card>
  );
}

export default memo(BespokeCastSection);
