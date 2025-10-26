import randomNumber from './app';

test('zwraca 1, jeśli zakres to od 1 do 1', () => {
  expect(randomNumber(1, 1)).toBe(1);
});

test('zwracana liczba mieści się w przedziale', () => {
    const result = randomNumber(1, 10);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
});


test('rzuca błąd, jeśli argumenty nie są liczbami', () => {
    expect(() => randomNumber('a', 5)).toThrow('Argumenty muszą być liczbami');
});

test('rzuca błąd, jeśli min > max', () => {
    expect(() => randomNumber(10, 5)).toThrow('Niepoprawny zakres');
});