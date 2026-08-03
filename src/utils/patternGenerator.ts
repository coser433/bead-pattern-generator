import { PerlerColor } from '../types'
import { perlerColors } from './perlerColors'

const getColor = (id: string): PerlerColor => {
  return perlerColors.find(c => c.id === id) || perlerColors[0]
}

export const createGrid = (rows: number, cols: number, defaultValue: string): PerlerColor[][] => {
  return Array(rows).fill(null).map(() =>
    Array(cols).fill(null).map(() => getColor(defaultValue))
  )
}

export const fillRect = (grid: PerlerColor[][], r1: number, c1: number, r2: number, c2: number, color: string) => {
  for (let r = r1; r <= r2; r++) {
    for (let c = c1; c <= c2; c++) {
      if (r >= 0 && r < grid.length && c >= 0 && c < grid[0].length) {
        grid[r][c] = getColor(color)
      }
    }
  }
}

export const setPixel = (grid: PerlerColor[][], r: number, c: number, color: string) => {
  if (r >= 0 && r < grid.length && c >= 0 && c < grid[0].length) {
    grid[r][c] = getColor(color)
  }
}

export const fillCircle = (grid: PerlerColor[][], cx: number, cy: number, radius: number, color: string) => {
  for (let r = cy - radius; r <= cy + radius; r++) {
    for (let c = cx - radius; c <= cx + radius; c++) {
      const dist = Math.sqrt((c - cx) ** 2 + (r - cy) ** 2)
      if (dist <= radius && r >= 0 && r < grid.length && c >= 0 && c < grid[0].length) {
        grid[r][c] = getColor(color)
      }
    }
  }
}

export const fillEllipse = (grid: PerlerColor[][], cx: number, cy: number, rx: number, ry: number, color: string) => {
  for (let r = cy - ry; r <= cy + ry; r++) {
    for (let c = cx - rx; c <= cx + rx; c++) {
      const dist = ((c - cx) ** 2) / (rx ** 2) + ((r - cy) ** 2) / (ry ** 2)
      if (dist <= 1 && r >= 0 && r < grid.length && c >= 0 && c < grid[0].length) {
        grid[r][c] = getColor(color)
      }
    }
  }
}

export const fillPolygon = (grid: PerlerColor[][], points: { x: number; y: number }[], color: string) => {
  if (points.length < 3) return
  
  const minX = Math.min(...points.map(p => p.x))
  const maxX = Math.max(...points.map(p => p.x))
  const minY = Math.min(...points.map(p => p.y))
  const maxY = Math.max(...points.map(p => p.y))
  
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      if (isPointInPolygon(x, y, points) && y >= 0 && y < grid.length && x >= 0 && x < grid[0].length) {
        grid[y][x] = getColor(color)
      }
    }
  }
}

const isPointInPolygon = (x: number, y: number, points: { x: number; y: number }[]): boolean => {
  let inside = false
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const xi = points[i].x, yi = points[i].y
    const xj = points[j].x, yj = points[j].y
    
    if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
      inside = !inside
    }
  }
  return inside
}

export const drawLine = (grid: PerlerColor[][], x1: number, y1: number, x2: number, y2: number, color: string) => {
  const dx = Math.abs(x2 - x1)
  const dy = Math.abs(y2 - y1)
  const sx = x1 < x2 ? 1 : -1
  const sy = y1 < y2 ? 1 : -1
  let err = dx - dy
  
  while (true) {
    if (y1 >= 0 && y1 < grid.length && x1 >= 0 && x1 < grid[0].length) {
      grid[y1][x1] = getColor(color)
    }
    
    if (x1 === x2 && y1 === y2) break
    
    const e2 = 2 * err
    if (e2 > -dy) {
      err -= dy
      x1 += sx
    }
    if (e2 < dx) {
      err += dx
      y1 += sy
    }
  }
}

export const drawSpiderWeb = (grid: PerlerColor[][], cx: number, cy: number, radius: number, color: string) => {
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3
    const x2 = cx + Math.cos(angle) * radius
    const y2 = cy + Math.sin(angle) * radius
    drawLine(grid, cx, cy, Math.round(x2), Math.round(y2), color)
  }
  
  for (let r = radius / 3; r <= radius; r += radius / 3) {
    fillCircle(grid, cx, cy, r, color)
  }
}

export const drawStar = (grid: PerlerColor[][], cx: number, cy: number, radius: number, color: string) => {
  const points: { x: number; y: number }[] = []
  for (let i = 0; i < 5; i++) {
    const angle1 = (i * 4 * Math.PI) / 5 - Math.PI / 2
    const angle2 = angle1 + Math.PI / 5
    points.push({ x: cx + Math.cos(angle1) * radius, y: cy + Math.sin(angle1) * radius })
    points.push({ x: cx + Math.cos(angle2) * radius / 2, y: cy + Math.sin(angle2) * radius / 2 })
  }
  fillPolygon(grid, points, color)
}

