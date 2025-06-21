import type { Meta, StoryObj } from '@storybook/nextjs'
import { RangeDatePicker } from './RangeDatePicker'

const meta: Meta<typeof RangeDatePicker> = {
  title: 'Feedback/DatePicker/Range',
  component: RangeDatePicker,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof RangeDatePicker>

export const Default: Story = {
  render: () => (
    <div className="flex items-center justify-center max-w-md">
      <RangeDatePicker />
    </div>
  ),
}
