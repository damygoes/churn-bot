"use client"

import * as React from "react"
import { Button } from '../../ui/button/Button'
import { Calendar } from '../../ui/calendar/Calendar'
import { Icon } from '../../ui/icon/Icon'
import { Input } from '../../ui/input/Input'
import { Label } from '../../ui/label/Label'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover/Popover'

function formatDates(dates: Date[] = []) {
  return dates
    .map((d) =>
      d.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    )
    .join(", ")
}

export function MultipleDatePicker() {
  const [open, setOpen] = React.useState(false)
  const [dates, setDates] = React.useState<Date[]>([])
  const [inputValue, setInputValue] = React.useState("")

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="multiple-date" className="px-1">Select Dates</Label>
      <div className="relative flex gap-2">
        <Input
          id="multiple-date"
          value={inputValue}
          placeholder="Select multiple dates"
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
              <Icon name='calendar' size='lg' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="multiple"
              selected={dates}
              onSelect={(selected) => {
                if (Array.isArray(selected)) {
                  setDates(selected)
                  setInputValue(formatDates(selected))
                }
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      {dates.length > 0 && (
        <p className="text-muted-foreground px-1 text-sm">
          Selected dates: <span className="font-medium">{formatDates(dates)}</span>
        </p>
      )}
    </div>
  )
}
