// lib/dates.ts
export const EXERCISE_TODAY = '2026-05-17';

function parseDate(value: string) {
    return new Date(`${value}T12:00:00`);
}

export function getExerciseToday() {
    return parseDate(EXERCISE_TODAY);
}

export function formatDate(value: string) {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
    }).format(parseDate(value));
}

export function formatFullDate(value: string) {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(parseDate(value));
}