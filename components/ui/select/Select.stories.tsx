import type { Meta, StoryObj } from '@storybook/nextjs'

import { Icon } from '../icon/Icon'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './Select'

const meta: Meta = {
  title: 'Feedback/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}
export default meta

type Story = StoryObj<typeof Select>

export const Default: Story = {
  render: () => (
    <Select defaultValue="apple">
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="broccoli" disabled>
            Broccoli (Disabled)
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <Select defaultValue="apple">
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Pick a food" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="calendar">
            <Icon name="calendar" />
            Calendar
          </SelectItem>
          <SelectItem value="trends">
            <Icon name="trending-up" />
            Trends
          </SelectItem>
          <SelectItem value="explore">
            <Icon name="search" />
            Explore
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}
