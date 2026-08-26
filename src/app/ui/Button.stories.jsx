import Button from './Button';

export default {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'secondary-neutral', 'ghost', 'danger', 'success', 'onboarding-back', 'onboarding-continue', 'glass'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export const Primary = {
  args: {
    children: 'Primary Action',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary = {
  args: {
    children: 'Secondary Action',
    variant: 'secondary',
    size: 'md',
  },
};

export const SecondaryNeutral = {
  args: {
    children: 'Secondary Neutral Action',
    variant: 'secondary-neutral',
    size: 'md',
  },
};

export const Danger = {
  args: {
    children: 'Delete Item',
    variant: 'danger',
    size: 'md',
  },
};

export const SmallGhost = {
  args: {
    children: 'Cancel',
    variant: 'ghost',
    size: 'sm',
  },
};
