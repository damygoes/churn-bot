import type { Meta, StoryFn } from "@storybook/nextjs";
import { Separator } from '../separator/Separator';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: "Primitives/Input",
  component: Input,
    parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    iconPosition: {
      control: "radio",
      options: ["before", "after"],
    },
  },
};

export default meta;

export const Default: StoryFn = (args) => (
  <Input placeholder="Enter your email" {...args} />
);

export const WithIconBefore: StoryFn = () => (
  <Input
    placeholder="Search something..."
    icon="search"
    iconPosition="before"
  />
);

export const WithIconAfter: StoryFn = () => (
  <Input
    placeholder="Search something..."
    icon="search"
    iconPosition="after"
  />
);

export const States: StoryFn = () => (
  <section className="space-y-8 max-w-md">
    <div>
      <p>Disabled</p>
      <Separator className="mt-0.5 mb-3" />
      <Input placeholder="Disabled input" disabled />
    </div>

    <div>
      <p>Invalid</p>
      <Separator className="mt-0.5 mb-3" />
      <Input placeholder="Invalid input" aria-invalid />
    </div>

    <div>
      <p>With icon (before)</p>
      <Separator className="mt-0.5 mb-3" />
      <Input
        placeholder="With icon"
        icon="calendar"
        iconPosition="before"
      />
    </div>

    <div>
      <p>With icon (after)</p>
      <Separator className="mt-0.5 mb-3" />
      <Input
        placeholder="With icon"
        icon="calendar"
        iconPosition="after"
      />
    </div>
  </section>
);
