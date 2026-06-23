// Добавляет кастомные jest-матчеры для DOM (Testing Library)
import '@testing-library/jest-dom';

// 1. Мок для window.matchMedia (Критически важно для хуков адаптива и компонентов Radix UI)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Устаревший метод, но многие старые либы всё еще его ищут
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// 2. Мок для ResizeObserver (Критически важно для Tooltip, Popover, Dropdown, и графиков)
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// 3. Мок для PointerEvent (Критически важно для Radix UI при симуляции пользовательских кликов)
if (typeof window !== 'undefined' && !window.PointerEvent) {
  class PointerEvent extends MouseEvent {
    pointerId: number;
    constructor(type: string, params: PointerEventInit = {}) {
      super(type, params);
      this.pointerId = params.pointerId || 1;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).PointerEvent = PointerEvent;
}

// 4. Мок для scrollTo (JSDOM не умеет скроллить страницу, из-за чего падают тесты модалок)
window.scrollTo = jest.fn();
