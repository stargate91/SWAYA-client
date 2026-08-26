import PropTypes from 'prop-types';
import HelpChannelCard from './HelpChannelCard';
import styles from './HelpChannelsGrid.module.css';

export default function HelpChannelsGrid({ channels = [] }) {
  return (
    <section className={styles.grid} aria-label="Support Channels">
      {channels.map((channel) => (
        <HelpChannelCard
          key={channel.id}
          type={channel.type}
          icon={channel.icon}
          badgeText={channel.badgeText}
          badgeTone={channel.badgeTone}
          tag={channel.tag}
          title={channel.title}
          description={channel.description}
          buttonText={channel.buttonText}
          buttonHref={channel.buttonHref}
          buttonVariant={channel.buttonVariant}
          buttonIcon={channel.buttonIcon}
          isExternal={channel.isExternal}
        />
      ))}
    </section>
  );
}

HelpChannelsGrid.propTypes = {
  channels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['discord', 'email']).isRequired,
      icon: PropTypes.node,
      badgeText: PropTypes.string.isRequired,
      badgeTone: PropTypes.string,
      tag: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      buttonText: PropTypes.string.isRequired,
      buttonHref: PropTypes.string.isRequired,
      buttonVariant: PropTypes.string,
      buttonIcon: PropTypes.node,
      isExternal: PropTypes.bool,
    })
  ),
};

