import PropTypes from 'prop-types';
import { CheckCircle, AlertTriangle, Film, Database, Flame, ArrowRight } from '@/ui/icons';
import { useTranslation } from '@/providers/LanguageContext';
import styles from './CompletionStep.module.css';

export default function CompletionStep({
  hasConfiguredApiKeys = true,
  contentTypeChoice = 'sfw',
  onOpenDocs,
}) {
  const { t } = useTranslation();

  const showSfw = contentTypeChoice === 'sfw' || contentTypeChoice === 'hybrid';
  const showNsfw = contentTypeChoice === 'nsfw' || contentTypeChoice === 'hybrid';
  const isHybrid = contentTypeChoice === 'hybrid';

  return (
    <div className={styles['onboarding-completion-step']}>
      <div className={styles['success-icon-animation']}>
        <CheckCircle size={40} />
      </div>
      <h2>{t('onboarding.completion.title') || 'Setup Complete!'}</h2>
      <p className={styles['completion-desc']}>
        {t('onboarding.completion.description') || 'Your media workspace has been configured successfully.'}
      </p>

      {!hasConfiguredApiKeys && (
        <div className={styles['notice-card']}>
          <div className={styles['notice-header']}>
            <div className={styles['notice-badge']}>
              <AlertTriangle size={14} />
              <span>{t('onboarding.completion.noKeysBadge') || 'Offline Mode Active'}</span>
            </div>

            <h3 className={styles['notice-title']}>
              {t('onboarding.completion.noKeysTitle') || 'No Metadata Provider Configured'}
            </h3>

            <p className={styles['notice-text']}>
              {t('onboarding.completion.noKeysDesc') ||
                'You can start using SWAYA in offline mode right now. Note that items will be scanned by filename without online artwork or overviews until an API key is connected.'}
            </p>
          </div>

          {onOpenDocs && (
            <div className={styles['guides-container']}>
              {showSfw && (
                <div className={styles['guides-section']}>
                  {isHybrid && (
                    <div className={styles['guides-section-header']}>
                      <span className={styles['guides-section-title']}>
                        {t('onboarding.completion.sfwGuidesTitle') || 'Movies & TV Providers (SFW)'}
                      </span>
                      <div className={styles['guides-section-line']} />
                    </div>
                  )}
                  <div className={styles['guides-grid']}>
                    <button
                      type="button"
                      className={styles['guide-card']}
                      onClick={() => onOpenDocs('docs_tmdb')}
                    >
                      <div className={styles['guide-card__icon']}>
                        <Film size={16} />
                      </div>
                      <div className={styles['guide-card__info']}>
                        <strong className={styles['guide-card__title']}>
                          {t('onboarding.completion.guideTmdb') || 'TMDb'}
                        </strong>
                        <span className={styles['guide-card__desc']}>
                          {t('onboarding.completion.guideTmdbDesc') || 'Movies, Series & Artwork'}
                        </span>
                      </div>
                      <span className={styles['guide-card__arrow']}>
                        <ArrowRight size={14} />
                      </span>
                    </button>

                    <button
                      type="button"
                      className={styles['guide-card']}
                      onClick={() => onOpenDocs('docs_omdb')}
                    >
                      <div className={styles['guide-card__icon']}>
                        <Database size={16} />
                      </div>
                      <div className={styles['guide-card__info']}>
                        <strong className={styles['guide-card__title']}>
                          {t('onboarding.completion.guideOmdb') || 'OMDb'}
                        </strong>
                        <span className={styles['guide-card__desc']}>
                          {t('onboarding.completion.guideOmdbDesc') || 'IMDb & Rotten Tomatoes'}
                        </span>
                      </div>
                      <span className={styles['guide-card__arrow']}>
                        <ArrowRight size={14} />
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {showNsfw && (
                <div className={styles['guides-section']}>
                  {isHybrid && (
                    <div className={styles['guides-section-header']}>
                      <span className={styles['guides-section-title']}>
                        {t('onboarding.completion.nsfwGuidesTitle') || 'Adult Media Providers (NSFW)'}
                      </span>
                      <div className={styles['guides-section-line']} />
                    </div>
                  )}
                  <div className={`${styles['guides-grid']} ${styles['guides-grid--nsfw']}`}>
                    <button
                      type="button"
                      className={styles['guide-card']}
                      onClick={() => onOpenDocs('docs_stashdb')}
                    >
                      <div className={styles['guide-card__icon']}>
                        <Flame size={16} />
                      </div>
                      <div className={styles['guide-card__info']}>
                        <strong className={styles['guide-card__title']}>
                          {t('onboarding.completion.guideStashdb') || 'StashDB'}
                        </strong>
                        <span className={styles['guide-card__desc']}>
                          {t('onboarding.completion.guideStashdbDesc') || 'Scenes & Performer Database'}
                        </span>
                      </div>
                      <span className={styles['guide-card__arrow']}>
                        <ArrowRight size={14} />
                      </span>
                    </button>

                    <button
                      type="button"
                      className={styles['guide-card']}
                      onClick={() => onOpenDocs('docs_fansdb')}
                    >
                      <div className={styles['guide-card__icon']}>
                        <Flame size={16} />
                      </div>
                      <div className={styles['guide-card__info']}>
                        <strong className={styles['guide-card__title']}>
                          {t('onboarding.completion.guideFansdb') || 'FansDB'}
                        </strong>
                        <span className={styles['guide-card__desc']}>
                          {t('onboarding.completion.guideFansdbDesc') || 'Performers & Creator Index'}
                        </span>
                      </div>
                      <span className={styles['guide-card__arrow']}>
                        <ArrowRight size={14} />
                      </span>
                    </button>

                    <button
                      type="button"
                      className={styles['guide-card']}
                      onClick={() => onOpenDocs('docs_theporndb')}
                    >
                      <div className={styles['guide-card__icon']}>
                        <Flame size={16} />
                      </div>
                      <div className={styles['guide-card__info']}>
                        <strong className={styles['guide-card__title']}>
                          {t('onboarding.completion.guideTheporndb') || 'ThePornDB'}
                        </strong>
                        <span className={styles['guide-card__desc']}>
                          {t('onboarding.completion.guideTheporndbDesc') || 'Studio Scraper & Metadata'}
                        </span>
                      </div>
                      <span className={styles['guide-card__arrow']}>
                        <ArrowRight size={14} />
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <p className={styles['settings-hint']}>
            {t('onboarding.completion.settingsHint') || 'You can connect metadata providers anytime in Settings.'}
          </p>
        </div>
      )}
    </div>
  );
}

CompletionStep.propTypes = {
  hasConfiguredApiKeys: PropTypes.bool,
  contentTypeChoice: PropTypes.oneOf(['sfw', 'nsfw', 'hybrid']),
  onOpenDocs: PropTypes.func,
};
