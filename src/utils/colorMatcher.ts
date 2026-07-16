import { PerlerColor } from '../types';
import { perlerColors } from './perlerColors';
export function rgbToHex(r: number, g: number, b: number): string {
 return '#' + [r, g, b].map(x => {
 const hex = Math.round(x).toString(16);
 return hex.length === 1 ? '0' + hex : hex;
 }).join('');
}
export function hexToRgb(hex: string): {
 r: number;
 g: number;
 b: number;
} {
 const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
 return result ? {
 r: parseInt(result[1], 16),
 g: parseInt(result[2], 16),
 b: parseInt(result[3], 16)
 } : { r: 0, g: 0, b: 0 };
}
export function calculateColorDistance(color1: PerlerColor, r: number, g: number, b: number): number {
 const rDiff = color1.r - r;
 const gDiff = color1.g - g;
 const bDiff = color1.b - b;
 return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
}
export function findClosestColor(r: number, g: number, b: number): PerlerColor {
 let closestColor = perlerColors[0];
 let minDistance = Infinity;
 for (const color of perlerColors) {
 const distance = calculateColorDistance(color, r, g, b);
 if (distance < minDistance) {
 minDistance = distance;
 closestColor = color;
 }
 }
 return closestColor;
}
export function getColorUsage(grid: PerlerColor[][]): Record<string, number> {
 const usage: Record<string, number> = {};
 for (const row of grid) {
 for (const color of row) {
 const key = color.id;
 usage[key] = (usage[key] || 0) + 1;
 }
 }
 return usage;
}
export function getSortedColorUsage(grid: PerlerColor[][]): {
 color: PerlerColor;
 count: number;
}[] {
 const usage = getColorUsage(grid);
 const result = Object.entries(usage)
 .map(([id, count]) => {
 const color = perlerColors.find(c => c.id === id);
 return { color: color || perlerColors[0], count };
 })
 .sort((a, b) => b.count - a.count);
 return result;
}