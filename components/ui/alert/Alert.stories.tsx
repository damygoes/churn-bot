import type { Meta, StoryObj } from '@storybook/nextjs'
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from './Alert'

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}
export default meta

type Story = StoryObj<typeof Alert>

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      {/* Default */}
      <Alert variant="default">
        <Info className="mt-0.5" />
        <AlertTitle>Info Alert</AlertTitle>
        <AlertDescription>
          This is a general alert — great for neutral messages or updates.
        </AlertDescription>
      </Alert>

      {/* Destructive */}
      <Alert className="bg-destructive">
        <XCircle className="mt-0.5" />
        <AlertTitle>Error Alert</AlertTitle>
        <AlertDescription>
          Something went wrong. Please check your connection or try again later.
        </AlertDescription>
      </Alert>

      {/* Success (Custom Styling Example) */}
      <Alert className="bg-green-50 text-green-900 border-green-300 [&>svg]:text-green-600">
        <CheckCircle className="mt-0.5" />
        <AlertTitle>Success Alert</AlertTitle>
        <AlertDescription>
          Your changes have been saved successfully.
        </AlertDescription>
      </Alert>

      {/* Warning (Custom Styling Example) */}
      <Alert className="bg-yellow-50 text-yellow-900 border-yellow-300 [&>svg]:text-yellow-600">
        <AlertTriangle className="mt-0.5" />
        <AlertTitle>Warning Alert</AlertTitle>
        <AlertDescription>
          Please double check your settings before proceeding.
        </AlertDescription>
      </Alert>
    </div>
  ),
}
