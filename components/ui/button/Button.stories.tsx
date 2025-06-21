import type { Meta, StoryFn, StoryObj } from '@storybook/nextjs'
import { Icon } from '../icon/Icon'
import { Separator } from '../separator/Separator'
import { Button, ButtonSizes, ButtonVariants } from './Button'

const variants: ButtonVariants = [
  'default',
  'secondary',
  'destructive',
  'outline',
  'ghost',
  'link',
]

const sizes: ButtonSizes = ['sm', 'default', 'icon']

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: variants,
    },
    size: {
      control: 'select',
      options: sizes,
    },
    iconPosition: {
      control: 'radio',
      options: ['before', 'after'],
    },
    isLoading: {
      control: 'boolean',
    },
  },
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: StoryFn<Story> = (args) => {
  return (
    <Button variant="default" size="default" {...args}>
      <span className="capitalize">Button</span>
    </Button>
  )
}

export const Variants: StoryFn<Story> = () => {
  return (
    <div className="flex flex-wrap gap-4">
      {variants.map((variant) => (
        <Button key={variant} variant={variant}>
          <span className="capitalize">{variant}</span>
        </Button>
      ))}
    </div>
  )
}

export const Sizes: StoryFn<Story> = () => {
  return (
    <div className="flex flex-wrap gap-4">
      {sizes.map((size) => (
        <Button key={size} size={size}>
          {size === 'icon' ? (
            <span>Icon</span>
          ) : (
            <span className="capitalize">Registrieren</span>
          )}
        </Button>
      ))}
    </div>
  )
}

export const States: StoryFn<Story> = () => {
  return (
    <section className="space-y-4">
      <div>
        <p>Disabled</p>
        <Separator className="my-3" />
        <Button disabled>Disabled</Button>
      </div>
      <div>
        <p>Loading</p>
        <Separator className="my-3" />
        <Button isLoading>Loading...</Button>
      </div>
      <div>
        <p>With Icons</p>
        <Separator className="my-3" />
        <div className="flex flex-wrap gap-4">
          <Button icon="trending-up" iconPosition="before">
            With Left Icon
          </Button>
          <Button icon="trending-down" iconPosition="after">
            With Right Icon
          </Button>
        </div>
      </div>
    </section>
  )
}

export const IconButton: StoryFn<Story> = () => {
  return (
    <section className="space-y-8">
      <div>
        <p>Default</p>
        <Separator className="my-3" />
        <Button size="icon">
          <Icon name="trending-up" />
        </Button>
      </div>
      <div>
        <p>Disabled State</p>
        <Separator className="my-3" />
        <div className="flex flex-wrap gap-base">
          <Button size="icon" disabled>
            <Icon name="trending-down" />
          </Button>
        </div>
      </div>
      <div>
        <p>With variants</p>
        <Separator className="my-3" />
        <div className="flex flex-wrap gap-4">
          <Button size="icon">
            <Icon name="trending-up" />
          </Button>
          <Button size="icon" variant="secondary">
            <Icon name="trending-up" />
          </Button>
          <Button size="icon" variant="ghost">
            <Icon name="trending-up" />
          </Button>
          <Button size="icon" variant="destructive">
            <Icon name="trending-up" />
          </Button>
          <Button size="icon" variant="outline">
            <Icon name="trending-up" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export const SizesWithIcon: StoryFn<Story> = () => {
  return (
    <div className="flex flex-wrap gap-4">
      {sizes.map((size) => (
        <Button key={size} size={size} icon="trending-up">
          {size !== 'icon' && <span className="capitalize">Get started</span>}
        </Button>
      ))}
    </div>
  )
}
