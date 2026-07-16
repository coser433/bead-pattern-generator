import { Pattern } from '../types'
import { Heart, Download } from 'lucide-react'

interface PatternCardProps {
  pattern: Pattern
  onView?: () => void
}

export function PatternCard({ pattern, onView }: PatternCardProps) {
  const totalBeads = pattern.color_map
    ? Object.values(pattern.color_map).reduce((sum, color) => sum + color['count'] || 0, 0)
    : 0

  const isSvg = pattern.image_url?.startsWith('<svg')

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group" onClick={onView}>
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {pattern.image_url ? (
          isSvg ? (
            <div 
              className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
              dangerouslySetInnerHTML={{ __html: pattern.image_url }}
            />
          ) : (
            <img 
              src={pattern.image_url} 
              alt={pattern.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl">🧩</span>
          </div>
        )}
        <div className="absolute top-3 right-3 flex space-x-2">
          <button className="p-2 bg-white/90 rounded-full shadow-md hover:bg-white hover:scale-110 transition-all">
            <Heart size={16} className="text-red-400" />
          </button>
          <button className="p-2 bg-white/90 rounded-full shadow-md hover:bg-white hover:scale-110 transition-all">
            <Download size={16} className="text-blue-400" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-800 truncate mb-1">{pattern.title}</h3>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{pattern.grid_size}x{pattern.grid_size}</span>
          <span>{Object.keys(pattern.color_map || {}).length}种颜色</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {pattern.keywords?.slice(0, 3).map((keyword, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-pink-50 text-pink-500 text-xs rounded-full"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}