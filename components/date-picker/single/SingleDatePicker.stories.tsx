import type { Meta, StoryObj } from "@storybook/nextjs";
import { SingleDatePicker } from "./SingleDatePicker";

const meta: Meta<typeof SingleDatePicker> = {
  title: "Feedback/DatePicker/Single",
  component: SingleDatePicker,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SingleDatePicker>;

export const Default: Story = {
  render: () => <div className='flex items-center justify-center max-w-md'><SingleDatePicker /></div>,
};
