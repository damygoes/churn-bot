import type { Meta, StoryObj } from '@storybook/nextjs'
import { Icon } from '../icon/Icon'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
  },
}
export default meta

type Story = StoryObj<typeof Badge>

// --- Default badge ---
export const Default: Story = {
  args: {
    children: 'Active',
    variant: 'default',
  },
}

// --- Secondary badge ---
export const Secondary: Story = {
  args: {
    children: 'In Progress',
    variant: 'secondary',
  },
}

// --- Destructive badge with icon ---
export const Destructive: Story = {
  render: () => (
    <Badge variant="destructive">
      <Icon name="alert-circle" size="lg" />
      Error
    </Badge>
  ),
}

// --- Outline badge ---
export const Outline: Story = {
  args: {
    children: 'Beta',
    variant: 'outline',
  },
}
