import { PerlerColor } from '../types'

interface GridPreviewProps {
  grid: PerlerColor[][]
  cellSize?: number
}

export function GridPreview({ grid, cellSize = 8 }: GridPreviewProps) {
  const rows = grid.length
  const cols = grid[0]?.length || 0

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 overflow-auto">
      <div
        className="inline-block bg-gray-100 rounded-lg p-2"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gap: '1px',
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((color, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="rounded-sm shadow-sm"
              style={{
                width: cellSize,
                height: cellSize,
                backgroundColor: color.hex,
              }}
              title={`${color.name} (${color.id})`}
            />
          ))
        )}
      </div>
    </div>
  )
}