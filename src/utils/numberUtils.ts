

/**
 * Converts a number to its ordinal form (1st, 2nd, 3rd, 4th, etc.)
 */
export function getOrdinalNumber(num: number): string {
    const suffixes = ['th', 'st', 'nd', 'rd']
    const value = num % 100
    const suffix = suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]
    return num + suffix
}