export const generateSpidermanPattern = (): PerlerColor[][] => {
  const grid = createGrid(64, 64, 'H2')
  
  fillRect(grid, 0, 0, 63, 63, 'H2')
  
  fillRect(grid, 8, 8, 32, 55, 'F5')
  fillRect(grid, 33, 8, 55, 55, 'F5')
  
  fillRect(grid, 15, 15, 19, 25, 'H2')
  fillRect(grid, 15, 38, 19, 48, 'H2')
  
  fillRect(grid, 16, 17, 18, 23, 'H7')
  fillRect(grid, 16, 40, 18, 46, 'H7')
  
  fillRect(grid, 17, 18, 18, 22, 'H2')
  fillRect(grid, 17, 41, 18, 45, 'H2')
  
  fillRect(grid, 17, 19, 18, 21, 'H7')
  fillRect(grid, 17, 42, 18, 44, 'H7')
  
  fillRect(grid, 24, 28, 28, 35, 'H7')
  
  fillRect(grid, 23, 26, 29, 37, 'F5')
  
  fillRect(grid, 25, 30, 27, 33, 'H7')
  
  fillRect(grid, 26, 29, 26, 29, 'H7')
  fillRect(grid, 28, 29, 28, 29, 'H7')
  fillRect(grid, 26, 34, 26, 34, 'H7')
  fillRect(grid, 28, 34, 28, 34, 'H7')
  
  fillRect(grid, 36, 15, 40, 25, 'H2')
  fillRect(grid, 36, 38, 40, 48, 'H2')
  
  fillRect(grid, 37, 17, 39, 23, 'H7')
  fillRect(grid, 37, 40, 39, 46, 'H7')
  
  fillRect(grid, 38, 18, 39, 22, 'H2')
  fillRect(grid, 38, 41, 39, 45, 'H2')
  
  fillRect(grid, 38, 19, 39, 21, 'H7')
  fillRect(grid, 38, 42, 39, 44, 'H7')
  
  fillRect(grid, 42, 28, 46, 35, 'H7')
  
  fillRect(grid, 41, 26, 47, 37, 'F5')
  
  fillRect(grid, 43, 30, 45, 33, 'H7')
  
  fillRect(grid, 44, 29, 44, 29, 'H7')
  fillRect(grid, 46, 29, 46, 29, 'H7')
  fillRect(grid, 44, 34, 44, 34, 'H7')
  fillRect(grid, 46, 34, 46, 34, 'H7')
  
  fillRect(grid, 26, 24, 27, 25, 'H7')
  fillRect(grid, 26, 38, 27, 39, 'H7')
  fillRect(grid, 29, 24, 30, 25, 'H7')
  fillRect(grid, 29, 38, 30, 39, 'H7')
  
  fillRect(grid, 22, 31, 23, 32, 'H7')
  fillRect(grid, 30, 31, 31, 32, 'H7')
  
  fillRect(grid, 23, 29, 24, 30, 'H7')
  fillRect(grid, 29, 29, 30, 30, 'H7')
  fillRect(grid, 23, 33, 24, 34, 'H7')
  fillRect(grid, 29, 33, 30, 34, 'H7')
  
  fillRect(grid, 5, 8, 7, 10, 'F5')
  fillRect(grid, 56, 8, 58, 10, 'F5')
  fillRect(grid, 5, 53, 7, 55, 'F5')
  fillRect(grid, 56, 53, 58, 55, 'F5')
  
  fillRect(grid, 30, 3, 33, 5, 'F5')
  fillRect(grid, 30, 58, 33, 60, 'F5')
  
  return grid
}

