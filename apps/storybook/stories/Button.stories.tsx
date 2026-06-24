import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Button } from '@mrv-erp/ui'; // Убедитесь, что путь до компонента верный

const meta = {
  title: 'UI/Forms/Button',
  component: Button,
  parameters: {
    // Центрируем компонент на холсте Storybook
    layout: 'centered',
  },
  // Автоматически генерирует страницу документации (Autodocs)
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      description: 'Визуальный стиль кнопки',
      options: ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'],
    },
    size: {
      control: 'select',
      description: 'Размер кнопки',
      options: ['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'],
    },
    disabled: {
      control: 'boolean',
      description: 'Отключает взаимодействие с кнопкой',
    },
    asChild: {
      control: 'boolean',
      description: 'Использовать Slot из Radix UI (например, для рендера ссылки <a>)',
    },
    children: {
      control: 'text',
      description: 'Содержимое кнопки',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// === БАЗОВЫЕ ВАРИАНТЫ (VARIANTS) ===

export const Default: Story = {
  args: {
    children: 'Primary Button',
    variant: 'default',
    size: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Delete Item',
    variant: 'destructive',
  },
};

export const Link: Story = {
  args: {
    children: 'Go to documentation',
    variant: 'link',
  },
};

// === РАЗМЕРЫ (SIZES) ===

export const ExtraSmall: Story = {
  args: {
    children: 'Extra Small',
    size: 'xs',
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

// === ИКОНКИ ===

// Пример того, как кнопка будет выглядеть только с иконкой
const ExampleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export const IconButton: Story = {
  args: {
    variant: 'outline',
    size: 'icon',
    children: <ExampleIcon />,
    'aria-label': 'Next step',
  },
};

export const WithIconStart: Story = {
  args: {
    children: (
      <>
        <ExampleIcon />
        <span>Continue</span>
      </>
    ),
    // Передаем data-атрибут, который обрабатывается в вашем CVA (has-data-[icon=inline-start])
    'data-icon': 'inline-start',
  },
};

// === СОСТОЯНИЯ (STATES) ===

export const Disabled: Story = {
  args: {
    children: 'Not Allowed',
    disabled: true,
  },
};

// === AS CHILD (РЕНДЕР ССЫЛКИ) ===

export const AsLink: Story = {
  args: {
    asChild: true,
    children: (
      <a href="https://dararu.com" target="_blank" rel="noreferrer">
        Rendered as Anchor element
      </a>
    ),
  },
};
