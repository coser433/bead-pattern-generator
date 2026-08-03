import { PerlerColor, GridCell } from '../types'
import { findClosestColor } from './colorMatcher'

export async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

export function getImageData(img: HTMLImageElement): ImageData {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  canvas.width = img.width
  canvas.height = img.height
  ctx.drawImage(img, 0, 0)
  return ctx.getImageData(0, 0, img.width, img.height)
}

export async function resizeImage(img: HTMLImageElement, maxSize: number): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    
    let width = img.width
    let height = img.height
    
    if (width > height) {
      if (width > maxSize) {
        height = (height * maxSize) / width
        width = maxSize
      }
    } else {
      if (height > maxSize) {
        width = (width * maxSize) / height
        height = maxSize
      }
    }
    
    canvas.width = width
    canvas.height = height
    ctx.drawImage(img, 0, 0, width, height)
    
    const resizedImg = new Image()
    resizedImg.onload = () => resolve(resizedImg)
    resizedImg.src = canvas.toDataURL()
  })
}

export async function generateGrid(
  img: HTMLImageElement,
  gridSize: number
): Promise<{ grid: PerlerColor[][]; gridData: GridCell[][]; width: number; height: number }> {
  const resized = await resizeImage(img, gridSize)
  const imageData = getImageData(resized)
  const { width, height } = imageData
  
  const grid: PerlerColor[][] = []
  const gridData: GridCell[][] = []
  
  for (let y = 0; y < height; y++) {
    const row: PerlerColor[] = []
    const dataRow: GridCell[] = []
    
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4
      const r = imageData.data[index]
      const g = imageData.data[index + 1]
      const b = imageData.data[index + 2]
      
      const closestColor = findClosestColor(r, g, b)
      row.push(closestColor)
      dataRow.push({ color: closestColor, row: y, col: x })
    }
    
    grid.push(row)
    gridData.push(dataRow)
  }
  
  return { grid, gridData, width, height }
}

export function generatePatternImage(grid: PerlerColor[][], cellSize: number = 20): string {
  const rows = grid.length
  const cols = grid[0].length
  
  const canvas = document.createElement('canvas')
  canvas.width = cols * cellSize
  canvas.height = rows * cellSize
  
  const ctx = canvas.getContext('2d')!
  
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const color = grid[y][x]
      
      ctx.fillStyle = color.hex
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
      
      ctx.strokeStyle = '#cccccc'
      ctx.lineWidth = 0.5
      ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize)
      
      ctx.fillStyle = getContrastColor(color.hex)
      ctx.font = `${Math.max(6, cellSize * 0.4)}px Arial`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(color.id, x * cellSize + cellSize / 2, y * cellSize + cellSize / 2)
    }
  }
  
  return canvas.toDataURL('image/png')
}

function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 128 ? '#333333' : '#ffffff'
}

export function downloadPatternImage(grid: PerlerColor[][], filename: string) {
  const dataUrl = generatePatternImage(grid, 20)
  const link = document.createElement('a')
  link.download = `${filename}.png`
  link.href = dataUrl
  link.click()
}
