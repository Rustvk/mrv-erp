import type { Meta, StoryObj } from '@storybook/react-webpack5';
import * as React from 'react';

import { Calendar } from '@mrv-erp/ui';

const meta: Meta<typeof Calendar> = {
  title: 'UI/Forms/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    mode: {
      table: { disable: true },
    },
    showOutsideDays: {
      control: 'boolean',
      description: 'Отображение дней из предыдущего и следующего месяцев.',
    },
    showWeekNumber: {
      control: 'boolean',
      description: 'Отображение номеров недель.',
    },
    captionLayout: {
      control: 'select',
      options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years'],
      description: 'Макет заголовка (навигация по месяцам/годам).',
    },
  },
  args: {
    showOutsideDays: true,
    captionLayout: 'label',
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

// Вспомогательный тип для пропсов, которыми мы управляем через Controls
type DemoProps = {
  showOutsideDays?: boolean;
  showWeekNumber?: boolean;
  captionLayout?: 'label' | 'dropdown' | 'dropdown-months' | 'dropdown-years';
};

// === КОМПОНЕНТЫ-ОБЕРТКИ (ДЛЯ ОБХОДА ESLINT RULES-OF-HOOKS) ===

const SingleDemo = ({ showOutsideDays, showWeekNumber, captionLayout }: DemoProps) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      showOutsideDays={showOutsideDays}
      showWeekNumber={showWeekNumber}
      captionLayout={captionLayout}
      className="rounded-md border shadow-sm"
    />
  );
};

const MultipleDemo = ({ showOutsideDays, showWeekNumber, captionLayout }: DemoProps) => {
  const initialDays = [
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 2)),
    new Date(new Date().setDate(new Date().getDate() + 5)),
  ];
  const [dates, setDates] = React.useState<Date[] | undefined>(initialDays);

  return (
    <Calendar
      mode="multiple"
      selected={dates}
      onSelect={setDates}
      showOutsideDays={showOutsideDays}
      showWeekNumber={showWeekNumber}
      captionLayout={captionLayout}
      className="rounded-md border shadow-sm"
    />
  );
};

const RangeDemo = ({ showOutsideDays, showWeekNumber, captionLayout }: DemoProps) => {
  type LocalDateRange = {
    from: Date | undefined;
    to?: Date | undefined;
  };

  const [date, setDate] = React.useState<LocalDateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 3)),
    to: new Date(new Date().setDate(new Date().getDate() + 4)),
  });

  return (
    <Calendar
      mode="range"
      selected={date}
      onSelect={setDate}
      showOutsideDays={showOutsideDays}
      showWeekNumber={showWeekNumber}
      captionLayout={captionLayout}
      className="rounded-md border shadow-sm"
    />
  );
};

const DropdownsDemo = ({ showOutsideDays, showWeekNumber }: DemoProps) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const currentYear = new Date().getFullYear();

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      showOutsideDays={showOutsideDays}
      showWeekNumber={showWeekNumber}
      captionLayout="dropdown"
      startMonth={new Date(currentYear - 10, 0)}
      endMonth={new Date(currentYear + 10, 11)}
      className="rounded-md border shadow-sm"
    />
  );
};

const DisabledDatesDemo = ({ showOutsideDays, showWeekNumber, captionLayout }: DemoProps) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      disabled={[new Date(new Date().setDate(new Date().getDate() - 1)), { dayOfWeek: [0, 6] }]}
      showOutsideDays={showOutsideDays}
      showWeekNumber={showWeekNumber}
      captionLayout={captionLayout}
      className="rounded-md border shadow-sm"
    />
  );
};

// === ИСТОРИИ ===

export const Single: Story = {
  render: (args) => <SingleDemo {...args} />,
};

export const Multiple: Story = {
  render: (args) => <MultipleDemo {...args} />,
};

export const Range: Story = {
  render: (args) => <RangeDemo {...args} />,
};

export const WithDropdowns: Story = {
  render: (args) => <DropdownsDemo {...args} />,
};

export const DisabledDates: Story = {
  render: (args) => <DisabledDatesDemo {...args} />,
};
