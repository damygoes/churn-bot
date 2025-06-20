import type { Meta, StoryObj } from "@storybook/nextjs";
import { Info, Lock, ServerCog } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Navigation/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}
export default meta

type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[380px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <Info className="size-4 text-blue-500" />
            What is this product?
          </span>
        </AccordionTrigger>
        <AccordionContent>
          This product helps SaaS teams share metrics, alerts, and releases across Slack and dashboards.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <ServerCog className="size-4 text-purple-500" />
            How does it integrate?
          </span>
        </AccordionTrigger>
        <AccordionContent>
          Easily integrates with your GitHub, Stripe, and Slack accounts with minimal setup.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <Lock className="size-4 text-red-500" />
            Is my data safe?
          </span>
        </AccordionTrigger>
        <AccordionContent>
          Yes. All data is encrypted at rest and in transit. You remain the sole owner of your information.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
