import type { Meta, StoryFn } from '@storybook/nextjs'
import React from 'react'
import { Button } from '../button/Button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './DropdownMenu'

const meta: Meta = {
  title: 'Navigation/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

export const Default: StoryFn = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">Open Menu</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem>
        New File <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        Save As… <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

export const WithCheckboxItems: StoryFn = () => {
  const [showLineNumbers, setShowLineNumbers] = React.useState(true)
  const [wrapText, setWrapText] = React.useState(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Preferences</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Editor Settings</DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          checked={showLineNumbers}
          onCheckedChange={setShowLineNumbers}
        >
          Show Line Numbers
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={wrapText}
          onCheckedChange={setWrapText}
        >
          Wrap Text
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const WithRadioItems: StoryFn = () => {
  const [theme, setTheme] = React.useState('light')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Theme</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Choose Theme</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const WithSubmenu: StoryFn = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">More Options</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Tools</DropdownMenuLabel>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>Format</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem>Prettier</DropdownMenuItem>
          <DropdownMenuItem>ESLint</DropdownMenuItem>
          <DropdownMenuItem>Stylelint</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Settings</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)
