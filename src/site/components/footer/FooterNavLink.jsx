import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useFooterNavLink } from '../../hooks/useFooterNavLink';
import styles from './FooterNavLink.module.css';


export default function FooterNavLink({ item }) {
  const { isRouterLink, linkProps, leftIcon, rightIcon, label } = useFooterNavLink(item);

  return (
    <li>
      {isRouterLink ? (
        <Link {...linkProps} className={styles.link}>
          {leftIcon}
          <span>{label}</span>
          {rightIcon}
        </Link>
      ) : (
        <a {...linkProps} className={styles.link}>
          {leftIcon}
          <span>{label}</span>
          {rightIcon}
        </a>
      )}
    </li>
  );
}

FooterNavLink.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.string,
    label: PropTypes.node.isRequired,
    to: PropTypes.string,
    href: PropTypes.string,
    isExternal: PropTypes.bool,
    isMailto: PropTypes.bool,
    iconKey: PropTypes.string,
    rightIconKey: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    onClick: PropTypes.func,
    ariaLabel: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};
