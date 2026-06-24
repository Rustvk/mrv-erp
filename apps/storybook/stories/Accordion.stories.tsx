import type { Meta, StoryObj } from '@storybook/react-webpack5';

// Укажите корректный путь к вашим компонентам
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@mrv-erp/ui';

const meta: Meta<typeof Accordion> = {
  title: 'UI/Data Display/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['single', 'multiple'],
      description: 'Определяет логику открытия элементов.',
    },
    collapsible: {
      control: 'boolean',
      description: 'Разрешает закрытие всех элементов (только для type="single").',
      if: { arg: 'type', eq: 'single' },
    },
    disabled: {
      control: 'boolean',
      description: 'Глобальное отключение всего аккордеона.',
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    type: 'single',
    collapsible: true,
    className: 'w-full max-w-md',
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

// Моковые данные для рендера списков
const items = [
  {
    value: 'item-1',
    title: 'Is it accessible?',
    content: 'Yes. It adheres to the WAI-ARIA design pattern.',
  },
  {
    value: 'item-2',
    title: 'Is it styled?',
    content: 'Yes. It comes with default styles that matches the other components aesthetic.',
  },
  {
    value: 'item-3',
    title: 'Is it animated?',
    content: 'Yes. It is animated by default, but you can disable it if you prefer.',
  },
];

// === БАЗОВЫЕ ВАРИАНТЫ ===

export const Single: Story = {
  render: (args) => (
    <Accordion {...args} className="w-80">
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

export const Multiple: Story = {
  args: {
    type: 'multiple',
    defaultValue: ['item-1', 'item-2'], // Для multiple требуется массив
  },
  render: (args) => (
    <Accordion {...args}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

// === СОСТОЯНИЯ ===

export const DisabledItem: Story = {
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Available Item</AccordionTrigger>
        <AccordionContent>This item functions normally.</AccordionContent>
      </AccordionItem>

      {/* Точечное отключение конкретного элемента */}
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Disabled Item</AccordionTrigger>
        <AccordionContent>You cannot expand this item.</AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>Another Available Item</AccordionTrigger>
        <AccordionContent>This item functions normally.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
