"use client"

import * as React from "react"
import { Button } from '../../ui/button/Button'
import { Calendar } from '../../ui/calendar/Calendar'
import { Icon } from '../../ui/icon/Icon'
import { Input } from '../../ui/input/Input'
import { Label } from '../../ui/label/Label'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover/Popover'

function formatDate(date: Date | undefined) {
  if (!date) return ""
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

export function SingleDatePicker() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [inputValue, setInputValue] = React.useState("")

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="single-date" className="px-1">Select Date</Label>
      <div className="relative flex gap-2">
        <Input
          id="single-date"
          value={inputValue}
          placeholder="Select a date"
          className="bg-background pr-10"
          onFocus={() => setOpen(true)}
          readOnly // prevent manual typing for simplicity
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
              aria-label="Toggle calendar"
            >
              <Icon name='calendar' size='lg' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => {
                setDate(d)
                setInputValue(formatDate(d))
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      {date && (
        <p className="text-muted-foreground px-1 text-sm">
          Selected date: <span className="font-medium">{formatDate(date)}</span>
        </p>
      )}
    </div>
  )
}
