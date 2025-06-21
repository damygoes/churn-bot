import type { Meta, StoryObj } from '@storybook/nextjs'
import { Button } from '../button/Button'
import { Popover, PopoverContent, PopoverTrigger } from './Popover'

const meta: Meta = {
  title: 'Navigation/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="text-sm">Here is some content in the popover!</div>
      </PopoverContent>
    </Popover>
  ),
}

export const WithCustomAlign: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open Aligned Popover</Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <div className="text-sm">Popover aligned to the end</div>
      </PopoverContent>
    </Popover>
  ),
}
