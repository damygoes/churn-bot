import type { Meta, StoryFn, StoryObj } from '@storybook/nextjs';
import { Icon, IconProps } from './Icon';
import { iconMap, IconName } from "./iconMapping";

const meta: Meta<typeof Icon> = {
  title: "Primitives/Icon",
  component: Icon,
  argTypes: {
    name: {
      control: "select",
      options: Object.keys(iconMap),
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl", "3xl", "5xl"],
    },
    color: {
      control: "color",
    },
  },
  args: {
    name: "trending-up",
    size: "xl",
    color: "currentColor",
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: StoryFn<typeof Icon> = (args) => (
  <div className="flex items-center space-x-4">
    <Icon {...args} />
  </div>
);



// Showcase of all sizes for a single icon
export const Sizes: StoryFn<typeof Icon> = () => {
  const sizes: IconProps["size"][] = ["sm", "md", "lg", "xl", "2xl", "3xl", "5xl"];
  const name: IconProps["name"] = "trending-up";

  return (
    <section className="space-y-6">
      <div>
        <div className="flex flex-wrap gap-4 items-center">
          {sizes.map((size) => (
            <div key={size} className="flex flex-col items-center space-y-1">
              <Icon name={name} size={size} />
              <p>{size}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Showcase all icons with their names
export const AllIcons: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
      {Object.keys(iconMap).map((name) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Icon {...args} name={name as IconName} />
          <span style={{ fontSize: 12, marginTop: 4 }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};
