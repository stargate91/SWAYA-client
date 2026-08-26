/* eslint-disable */
import Grid from './Grid';
import Card from './Card';
import SelectableCard from './SelectableCard';

export default {
  title: 'UI/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'auto-card', 'two-cols', 'three-cols', 'split', 'poster', 'scene', 'backdrop'],
    },
    gap: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
  },
};

export const TwoColumns = {
  args: {
    variant: 'two-cols',
    children: (
      <>
        <SelectableCard selected={true}>
          <h3>Preset 1 (Active)</h3>
          <p>Plex-style standard layout.</p>
        </SelectableCard>
        <SelectableCard>
          <h3>Preset 2</h3>
          <p>Jellyfin-style standard layout.</p>
        </SelectableCard>
        <SelectableCard>
          <h3>Preset 3</h3>
          <p>Kodi-style standard layout.</p>
        </SelectableCard>
        <SelectableCard>
          <h3>Preset 4</h3>
          <p>Minimalist layout.</p>
        </SelectableCard>
      </>
    ),
  },
};

export const ThreeColumns = {
  args: {
    variant: 'three-cols',
    children: (
      <>
        <Card title="Card 1"><p>Content 1</p></Card>
        <Card title="Card 2"><p>Content 2</p></Card>
        <Card title="Card 3"><p>Content 3</p></Card>
      </>
    ),
  },
};
