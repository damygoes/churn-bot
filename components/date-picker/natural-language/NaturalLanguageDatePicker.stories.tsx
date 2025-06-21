import type { Meta, StoryObj } from '@storybook/nextjs'
import { NaturalLanguageDatePicker } from './NaturalLanguageDatePicker'

const meta: Meta<typeof NaturalLanguageDatePicker> = {
  title: 'Feedback/DatePicker/NaturalLanguage',
  component: NaturalLanguageDatePicker,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof NaturalLanguageDatePicker>

export const Default: Story = {
  render: () => (
    <div className="flex items-center justify-center max-w-md">
      <NaturalLanguageDatePicker />
    </div>
  ),
}
