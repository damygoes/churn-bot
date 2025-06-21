'use client'

import { parseDate } from 'chrono-node'
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
import { formatDateToNaturalLanguage, formatSelectedDate } from '../utils'

export function NaturalLanguageDatePicker() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('In 2 days')
  const [date, setDate] = React.useState<Date | undefined>(
    parseDate(value) || undefined
  )
  const [month, setMonth] = React.useState<Date | undefined>(date)

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="natural-language-date" className="px-1">
        Schedule Date
      </Label>
      <div className="relative flex gap-2">
        <Input
          id="natural-language-date"
          value={value}
          placeholder="Tomorrow or next week"
          className="bg-background pr-10"
          onChange={(e) => {
            setValue(e.target.value)
            const parsed = parseDate(e.target.value)
            if (parsed) {
              setDate(parsed)
              setMonth(parsed)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
              aria-label="Select date"
            >
              <Icon name="calendar" size="lg" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(d) => {
                setDate(d)
                setValue(formatDateToNaturalLanguage(d!))
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="text-muted-foreground px-1 text-sm">
        Your post will be published on{' '}
        <span className="font-medium">{formatSelectedDate(date)}</span>.
      </div>
    </div>
  )
}
