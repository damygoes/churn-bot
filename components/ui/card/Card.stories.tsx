import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "../button/Button";
import { Icon } from '../icon/Icon';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Card";

const meta: Meta<typeof Card> = {
  title: "Feedback/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}
export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card className="w-[340px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon name='rocket' size='xl' className='text-primary' />
          Launch your project
        </CardTitle>
        <CardDescription className="flex items-center gap-1">
          Get started with just a few steps.
        </CardDescription>
        <CardAction>
          <Button size="sm" variant="outline">
            Help
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ul className="text-sm space-y-2">
          <li>✅ Choose a plan</li>
          <li>✅ Connect your repo</li>
          <li>✅ Deploy to production</li>
        </ul>
      </CardContent>
      <CardFooter className="justify-between">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Icon name='badge-check' size='lg' className="text-green-500" />
          All set!
        </div>
        <Button size="sm">Continue</Button>
      </CardFooter>
    </Card>
  ),
}
