import type { Meta, StoryObj } from '@storybook/nextjs'
import { addDays } from 'date-fns'
import React from 'react'
import { Calendar } from './Calendar'

const meta: Meta<typeof Calendar> = {
  title: 'Feedback/Calendar',
  component: Calendar,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Calendar>

export const Default: Story = {
  render: () => <Calendar mode="single" />,
}

export const WithSelectedDate: Story = {
  render: () => (
    <Calendar mode="range" selected={{ from: new Date() }} required={true} />
  ),
}

export const RangeSelection: Story = {
  render: () => (
    <Calendar
      mode="range"
      selected={{
        from: new Date(),
        to: addDays(new Date(), 5),
      }}
    />
  ),
}

export const MultipleSelection: Story = {
  render: () => (
    <Calendar
      mode="multiple"
      selected={[new Date(), addDays(new Date(), 3), addDays(new Date(), 7)]}
    />
  ),
}

export const ControlledSelection: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Date | undefined>(new Date())

    return (
      <div className="flex flex-col items-start gap-4">
        <Calendar mode="single" selected={selected} onSelect={setSelected} />
        <div className="text-sm">
          Selected date: {selected?.toLocaleDateString() || 'None'}
        </div>
      </div>
    )
  },
}

export const CaptionDropdown: Story = {
  render: () => (
    <Calendar
      captionLayout="dropdown"
      startMonth={new Date(2020, 0, 1)}
      endMonth={new Date(2025, 11, 31)}
      selected={new Date()}
      mode="single"
    />
  ),
}

export const DisabledDates: Story = {
  render: () => (
    <Calendar
      selected={new Date()}
      disabled={{ before: new Date(), after: addDays(new Date(), 7) }}
      mode="single"
    />
  ),
}
