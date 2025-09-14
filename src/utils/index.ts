//Converts a number to its ordinal form (1st, 2nd, 3rd, 4th, etc.)
export function getOrdinalNumber(num: number): string {
    const mod100 = num % 100
    if (mod100 >= 11 && mod100 <= 13) return `${num}th` // Handle 11th, 12th, 13th

    const mod10 = num % 10
    const suffix = mod10 === 1 ? 'st' : mod10 === 2 ? 'nd' : mod10 === 3 ? 'rd' : 'th'
    return `${num}${suffix}`
}

// Returns a hex color based on the condition percentage
export function getConditionColor(condition: number): string {
    if (condition >= 80) return '#4CAF50'  // Green
    if (condition >= 60) return '#FF9800'  // Orange
    if (condition >= 40) return '#FFC107'  // Yellow
    return '#F44336'                        // Red
}

// Get contrast color for text
export const getContrastColor = (backgroundColor: string) => {
    if (!/^#([0-9A-Fa-f]{6})$/.test(backgroundColor)) return '#000000'; // fallback
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    if (luminance > 0.95) return '#000000';
    if (luminance < 0.05) return '#FFFFFF';

    return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

// Map hex codes to human-readable color names
const HEX_TO_COLOR_NAME: Record<string, string> = {
    '#FF0000': 'Red',
    '#0000FF': 'Blue',
    '#FFFFFF': 'White',
    '#008000': 'Green',
    '#FFC0CB': 'Pink',
    '#800080': 'Purple',
    '#FFA500': 'Orange',
    '#000000': 'Black',
    '#FFFF00': 'Yellow',
    '#00FF00': 'Lime',
    '#C0C0C0': 'Silver',
    '#DC143C': 'Crimson',
    '#000080': 'Navy',
    '#FFD700': 'Gold',
    '#808080': 'Gray',
    '#FF00FF': 'Magenta',
    '#EE82EE': 'Violet',
    '#A52A2A': 'Brown',
    '#008080': 'Teal',
    '#00FFFF': 'Cyan',
}

// Returns a human-readable color name for a given hex code
export function getColorName(hex: string): string {
    return HEX_TO_COLOR_NAME[hex.toUpperCase()] || 'Unknown'
}

// Convert seconds to MM:SS
export const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const secs = (seconds % 60).toFixed(1)
    return `${minutes}:${secs.padStart(4, '0')}`
  }
  
// Convert MM:SS to seconds
export const parseTime = (timeStr: string): number => {
    const [minutes, seconds] = timeStr.split(':').map(Number)
    return minutes * 60 + seconds
  }

