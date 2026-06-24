import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { AspectRatio } from '@mrv-erp/ui';

const meta: Meta<typeof AspectRatio> = {
  title: 'UI/Layout/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  argTypes: {
    ratio: {
      control: 'number',
      description: 'Соотношение сторон (ширина / высота). Например: 16/9, 4/3, 1.',
    },
    asChild: {
      table: { disable: true },
    },
  },
  args: {
    ratio: 16 / 9,
  },
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

// === БАЗОВЫЕ ВАРИАНТЫ ===

export const Video16x9: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Стандартное соотношение 16:9, используемое для видео и широких изображений.',
      },
    },
  },
  args: {
    ratio: 16 / 9,
  },
  render: (args) => (
    <div className="w-[500px] max-w-full overflow-hidden rounded-md border">
      <AspectRatio {...args}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          className="size-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

export const StandardPhoto4x3: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Соотношение 4:3 для классических фотографий.',
      },
    },
  },
  args: {
    ratio: 4 / 3,
  },
  render: (args) => (
    <div className="w-[400px] max-w-full overflow-hidden rounded-md border">
      <AspectRatio {...args}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          className="size-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

export const Square1x1: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Соотношение 1:1, часто применяется для аватаров и карточек товаров.',
      },
    },
  },
  args: {
    ratio: 1,
  },
  render: (args) => (
    <div className="w-[300px] max-w-full overflow-hidden rounded-md border">
      <AspectRatio {...args}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          className="size-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

export const Cinematic21x9: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Соотношение 21:9 для сверхшироких (ультравайд) изображений и баннеров.',
      },
    },
  },
  args: {
    ratio: 21 / 9,
  },
  render: (args) => (
    <div className="w-[600px] max-w-full overflow-hidden rounded-md border">
      <AspectRatio {...args}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          className="size-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

// === ПРИМЕНЕНИЕ ДЛЯ СТАТИЧНОГО КОНТЕНТА ===

export const MapEmbed: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Компонент можно использовать не только для изображений, но и для iframe (карты, видеоплееры), контейнеров со сплошной заливкой или скелетонов.',
      },
    },
  },
  args: {
    ratio: 16 / 9,
  },
  render: (args) => (
    <div className="w-[500px] max-w-full overflow-hidden rounded-md border">
      <AspectRatio {...args}>
        <div className="flex size-full items-center justify-center bg-muted">
          <span className="text-sm text-muted-foreground">Интерактивная карта (iframe)</span>
        </div>
      </AspectRatio>
    </div>
  ),
};
