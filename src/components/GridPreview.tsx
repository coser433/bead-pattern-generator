import { PerlerColor } from '../types';

interface GridPreviewProps {
  grid: PerlerColor[][];
  cellSize?: number;
  showLabels?: boolean;
}

export function GridPreview({ grid, cellSize = 6, showLabels = false }: GridPreviewProps) {
  const rows = grid.length;
  const cols = grid[0]?.length || 0;
  
  const getContrastColor = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 140 ? '#222222' : '#ffffff';
  };
  
  const shouldShowLabel = showLabels || cellSize >= 14;
  const labelFontSize = Math.max(5, Math.floor(cellSize * 0.35));
  
  return (
    <div
      className="bg-gray-100 rounded-lg p-2"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gap: '0.5px',
      }}
    >
      {grid.map((row, rowIndex) =>
        row.map((color, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="relative rounded-sm"
            style={{
              width: cellSize,
              height: cellSize,
              backgroundColor: color.hex,
              border: '0.5px solid rgba(0,0,0,0.06)',
            }}
            title={`${color.name} (${color.id})`}
          >
            {shouldShowLabel && (
              <span
                className="absolute inset-0 flex items-center justify-center font-bold select-none pointer-events-none"
                style={{
                  fontSize: labelFontSize,
                  color: getContrastColor(color.hex),
                  lineHeight: '1',
                }}
              >
                {color.id}
              </span>
            )}
          </div>
        ))
      )}
    </div>
  );
}