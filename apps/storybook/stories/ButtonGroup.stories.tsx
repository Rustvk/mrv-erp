import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Underline } from 'lucide-react';

import { Button, ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from '@mrv-erp/ui';

const meta: Meta<typeof ButtonGroup> = {
  title: 'UI/Forms/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Определяет направление выстраивания элементов и логику скругления углов.',
    },
  },
  args: {
    orientation: 'horizontal',
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

// === БАЗОВЫЕ ВАРИАНТЫ ===

export const Horizontal: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">День</Button>
      <Button variant="outline">Неделя</Button>
      <Button variant="outline">Месяц</Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">Профиль</Button>
      <Button variant="outline">Настройки</Button>
      <Button variant="outline">Безопасность</Button>
    </ButtonGroup>
  ),
};

// === ИНТЕГРАЦИЯ С ИКОНКАМИ ===

export const IconButtons: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Использование кнопок с иконками (требует `size="icon"` у компонента `Button`). Рамки смежных элементов схлопываются благодаря селекторам в `buttonGroupVariants`.',
      },
    },
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline" size="icon" aria-label="Align left">
        <AlignLeft />
      </Button>
      <Button variant="outline" size="icon" aria-label="Align center">
        <AlignCenter />
      </Button>
      <Button variant="outline" size="icon" aria-label="Align right">
        <AlignRight />
      </Button>
    </ButtonGroup>
  ),
};

// === СТРУКТУРНЫЕ ВАРИАЦИИ ===

export const WithTextAddon: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Компонент `ButtonGroupText` используется для отображения неинтерактивного префикса или суффикса. В данном примере демонстрируется использование нативного тега `<input>`, который автоматически растягивается за счет селектора `[&>input]:flex-1`.',
      },
    },
  },
  render: (args) => (
    <ButtonGroup {...args} className="w-[400px]">
      <ButtonGroupText>https://</ButtonGroupText>
      <input
        type="text"
        placeholder="example.com"
        className="flex h-8 w-full rounded-none border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:relative focus-visible:z-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      />
      <Button variant="default">Копировать</Button>
    </ButtonGroup>
  ),
};

export const WithSeparator: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Использование `ButtonGroupSeparator` для явного визуального разделения логических групп кнопок внутри одного контейнера.',
      },
    },
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="ghost" size="icon">
        <Bold />
      </Button>
      <Button variant="ghost" size="icon">
        <Italic />
      </Button>
      <Button variant="ghost" size="icon">
        <Underline />
      </Button>

      <ButtonGroupSeparator />

      <Button variant="ghost" size="icon">
        <AlignLeft />
      </Button>
      <Button variant="ghost" size="icon">
        <AlignCenter />
      </Button>
      <Button variant="ghost" size="icon">
        <AlignRight />
      </Button>
    </ButtonGroup>
  ),
};
