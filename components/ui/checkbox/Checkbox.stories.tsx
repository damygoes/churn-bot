import type { Meta, StoryFn, StoryObj } from "@storybook/nextjs";
import { Icon } from '../icon/Icon';
import { Label } from "../label/Label";
import { Separator } from '../separator/Separator';
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Primitives/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}
export default meta

type Story = StoryObj<typeof Checkbox>

export const States: StoryFn<Story> = () => {
  return (
    <section className="space-y-4">
      <div>
        <h3>States</h3>
        <Separator className="my-3" />

        <div className="flex flex-col gap-sm">
          <label className="flex items-center space-x-2">
            <Checkbox defaultChecked />
            <p>Checked</p>
          </label>

          <label className="flex items-center space-x-2">
            <Checkbox />
            <p>Unchecked</p>
          </label>

          <label className="flex items-center space-x-2">
            <Checkbox disabled defaultChecked />
            <p className="opacity-50">Disabled + Checked</p>
          </label>

          <label className="flex items-center space-x-2">
            <Checkbox disabled />
            <p className="opacity-50">Disabled</p>
          </label>
        </div>
      </div>
    </section>
  );
};


export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Checkbox id="notify" defaultChecked />
        <Label htmlFor="notify" className="flex items-center gap-1">
          Notify me
          <Icon name='notifications' size='md' />
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="verified" />
        <Label htmlFor="verified" className="flex items-center gap-1">
          Verified
          <Icon name='check-circle' size='md' />
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="warning" />
        <Label htmlFor="warning" className="flex items-center gap-1">
          Show warnings
          <Icon name='alert-circle' size='md' />
        </Label>
      </div>
    </div>
  ),
}
