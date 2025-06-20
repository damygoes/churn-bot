import type { Meta, StoryFn } from "@storybook/nextjs";
import { Input } from '../input/Input';
import { Label } from "./Label";

const meta: Meta = {
  title: "Primitives/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryFn = (args) => (
  <div className="flex flex-col gap-1.5">
    <Label htmlFor="email" {...args}>
      Email
    </Label>
    <Input
      type="email"
      id="email"
      placeholder="you@example.com"
    />
  </div>
);

export const WithDisabledInput: StoryFn = () => (
  <div className="flex flex-col gap-1.5 group data-[disabled=true]:opacity-50">
    <Label htmlFor="disabled-email">Disabled Email</Label>
    <Input
      type="email"
      id="disabled-email"
      placeholder="you@example.com"
      disabled
    />
  </div>
);

export const CustomStyled: StoryFn = () => (
  <div className="flex flex-col gap-1.5">
    <Label htmlFor="custom" className="text-destructive text-lg font-bold">
      Custom Styled Label
    </Label>
    <Input
      type="text"
      id="custom"
      placeholder="Custom input"
    />
  </div>
);
