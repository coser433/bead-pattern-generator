import { PerlerColor } from '../types'

interface ColorPaletteProps {
  colors: { color: PerlerColor; count: number }[]
}

export function ColorPalette({ colors }: ColorPaletteProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <h3 className="text-lg font-bold text-gray-800 mb-4">豆粒统计 ({colors.length}种颜色)</h3>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {colors.map(({ color, count }) => (
          <div
            key={color.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-8 h-8 rounded-full shadow-inner border-2 border-gray-200"
                style={{ backgroundColor: color.hex }}
              />
              <div>
                <div className="font-medium text-gray-800">{color.name}</div>
                <div className="text-sm text-gray-500">{color.id}</div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-pink-500">{count}</span>
              <span className="text-sm text-gray-500 ml-1">颗</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}