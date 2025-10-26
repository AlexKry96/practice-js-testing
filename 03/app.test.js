import randomNumber from './app';

test('zwraca 1, jeśli zakres to od 1 do 1', () => {
  expect(randomNumber(1, 1)).toBe(1);
});

test('zwracana liczba mieści się w przedziale', () => {
    const result = randomNumber(1, 10);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
});