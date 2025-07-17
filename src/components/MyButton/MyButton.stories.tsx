import type { Meta, StoryObj } from '@storybook/react';
import { MyButton } from './MyButton';

const meta: Meta<typeof MyButton> = {
  title: 'Components/MyButton',
  component: MyButton,
  tags: ['autodocs'],
  argTypes: {
    highlight: { control: 'boolean' },
    children: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof MyButton>;

export const Default: Story = {
  args: {
    children: 'Default Button',
  },
};

export const Highlighted: Story = {
  args: {
    highlight: true,
    children: 'Highlighted Button',
  },
}; 