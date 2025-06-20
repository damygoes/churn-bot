import type { Meta, StoryObj } from "@storybook/nextjs";
import { MultipleDatePicker } from "./MultipleDatePicker";

const meta: Meta<typeof MultipleDatePicker> = {
  title: "Feedback/DatePicker/Multiple",
  component: MultipleDatePicker,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof MultipleDatePicker>;

export const Default: Story = {
  render: () => <div className='flex items-center justify-center max-w-md'><MultipleDatePicker /></div>
};
