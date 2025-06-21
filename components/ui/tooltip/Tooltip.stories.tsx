import type { Meta, StoryFn } from '@storybook/nextjs'
import { Button } from '../button/Button'
import { Tooltip, TooltipContent, TooltipTrigger } from './Tooltip'

const meta: Meta = {
  title: 'Navigation/Tootltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryFn = (args) => (
  <Tooltip {...args}>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>This is a tooltip</TooltipContent>
  </Tooltip>
)

export const AllPositions: StoryFn = () => (
  <div className="flex justify-evenly items-center h-[400px] gap-4">
    {/* Top */}
    <div className="flex justify-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={8}>
          Tooltip on top
        </TooltipContent>
      </Tooltip>
    </div>

    {/* Left */}
    <div className="flex justify-end items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left" sideOffset={8}>
          Tooltip on left
        </TooltipContent>
      </Tooltip>
    </div>

    {/* Right */}
    <div className="flex justify-start items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>
          Tooltip on right
        </TooltipContent>
      </Tooltip>
    </div>

    {/* Bottom */}
    <div className="flex justify-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={8}>
          Tooltip on bottom
        </TooltipContent>
      </Tooltip>
    </div>
  </div>
)

export const TooltipWithLongText: StoryFn = () => (
  <div className="flex justify-center items-center h-60">
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me (long text)</Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-[250px]">
        This is a longer tooltip content that wraps across multiple lines for
        better readability.
      </TooltipContent>
    </Tooltip>
  </div>
)
