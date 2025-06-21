import type { Meta, StoryObj } from '@storybook/nextjs'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './Drawer'

import { Button } from '../button/Button'

const meta: Meta<typeof Drawer> = {
  title: 'Overlays/Drawer',
  component: Drawer,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Drawer>

const DrawerTemplate = ({
  side = 'bottom',
}: {
  side?: 'bottom' | 'top' | 'left' | 'right'
}) => (
  <div className="p-10">
    <Drawer direction={side}>
      <DrawerTrigger asChild>
        {/* Must be a single element */}
        <Button>Open Drawer ({side})</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>
            This is a description inside the drawer.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p>Drawer content goes here.</p>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button>Submit</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </div>
)

export const Default: Story = {
  render: () => DrawerTemplate({ side: 'bottom' }),
}

export const TopDrawer: Story = {
  render: () => DrawerTemplate({ side: 'top' }),
}

export const LeftDrawer: Story = {
  render: () => DrawerTemplate({ side: 'left' }),
}

export const RightDrawer: Story = {
  render: () => DrawerTemplate({ side: 'right' }),
}
