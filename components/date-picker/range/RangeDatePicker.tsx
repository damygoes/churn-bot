'use client'

import { addDays } from 'date-fns'
import * as React from 'react'
import { Button } from '../../ui/button/Button'
import { Calendar } from '../../ui/calendar/Calendar'
import { Icon } from '../../ui/icon/Icon'
import { Input } from '../../ui/input/Input'
import { Label } from '../../ui/label/Label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../ui/popover/Popover'

type DateRange = { from: Date; to: Date }

function formatDate(date: Date | undefined) {
  if (!date) return ''
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function formatRange(range: DateRange) {
  if (!range.from && !range.to) return ''
  if (range.from && !range.to) return formatDate(range.from)
  if (!range.from && range.to) return formatDate(range.to)
  return `${formatDate(range.from!)} - ${formatDate(range.to!)}`
}

export function RangeDatePicker() {
  const [open, setOpen] = React.useState(false)
  const [range, setRange] = React.useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 5),
  })

  const [inputValue, setInputValue] = React.useState('')

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="range-date" className="px-1">
        Select Date Range
      </Label>
      <div className="relative flex gap-2">
        <Input
          id="range-date"
          value={inputValue}
          placeholder="Select a date range"
          className="bg-background pr-10"
          onFocus={() => setOpen(true)}
          readOnly
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
              aria-label="Toggle calendar"
            >
              <Icon name="calendar" size="lg" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="range"
              selected={range}
              onSelect={(selected) => {
                setRange(selected as DateRange)
                setInputValue(formatRange(selected as DateRange))
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      {(range.from || range.to) && (
        <p className="text-muted-foreground px-1 text-sm">
          Selected range:{' '}
          <span className="font-medium">{formatRange(range)}</span>
        </p>
      )}
    </div>
  )
}
