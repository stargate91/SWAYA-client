import PropTypes from 'prop-types';
import Card from '@/ui/Card';
import styles from './InspectModalContent.module.css';

export default function InspectModalContent({ json }) {
  return (
    <Card variant="soft" padding="lg" className={styles.container}>
      <pre className={styles.code}>
        {json}
      </pre>
    </Card>
  );
}

InspectModalContent.propTypes = {
  json: PropTypes.string.isRequired,
};