export const generateHelloKittyBearPattern = (): PerlerColor[][] => {
  const grid = createGrid(64, 64, 'B3')
  
  fillRect(grid, 0, 0, 63, 63, 'B3')
  
  fillRect(grid, 10, 10, 18, 20, 'E11')
  fillRect(grid, 10, 43, 18, 53, 'E11')
  
  fillRect(grid, 19, 5, 42, 58, 'E11')
  
  fillRect(grid, 24, 14, 27, 17, 'H7')
  fillRect(grid, 24, 46, 27, 49, 'H7')
  
  fillRect(grid, 25, 16, 26, 16, 'H2')
  fillRect(grid, 25, 47, 26, 47, 'H2')
  
  fillRect(grid, 30, 30, 33, 34, 'A5')
  
  fillRect(grid, 31, 32, 32, 33, 'H7')
  
  fillRect(grid, 22, 3, 22, 8, 'H7')
  fillRect(grid, 23, 2, 23, 7, 'H7')
  fillRect(grid, 24, 3, 24, 8, 'H7')
  fillRect(grid, 22, 55, 22, 60, 'H7')
  fillRect(grid, 23, 56, 23, 61, 'H7')
  fillRect(grid, 24, 55, 24, 60, 'H7')
  
  fillRect(grid, 23, 4, 23, 5, 'F1')
  fillRect(grid, 24, 3, 24, 4, 'F1')
  fillRect(grid, 23, 58, 23, 59, 'F1')
  fillRect(grid, 24, 59, 24, 60, 'F1')
  
  fillRect(grid, 6, 14, 9, 22, 'F5')
  fillRect(grid, 6, 41, 9, 49, 'F5')
  
  fillRect(grid, 8, 22, 8, 41, 'H7')
  
  fillRect(grid, 36, 14, 44, 26, 'G7')
  fillRect(grid, 42, 11, 48, 17, 'G7')
  
  fillRect(grid, 38, 16, 42, 24, 'E11')
  
  fillRect(grid, 39, 18, 41, 22, 'H7')
  
  fillRect(grid, 39, 20, 40, 21, 'H2')
  
  fillRect(grid, 37, 24, 43, 28, 'E11')
  
  fillRect(grid, 44, 18, 48, 24, 'E11')
  
  fillRect(grid, 34, 20, 35, 24, 'H7')
  
  fillRect(grid, 45, 9, 47, 11, 'E11')
  fillRect(grid, 46, 8, 48, 10, 'E11')
  
  fillRect(grid, 46, 28, 54, 46, 'E6')
  
  fillRect(grid, 48, 30, 52, 44, 'E11')
  
  fillRect(grid, 50, 34, 51, 35, 'H7')
  fillRect(grid, 50, 42, 51, 43, 'H7')
  
  fillRect(grid, 50, 38, 51, 39, 'A5')
  
  fillRect(grid, 48, 38, 52, 38, 'H7')
  
  return grid
}

export const generateDoraemonPattern = (): PerlerColor[][] => {
  const grid = createGrid(64, 64, 'C2')
  
  fillRect(grid, 0, 0, 63, 63, 'C2')
  
  fillRect(grid, 8, 8, 32, 55, 'C5')
  fillRect(grid, 33, 8, 55, 55, 'C5')
  
  fillRect(grid, 14, 12, 28, 51, 'H2')
  
  fillRect(grid, 17, 16, 24, 24, 'H7')
  fillRect(grid, 17, 39, 24, 47, 'H7')
  
  fillRect(grid, 18, 18, 23, 22, 'H2')
  fillRect(grid, 18, 41, 23, 45, 'H2')
  
  fillRect(grid, 19, 19, 22, 21, 'H7')
  fillRect(grid, 19, 42, 22, 44, 'H7')
  
  fillRect(grid, 26, 28, 29, 38, 'H7')
  
  fillRect(grid, 27, 26, 30, 40, 'F5')
  
  fillRect(grid, 28, 30, 29, 37, 'H7')
  
  fillRect(grid, 28, 28, 28, 28, 'H7')
  fillRect(grid, 30, 28, 30, 28, 'H7')
  fillRect(grid, 28, 39, 28, 39, 'H7')
  fillRect(grid, 30, 39, 30, 39, 'H7')
  
  fillRect(grid, 29, 26, 29, 27, 'F1')
  fillRect(grid, 29, 40, 29, 41, 'F1')
  
  fillRect(grid, 32, 28, 33, 28, 'F1')
  fillRect(grid, 32, 39, 33, 39, 'F1')
  
  fillRect(grid, 36, 24, 41, 43, 'H2')
  
  fillRect(grid, 38, 32, 39, 35, 'G5')
  
  fillRect(grid, 38, 30, 39, 37, 'H7')
  
  fillRect(grid, 35, 6, 35, 7, 'H2')
  fillRect(grid, 35, 56, 35, 57, 'H2')
  
  fillRect(grid, 28, 26, 28, 27, 'F1')
  fillRect(grid, 30, 26, 30, 27, 'F1')
  fillRect(grid, 28, 40, 28, 41, 'F1')
  fillRect(grid, 30, 40, 30, 41, 'F1')
  
  return grid
}

