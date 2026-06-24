import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { AlertCircle, Info } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from '@mrv-erp/ui';

const meta: Meta<typeof AlertDialog> = {
  title: 'UI/Overlays/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Модальное окно, требующее внимания пользователя. Прерывает работу и блокирует взаимодействие с остальным приложением до принятия решения.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

// === БАЗОВЫЕ ВАРИАНТЫ ===

export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Показать диалог</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы абсолютно уверены?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие нельзя отменить. Оно навсегда удалит ваши данные и уберет их с наших
            серверов.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction>Продолжить</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const Destructive: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Удалить аккаунт</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить учетную запись?</AlertDialogTitle>
          <AlertDialogDescription>
            Ваш профиль, а также все связанные данные ERP-системы будут стерты без возможности
            восстановления.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          {/* Прокидываем variant="destructive" в Action, так как он наследует пропсы Button */}
          <AlertDialogAction variant="destructive">Удалить</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

// === СТРУКТУРНЫЕ ВАРИАЦИИ ===

export const SmallSize: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Использование `size="sm"` в `AlertDialogContent` меняет максимальную ширину окна и перестраивает футер в жесткую grid-сетку с двумя колонками.',
      },
    },
  },
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Компактный диалог</Button>
      </AlertDialogTrigger>

      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Выйти из системы?</AlertDialogTitle>
          <AlertDialogDescription>
            Вам придется ввести логин и пароль заново.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Остаться</AlertDialogCancel>
          <AlertDialogAction>Выйти</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const WithMedia: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Добавление компонента `AlertDialogMedia` внутрь `AlertDialogHeader` автоматически перестраивает сетку заголовка, вынося иконку сбоку (через селектор `has-data-[slot=alert-dialog-media]`).',
      },
    },
  },
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Диалог с иконкой</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive">
            <AlertCircle />
          </AlertDialogMedia>
          <AlertDialogTitle>Сбой синхронизации</AlertDialogTitle>
          <AlertDialogDescription>
            Не удалось отправить накладные в систему Честный ЗНАК. Проверьте настройки токена и
            попробуйте снова.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Закрыть</AlertDialogCancel>
          <AlertDialogAction>Повторить отправку</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const WithMediaSmall: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Комбинация компактного размера и медиа-блока.',
      },
    },
  },
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Обновление</Button>
      </AlertDialogTrigger>

      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-primary/10 text-primary">
            <Info />
          </AlertDialogMedia>
          <AlertDialogTitle>Доступна новая версия</AlertDialogTitle>
          <AlertDialogDescription>
            Установите обновление для стабильной работы.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Позже</AlertDialogCancel>
          <AlertDialogAction>Обновить</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};
