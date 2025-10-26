import randomNumber from './app';

test('zwraca 1, jeśli zakres to od 1 do 1', () => {
  expect(randomNumber(1, 1)).toBe(1);
});