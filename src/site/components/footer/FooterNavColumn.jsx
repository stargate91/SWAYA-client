import PropTypes from 'prop-types';
import FooterNavLink from './FooterNavLink';
import styles from './FooterNavColumn.module.css';

export default function FooterNavColumn({ title, links = [] }) {
  return (
    <div className={styles.col}>
      <h3 className={styles['col-title']}>{title}</h3>
      <ul className={styles['link-list']}>
        {links.map((item, index) => (
          <FooterNavLink
            key={item.key || item.href || item.to || index}
            item={item}
          />
        ))}
      </ul>
    </div>
  );
}

FooterNavColumn.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(FooterNavLink.propTypes.item).isRequired,
};

