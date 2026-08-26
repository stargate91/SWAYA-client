import '../src/index.css';

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    }
  },
  decorators: [
    (Story) => {
      document.documentElement.setAttribute('data-theme', 'dark');
      return (
        /* eslint-disable-next-line react/forbid-dom-props */
        <div style={{ padding: '2rem', background: 'var(--bg-app, #0b0e14)', color: 'var(--text-primary, #f8fafc)', minHeight: '100vh' }}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;