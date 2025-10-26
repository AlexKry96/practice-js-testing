export default function randomNumber(min, max) {
    if (typeof min !== 'number' || typeof max !== 'number') {
        throw new Error('Argumenty muszą być liczbami');
    }

    if (min > max) {
        throw new Error('Niepoprawny zakres: min nie może być większe od max');
    }

    if (min === max) {
        return min;
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}