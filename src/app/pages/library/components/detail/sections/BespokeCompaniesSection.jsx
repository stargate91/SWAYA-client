import { memo } from 'react';
import Tooltip from '@/ui/Tooltip';
import ScrollRow from '@/ui/ScrollRow';
import Card from '@/ui/Card';
import Inline from '@/ui/Inline';
import LogoCard from '@/ui/data/LogoCard';
import { useBespokeCompaniesSection } from '../../../hooks/useBespokeCompaniesSection';

function BespokeCompaniesSection({ item, t }) {
  const {
    allCompanies,
    sectionLabel,
    handleCompanyClick,
    resolveCompanyLogoUrl,
    hasCompanies,
  } = useBespokeCompaniesSection({ item, t });

  if (!hasCompanies) return null;

  return (
    <div className="bespoke-companies-section">
      <Card
        variant="glass-shaded"
        headerVariant="shaded"
        padding="md"
        title={sectionLabel}
      >
        <ScrollRow
          className="no-scrollbar"
          showArrows={true}
        >
          <Inline gap="md" wrap={false}>
            {allCompanies.map((c, i) => {
              const logo = c.logo_path || c.logo || c.image || c.logo_url;
              return (
                <Tooltip key={i} content={c.name} side="top">
                  <LogoCard
                    src={logo ? resolveCompanyLogoUrl(logo) : undefined}
                    alt={c.name}
                    size="lg"
                    invert
                    onClick={c.id ? () => handleCompanyClick(c) : undefined}
                  />
                </Tooltip>
              );
            })}
          </Inline>
        </ScrollRow>
      </Card>
    </div>
  );
}

export default memo(BespokeCompaniesSection);

