import { Label } from '@/components/ui/label/Label'
import type { Meta, StoryFn } from '@storybook/nextjs'
import * as React from 'react'
import { Switch } from './Switch'

const meta: Meta = {
  title: 'Primitives/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryFn = (args) => (
  <div className="flex items-center space-x-2">
    <Label htmlFor="switch-default">Airplane mode</Label>
    <Switch id="switch-default" {...args} />
  </div>
)

export const Disabled: StoryFn = () => (
  <div className="flex items-center space-x-2">
    <Label htmlFor="switch-disabled">Notifications</Label>
    <Switch id="switch-disabled" disabled />
  </div>
)

export const Controlled: StoryFn = () => {
  const [enabled, setEnabled] = React.useState(false)

  return (
    <div className="flex items-center space-x-4">
      <Label htmlFor="switch-controlled">
        {enabled ? 'Enabled' : 'Disabled'}
      </Label>
      <Switch
        id="switch-controlled"
        checked={enabled}
        onCheckedChange={setEnabled}
      />
    </div>
  )
}
