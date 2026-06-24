import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { AlertCircle, Terminal, AlertTriangleIcon } from 'lucide-react';
import { Alert, AlertAction, AlertDescription, AlertTitle } from '@mrv-erp/ui';

// Предполагается, что компонент Button уже существует в вашей библиотеке
import { Button } from '@mrv-erp/ui';

const meta: Meta<typeof Alert> = {
  title: 'UI/Feedbacks/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
      description: 'Визуальный стиль уведомления',
    },
    children: {
      table: { disable: true },
    },
  },
  args: {
    variant: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

// === БАЗОВЫЕ ВАРИАНТЫ ===

export const Default: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Обратите внимание</AlertTitle>
      <AlertDescription>
        Вы можете добавить компоненты в свое приложение с помощью CLI.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
  render: (args) => (
    <Alert {...args}>
      <AlertCircle />
      <AlertTitle>Ошибка</AlertTitle>
      <AlertDescription>Ваша сессия истекла. Пожалуйста, войдите в систему снова.</AlertDescription>
    </Alert>
  ),
};

// === СТРУКТУРНЫЕ ВАРИАЦИИ ===

export const WithIcon: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Иконка должна быть прямым потомком `<Alert>` для срабатывания селектора `has-[>svg]:grid-cols-[auto_1fr]`.',
      },
    },
  },
  render: (args) => (
    <Alert {...args}>
      <Terminal />
      <AlertTitle>Системное сообщение</AlertTitle>
      <AlertDescription>Сборка приложения завершена успешно.</AlertDescription>
    </Alert>
  ),
};

export const WithAction: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Добавление `<AlertAction>` автоматически меняет `padding-right` у корневого элемента через селектор `has-data-[slot=alert-action]:pr-18`.',
      },
    },
  },
  render: (args) => (
    <Alert {...args} className="w-[500px]">
      <Terminal />
      <AlertTitle>Доступно обновление</AlertTitle>
      <AlertDescription>Загружена новая версия ERP-системы.</AlertDescription>
      <AlertAction>
        <Button size="sm">Обновить</Button>
      </AlertAction>
    </Alert>
  ),
};

export const TitleOnly: Story = {
  render: (args) => (
    <Alert {...args}>
      <Terminal />
      <AlertTitle>Операция выполнена успешно</AlertTitle>
    </Alert>
  ),
};

export const Custom: Story = {
  render: (args) => (
    <Alert
      className="max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50"
      {...args}
    >
      <AlertTriangleIcon />
      <AlertTitle>Your subscription will expire in 3 days.</AlertTitle>
      <AlertDescription>
        Renew now to avoid service interruption or upgrade to a paid plan to continue using the
        service.
      </AlertDescription>
    </Alert>
  ),
};
