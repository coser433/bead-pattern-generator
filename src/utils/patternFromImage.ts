import { PerlerColor } from '../types'
import { perlerColors } from './perlerColors'

export function findClosestColor(r: number, g: number, b: number): PerlerColor {
  let closestColor = perlerColors[0]
  let minDistance = Infinity

  for (const color of perlerColors) {
    const distance = Math.sqrt(
      Math.pow(r - color.r, 2) +
      Math.pow(g - color.g, 2) +
      Math.pow(b - color.b, 2)
    )

    if (distance < minDistance) {
      minDistance = distance
      closestColor = color
    }
  }

  return closestColor
}

export async function generateGridFromImage(
  img: HTMLImageElement,
  gridSize: number
): Promise<PerlerColor[][]> {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  
  canvas.width = gridSize
  canvas.height = gridSize
  ctx.drawImage(img, 0, 0, gridSize, gridSize)
  
  const imageData = ctx.getImageData(0, 0, gridSize, gridSize)
  const { data } = imageData
  
  const grid: PerlerColor[][] = []
  
  for (let y = 0; y < gridSize; y++) {
    const row: PerlerColor[] = []
    for (let x = 0; x < gridSize; x++) {
      const index = (y * gridSize + x) * 4
      const r = data[index]
      const g = data[index + 1]
      const b = data[index + 2]
      const a = data[index + 3]
      
      if (a < 128) {
        row.push(perlerColors[0])
      } else {
        row.push(findClosestColor(r, g, b))
      }
    }
    grid.push(row)
  }
  
  return grid
}

export async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}