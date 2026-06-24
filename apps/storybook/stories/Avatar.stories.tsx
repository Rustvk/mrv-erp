import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Check } from 'lucide-react';

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroupCount,
  AvatarImage,
  AvatarGroup,
} from '@mrv-erp/ui';

const meta: Meta<typeof Avatar> = {
  title: 'UI/Data Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Размер аватара (влияет на сам аватар, бейдж и фолбек).',
    },
    className: {
      table: { disable: true },
    },
  },
  args: {
    size: 'default',
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// === БАЗОВЫЕ ВАРИАНТЫ ===

export const Image: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Стандартный рендер с успешно загруженным изображением.',
      },
    },
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://avatars.githubusercontent.com/u/1024025?v=4" alt="@linus" />
      <AvatarFallback>LT</AvatarFallback>
    </Avatar>
  ),
};

export const Fallback: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Если передать битую ссылку или не использовать `AvatarImage`, автоматически отрендерится `AvatarFallback`.',
      },
    },
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://broken-link.com/avatar.jpg" alt="@unknown" />
      <AvatarFallback>RM</AvatarFallback>
    </Avatar>
  ),
};

// === РАЗМЕРЫ ===

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Аватар поддерживает три размера: `sm`, `default` и `lg`.',
      },
    },
  },
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="sm">
        <AvatarImage alt="Аватар" src="https://avatars.githubusercontent.com/u/1024025?v=4" />
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar size="default">
        <AvatarImage alt="Аватар" src="https://avatars.githubusercontent.com/u/1024025?v=4" />
        <AvatarFallback>DF</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage alt="Аватар" src="https://avatars.githubusercontent.com/u/1024025?v=4" />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </div>
  ),
};

// === БЕЙДЖИ (ИНДИКАТОРЫ СТАТУСА) ===

export const WithBadge: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Использование `AvatarBadge` для отображения онлайн-статуса или верификации. Размеры бейджа и иконки внутри него масштабируются автоматически благодаря селекторам `group-data-[size=*]/avatar`.',
      },
    },
  },
  render: (args) => (
    <div className="flex items-end gap-4">
      <Avatar size="sm" {...args}>
        <AvatarImage alt="Аватар" src="https://avatars.githubusercontent.com/u/1024025?v=4" />
        <AvatarFallback>SM</AvatarFallback>
        <AvatarBadge className="bg-green-500" />
      </Avatar>

      <Avatar size="default" {...args}>
        <AvatarImage alt="Аватар" src="https://avatars.githubusercontent.com/u/1024025?v=4" />
        <AvatarFallback>DF</AvatarFallback>
        <AvatarBadge>
          <Check strokeWidth={4} />
        </AvatarBadge>
      </Avatar>

      <Avatar size="lg" {...args}>
        <AvatarImage alt="Аватар" src="https://avatars.githubusercontent.com/u/1024025?v=4" />
        <AvatarFallback>LG</AvatarFallback>
        <AvatarBadge className="bg-blue-500">
          <Check strokeWidth={4} />
        </AvatarBadge>
      </Avatar>
    </div>
  ),
};

// === ГРУППИРОВКА ===

export const WithGroup: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Для группировки аватаров оберните их в AvatarGroup.',
      },
    },
  },
  args: {
    size: 'default',
  },
  render: (args) => (
    // Имитация контейнера группы, который ссылается на ваши CVA/Tailwind селекторы
    <AvatarGroup>
      <Avatar size={args.size} className="ring-2 ring-background">
        <AvatarImage alt="Аватар" src="https://avatars.githubusercontent.com/u/1024025?v=4" />
        <AvatarFallback>A1</AvatarFallback>
      </Avatar>
      <Avatar size={args.size} className="ring-2 ring-background">
        <AvatarImage alt="Аватар" src="https://avatars.githubusercontent.com/u/810438?v=4" />
        <AvatarFallback>A2</AvatarFallback>
      </Avatar>
      <Avatar size={args.size} className="ring-2 ring-background">
        <AvatarFallback>A3</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  ),
};
