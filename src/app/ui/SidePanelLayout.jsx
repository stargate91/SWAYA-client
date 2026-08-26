import PropTypes from 'prop-types';
import styles from './SidePanelLayout.module.css';

/**
 * Reusable side-panel layout with sliding entrance animations or plain fixed split views.
 *
 * @param {object} props
 * @param {'left' | 'right'} [props.side] - Side where the panel resides
 * @param {'modal' | 'plain'} [props.variant] - Modal (with borders/animation) or plain (for page split layouts)
 * @param {'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'} [props.gap] - Gap between panel and main content
 * @param {boolean} [props.fullHeight] - Whether to expand to full height
 * @param {boolean} [props.mainScrollable] - Whether the main content container should scroll vertically
 * @param {string} [props.panelWidth] - Custom width of the panel (e.g. '20rem')
 * @param {React.ReactNode} props.panelContent - Content inside the side panel
 * @param {boolean} [props.showPanel] - Whether the panel is currently visible
 * @param {string} [props.panelClassName] - Additional class name for the panel container
 * @param {string} [props.className] - Additional class name for the layout container
 * @param {React.ReactNode} props.children - Main form/content
 */
export default function SidePanelLayout({
  side = 'right',
  variant = 'modal',
  gap = '2xl',
  fullHeight = false,
  mainScrollable = false,
  panelWidth,
  panelContent,
  showPanel = true,
  panelClassName = '',
  className = '',
  children,
}) {
  const isRight = side === 'right';

  const layoutClasses = [
    styles.root,
    styles[`root--gap-${gap}`] || styles['root--gap-2xl'],
    fullHeight ? styles['root--full-height'] : '',
    className,
  ].filter(Boolean).join(' ');

  const panelClasses = [
    styles.panel,
    styles[`panel--${variant}`] || styles['panel--modal'],
    isRight ? styles['panel--right'] : styles['panel--left'],
    panelClassName,
  ].filter(Boolean).join(' ');

  const mainClasses = [
    styles.main,
    mainScrollable ? styles['main--scrollable'] : '',
  ].filter(Boolean).join(' ');

  const setPanelWidthRef = (el) => {
    if (el && panelWidth) {
      el.style.setProperty('--side-panel-width', panelWidth);
    }
  };

  return (
    <div className={layoutClasses}>
      {!isRight && showPanel && (
        <div className={panelClasses} ref={setPanelWidthRef}>
          {panelContent}
        </div>
      )}
      <div className={mainClasses}>
        {children}
      </div>
      {isRight && showPanel && (
        <div className={panelClasses} ref={setPanelWidthRef}>
          {panelContent}
        </div>
      )}
    </div>
  );
}

SidePanelLayout.propTypes = {
  side: PropTypes.oneOf(['left', 'right']),
  variant: PropTypes.oneOf(['modal', 'plain']),
  gap: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl']),
  fullHeight: PropTypes.bool,
  mainScrollable: PropTypes.bool,
  panelWidth: PropTypes.string,
  panelContent: PropTypes.node,
  showPanel: PropTypes.bool,
  panelClassName: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};
