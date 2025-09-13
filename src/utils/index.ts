/**
 * Converts a number to its ordinal form (1st, 2nd, 3rd, 4th, etc.)
 */
export function getOrdinalNumber(num: number): string {
    const mod100 = num % 100
    if (mod100 >= 11 && mod100 <= 13) return `${num}th` // Handle 11th, 12th, 13th

    const mod10 = num % 10
    const suffix = mod10 === 1 ? 'st' : mod10 === 2 ? 'nd' : mod10 === 3 ? 'rd' : 'th'
    return `${num}${suffix}`
}

/**
 * Returns a hex color based on the condition percentage
 */
export function getConditionColor(condition: number): string {
    if (condition >= 80) return '#4CAF50'  // Green
    if (condition >= 60) return '#FF9800'  // Orange
    if (condition >= 40) return '#FFC107'  // Yellow
    return '#F44336'                        // Red
}
