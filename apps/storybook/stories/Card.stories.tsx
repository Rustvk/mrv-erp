import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { MoreVertical, TrendingUp } from 'lucide-react';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
} from '@mrv-erp/ui';

const meta: Meta<typeof Card> = {
  title: 'UI/Data Display/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'sm'],
      description:
        'Размер карточки. Влияет на внутренние отступы (padding) и расстояние между элементами (gap).',
    },
  },
  args: {
    size: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// === БАЗОВЫЕ ВАРИАНТЫ ===

export const Default: Story = {
  render: (args) => (
    <Card className="w-[350px]" {...args}>
      <CardHeader>
        <CardTitle>Создание накладной</CardTitle>
        <CardDescription>Заполните данные для отгрузки товара на склад.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">SKU:</span>
            <span className="font-medium">WB-994-KL</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Склад:</span>
            <span className="font-medium">Коледино</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline">Отмена</Button>
        <Button>Сохранить</Button>
      </CardFooter>
    </Card>
  ),
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
  render: (args) => (
    <Card className="w-[350px]" {...args}>
      <CardHeader>
        <CardTitle>Юнит-экономика</CardTitle>
        <CardDescription>Сводка за текущий месяц.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">₽ 142,500</div>
        <p className="text-xs text-muted-foreground">+20.1% по сравнению с прошлым месяцем</p>
      </CardContent>
    </Card>
  ),
};

// === СТРУКТУРНЫЕ ВАРИАЦИИ ===

export const WithAction: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Использование компонента `CardAction` внутри `CardHeader` автоматически перестраивает заголовок в grid-сетку с колонкой `auto` для экшена (селектор `has-data-[slot=card-action]`).',
      },
    },
  },
  render: (args) => (
    <Card className="w-[350px]" {...args}>
      <CardHeader>
        <CardTitle>Финансовый отчет</CardTitle>
        <CardDescription>P&L за Q3 2026</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon">
            <MoreVertical />
            <span className="sr-only">Меню действий</span>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
          <TrendingUp className="size-4" />
          <span>Маржинальность выросла на 4%</span>
        </div>
      </CardContent>
    </Card>
  ),
};

export const WithTopImage: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Если первым потомком `Card` является тег `img`, селекторы `has-[>img:first-child]:pt-0` и `*:[img:first-child]:rounded-t-xl` автоматически убирают верхний padding и скругляют углы изображения по радиусу карточки.',
      },
    },
  },
  render: (args) => (
    <Card className="w-[300px]" {...args}>
      <img
        src="https://images.unsplash.com/photo-1580196969807-cc6de06c05be?w=800&q=80"
        alt="Product preview"
        className="aspect-video object-cover"
      />
      <CardHeader>
        <CardTitle>Микрофибровая насадка</CardTitle>
        <CardDescription>Артикул: MF-001</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">Комплект из 3 штук. Идеально подходит для влажной уборки.</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">В корзину</Button>
      </CardFooter>
    </Card>
  ),
};

export const ContentOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Карточка без заголовка и футера. Демонстрирует базовое поведение контейнера.',
      },
    },
  },
  render: (args) => (
    <Card className="w-[350px]" {...args}>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Остаток на складе</span>
          <span className="text-muted-foreground">1,240 шт.</span>
        </div>
      </CardContent>
    </Card>
  ),
};
