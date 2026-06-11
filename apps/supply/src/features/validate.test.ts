import { validate } from './validate';

// 2. Оборачиваем все тесты для функции в describe
describe('validatePassword', () => {
  // 3. Пишем позитивные сценарии (Happy Path)
  it('должна возвращать true для валидного пароля (8+ символов и цифра)', () => {
    // Act & Assert (Для простых функций Arrange часто опускается)
    expect(validate(-100)).toBe(false);
  });

  // 4. Пишем негативные сценарии (Edge Cases / Граничные условия)
  it('должна возвращать false, если пароль короче 8 символов', () => {
    expect(validate(200)).toBe(false);
  });

  it('должна возвращать false, если в пароле нет цифр', () => {
    expect(validate(0)).toBe(true);
  });

  it('должна возвращать false для пустой строки', () => {
    expect(validate(50)).toBe(false);
  });
});
