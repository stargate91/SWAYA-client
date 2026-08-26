import PropTypes from 'prop-types';
import Breadcrumb from '../common/Breadcrumb';
import { useDocsBreadcrumb } from '../../hooks/useDocsBreadcrumb';

export default function DocsBreadcrumb({ homeUrl, docsUrl, category, t }) {
  const { items } = useDocsBreadcrumb({ homeUrl, docsUrl, category, t });

  return <Breadcrumb items={items} />;
}

DocsBreadcrumb.propTypes = {
  homeUrl: PropTypes.string.isRequired,
  docsUrl: PropTypes.string,
  category: PropTypes.string,
  t: PropTypes.func,
};


