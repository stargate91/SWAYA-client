import { useTranslation } from '@/providers/LanguageContext';
import { useUi } from '@/providers/UiProvider';
import { Check } from '@/ui/icons';
import Text from '@/ui/Text';
import Inline from '@/ui/Inline';
import { extractTextValue } from '@/lib/formatters';
import { usePerformerMixer } from './usePerformerMixer';
import { usePerformerMixerValidation } from './usePerformerMixerValidation';
import styles from './PerformerMixerTab.module.css';

export default function PerformerMixerTab({ person: initialPerson }) {
  const { t } = useTranslation();
  const { toast } = useUi();

  const {
    currentRouting,
    FIELDS,
    PROVIDERS,
    formatValue,
    getProviderValue,
    getAutoValue,
    isSourceLinked,
    handleSelectRoute,
  } = usePerformerMixer({ initialPerson, t, toast });

  const { hasValue } = usePerformerMixerValidation();

  return (
    <div className={styles['grid-container']}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles['th-field']}>
              <Text variant="small" color="secondary" weight="semibold">
                {t('library.performerEdit.field') || 'Field'}
              </Text>
            </th>
            <th className={styles['th-source']}>
              <Text variant="small" color="secondary" weight="semibold">
                {t('library.performerEdit.autoDefault') || 'Auto (Default)'}
              </Text>
            </th>
            {PROVIDERS.map((p) => {
              const isLinked = isSourceLinked(p.key);
              return (
                <th
                  key={p.key}
                  className={styles['th-source']}
                  data-disabled={!isLinked}
                >
                  <Text variant="small" color="secondary" weight="semibold">
                    {p.label}
                  </Text>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {FIELDS.map((field) => {
            const activeRoute = currentRouting[field.key] || 'auto';
            const autoVal = getAutoValue(field.key);
            const formattedAutoVal = formatValue(autoVal, field.type, field.key);
            const autoFullText = extractTextValue(autoVal) || (typeof autoVal === 'string' ? autoVal : '');

            return (
              <tr key={field.key} className={styles.row}>
                <td className={styles['td-field-label']}>
                  <Text weight="semibold" color="primary" variant="small">
                    {field.label}
                  </Text>
                </td>
                {/* Auto routing option */}
                <td
                  onClick={() => handleSelectRoute(field.key, 'auto')}
                  className={styles['td-cell']}
                  data-type="auto"
                  data-active={activeRoute === 'auto'}
                >
                  <Inline justify="between" align="center" gap="sm">
                    <span title={autoFullText}>
                      {formattedAutoVal !== '-' ? (
                        <Inline gap="xs" align="center">
                          <Text variant="small" color="muted" uppercase weight="bold">
                            {t('library.performerEdit.custom.autoPrefix', { defaultValue: 'Auto' })}
                          </Text>
                          <Text variant="small" weight="medium" color="primary">
                            {formattedAutoVal}
                          </Text>
                        </Inline>
                      ) : (
                        <Text variant="small" color="muted">
                          {t('library.performerEdit.defaultPriority') || 'Default Priority'}
                        </Text>
                      )}
                    </span>
                    {activeRoute === 'auto' && <Check size={14} className={styles['check-icon']} />}
                  </Inline>
                </td>
                {PROVIDERS.map((p) => {
                  const isLinked = isSourceLinked(p.key);
                  const rawVal = getProviderValue(p.key, field.key);
                  const formatted = formatValue(rawVal, field.type, field.key);
                  const isSelected = activeRoute === p.key;
                  const fullText = extractTextValue(rawVal) || (typeof rawVal === 'string' ? rawVal : '');
                  const isValueValid = hasValue(rawVal, formatted);
                  const isCellDisabled = !isLinked || !isValueValid;
                  const cellType = p.key === 'manual' ? 'manual' : 'provider';

                  return (
                    <td
                      key={p.key}
                      onClick={() => !isCellDisabled && handleSelectRoute(field.key, p.key)}
                      className={styles['td-cell']}
                      data-type={cellType}
                      data-active={isSelected}
                      data-disabled={isCellDisabled}
                    >
                      <Inline justify="between" align="center" gap="sm">
                        <span title={fullText}>
                          <Text variant="small" color={isSelected ? 'primary' : 'secondary'}>
                            {formatted}
                          </Text>
                        </span>
                        {isSelected && <Check size={14} className={styles['check-icon']} />}
                      </Inline>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