export const generatePikachuPattern = (): PerlerColor[][] => {
  const grid = createGrid(64, 64, 'H13')
  
  fillRect(grid, 0, 0, 63, 63, 'H13')
  
  fillRect(grid, 5, 14, 10, 25, 'A5')
  fillRect(grid, 5, 38, 10, 49, 'A5')
  
  fillRect(grid, 6, 16, 9, 23, 'F1')
  fillRect(grid, 6, 40, 9, 47, 'F1')
  
  fillRect(grid, 7, 17, 8, 22, 'H7')
  fillRect(grid, 7, 41, 8, 46, 'H7')
  
  fillRect(grid, 11, 8, 26, 55, 'A5')
  
  fillRect(grid, 16, 13, 21, 22, 'H7')
  fillRect(grid, 16, 41, 21, 50, 'H7')
  
  fillRect(grid, 17, 15, 20, 20, 'H2')
  fillRect(grid, 17, 43, 20, 48, 'H2')
  
  fillRect(grid, 18, 16, 19, 19, 'H7')
  fillRect(grid, 18, 44, 19, 47, 'H7')
  
  fillRect(grid, 15, 9, 20, 12, 'F1')
  fillRect(grid, 15, 51, 20, 54, 'F1')
  
  fillRect(grid, 23, 28, 26, 35, 'H7')
  
  fillRect(grid, 24, 26, 27, 37, 'A5')
  
  fillRect(grid, 25, 30, 26, 34, 'H7')
  
  fillRect(grid, 27, 10, 43, 53, 'A5')
  
  fillRect(grid, 32, 54, 46, 63, 'A5')
  
  fillRect(grid, 35, 57, 43, 60, 'H7')
  
  fillRect(grid, 28, 5, 36, 11, 'A5')
  fillRect(grid, 28, 52, 36, 58, 'A5')
  
  fillRect(grid, 30, 7, 34, 9, 'H7')
  fillRect(grid, 30, 54, 34, 56, 'H7')
  
  fillRect(grid, 44, 16, 50, 28, 'A5')
  fillRect(grid, 44, 35, 50, 47, 'A5')
  
  fillRect(grid, 45, 18, 49, 26, 'H7')
  fillRect(grid, 45, 37, 49, 45, 'H7')
  
  fillRect(grid, 25, 24, 26, 25, 'H7')
  fillRect(grid, 25, 38, 26, 39, 'H7')
  
  fillRect(grid, 28, 24, 29, 25, 'H7')
  fillRect(grid, 28, 38, 29, 39, 'H7')
  
  return grid
}

export const generateHelloKittyPinkPattern = (): PerlerColor[][] => {
  const grid = createGrid(64, 64, 'E2')
  
  fillRect(grid, 0, 0, 63, 63, 'E2')
  
  fillRect(grid, 8, 10, 18, 22, 'E11')
  fillRect(grid, 8, 41, 18, 53, 'E11')
  
  fillRect(grid, 19, 5, 38, 58, 'E11')
  
  fillRect(grid, 24, 14, 27, 17, 'H7')
  fillRect(grid, 24, 46, 27, 49, 'H7')
  
  fillRect(grid, 25, 16, 26, 16, 'H2')
  fillRect(grid, 25, 47, 26, 47, 'H2')
  
  fillRect(grid, 29, 30, 32, 34, 'A5')
  
  fillRect(grid, 30, 32, 31, 33, 'H7')
  
  fillRect(grid, 22, 3, 22, 8, 'H7')
  fillRect(grid, 23, 2, 23, 7, 'H7')
  fillRect(grid, 24, 3, 24, 8, 'H7')
  fillRect(grid, 22, 55, 22, 60, 'H7')
  fillRect(grid, 23, 56, 23, 61, 'H7')
  fillRect(grid, 24, 55, 24, 60, 'H7')
  
  fillRect(grid, 23, 4, 23, 5, 'F1')
  fillRect(grid, 24, 3, 24, 4, 'F1')
  fillRect(grid, 23, 58, 23, 59, 'F1')
  fillRect(grid, 24, 59, 24, 60, 'F1')
  
  fillRect(grid, 4, 14, 7, 24, 'F5')
  fillRect(grid, 4, 39, 7, 49, 'F5')
  
  fillRect(grid, 6, 24, 6, 39, 'H7')
  
  fillRect(grid, 39, 14, 53, 49, 'E6')
  
  fillRect(grid, 41, 16, 51, 47, 'E11')
  
  fillRect(grid, 43, 18, 46, 21, 'H7')
  fillRect(grid, 43, 42, 46, 45, 'H7')
  
  fillRect(grid, 44, 20, 45, 20, 'H2')
  fillRect(grid, 44, 43, 45, 43, 'H2')
  
  fillRect(grid, 44, 30, 47, 34, 'A5')
  
  fillRect(grid, 45, 32, 46, 33, 'H7')
  
  fillRect(grid, 52, 18, 55, 45, 'E11')
  
  fillRect(grid, 56, 20, 59, 43, 'E11')
  
  fillRect(grid, 28, 28, 29, 28, 'H7')
  fillRect(grid, 32, 28, 33, 28, 'H7')
  fillRect(grid, 28, 35, 29, 35, 'H7')
  fillRect(grid, 32, 35, 33, 35, 'H7')
  
  return grid
}