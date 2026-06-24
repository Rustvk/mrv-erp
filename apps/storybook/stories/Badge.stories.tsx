import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Check, Info } from 'lucide-react';

import { Badge } from '@mrv-erp/ui';

const meta: Meta<typeof Badge> = {
  title: 'UI/Data Display/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
      description: 'Визуальный стиль бейджа',
    },
    asChild: {
      table: { disable: true },
    },
    'data-icon': {
      table: { disable: true },
    },
  },
  args: {
    children: 'Badge',
    variant: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'New Feature',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Draft',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Deprecated',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Read Only',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Optional',
  },
};

export const LinkVariant: Story = {
  args: {
    variant: 'link',
    children: 'View docs',
  },
};

export const WithIconStart: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Использование `data-icon="inline-start"` триггерит селектор `has-data-[icon=inline-start]:pl-1.5`, уменьшая левый отступ для визуального баланса.',
      },
    },
  },
  args: {
    variant: 'secondary',
    'data-icon': 'inline-start',
    children: (
      <>
        <Check />
        <span>Verified</span>
      </>
    ),
  },
};

export const WithIconEnd: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Использование `data-icon="inline-end"` триггерит селектор `has-data-[icon=inline-end]:pr-1.5`, уменьшая правый отступ.',
      },
    },
  },
  args: {
    variant: 'outline',
    'data-icon': 'inline-end',
    children: (
      <>
        <span>More info</span>
        <Info />
      </>
    ),
  },
};

export const AsLink: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'При передаче `asChild` и вложенного тега `<a>`, в CVA активируются специфичные селекторы наведения (например, `[a]:hover:bg-primary/80`). Это позволяет бейджу вести себя как интерактивная ссылка.',
      },
    },
  },
  args: {
    asChild: true,
    children: (
      <a href="#" target="_blank" rel="noreferrer">
        Release Notes
      </a>
    ),
  },
};

export const Grouped: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Пример рендера группы бейджей в интерфейсе.',
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-2">
      <Badge variant="default">v2.4.0</Badge>
      <Badge variant="secondary">Beta</Badge>
      <Badge variant="outline">Q3 2026</Badge>
    </div>
  ),
};
