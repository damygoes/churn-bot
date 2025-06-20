import type { Meta, StoryObj } from "@storybook/nextjs";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Primitives/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}
export default meta

type Story = StoryObj<typeof Avatar>

// --- Default avatar with image and fallback ---
export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="User avatar" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
}

// --- Fallback only (no image) ---
export const FallbackOnly: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="" alt="No image" />
      <AvatarFallback>
        <User className="size-4 text-muted-foreground" />
      </AvatarFallback>
    </Avatar>
  ),
}

// --- Avatar Group with overlapping layout ---
export const AvatarGroup: Story = {
  render: () => (
    <div className="flex -space-x-3">
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/150?img=11" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/150?img=12" />
        <AvatarFallback>CD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/150?img=13" />
        <AvatarFallback>EF</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="" />
        <AvatarFallback>+3</AvatarFallback>
      </Avatar>
    </div>
  ),
}
