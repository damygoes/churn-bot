import type { Meta, StoryFn } from '@storybook/nextjs'
import { Separator } from './Separator'

const meta: Meta = {
  title: 'Primitives/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

export const Horizontal: StoryFn = (args) => (
  <div className="w-full max-w-sm space-y-4">
    <div>Above the separator</div>
    <Separator {...args} orientation="horizontal" />
    <div>Below the separator</div>
  </div>
)

export const Vertical: StoryFn = (args) => (
  <div className="flex items-center space-x-4 h-20">
    <div>Left</div>
    <Separator {...args} orientation="vertical" />
    <div>Right</div>
  </div>
)

export const CustomStyled: StoryFn = () => (
  <div className="space-y-4">
    <div className="text-sm">Thick horizontal separator</div>
    <Separator className="h-2 bg-red-500" />

    <div className="text-sm">Dashed vertical separator</div>
    <div className="flex items-center h-24 space-x-4">
      <div>Block A</div>
      <Separator
        orientation="vertical"
        className="w-px bg-dashed border-l-2 border-gray-400"
      />
      <div>Block B</div>
    </div>
  </div>
)
