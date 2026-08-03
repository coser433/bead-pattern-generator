import { useState, useEffect } from 'react'
import { Search, Trash2, FolderOpen, Image as ImageIcon, X } from 'lucide-react'
import { Pattern } from '../types'
import { PatternCard } from '../components/PatternCard'
import { PatternViewer } from '../components/PatternViewer'

export function SavedPage() {
  const [patterns, setPatterns] = useState<Pattern[]>([])
  const [searchKeyword, setSearchKeyword] = useState('')
  const [filteredPatterns, setFilteredPatterns] = useState<Pattern[]>([])
  const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(null)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('patterns') || '[]')
    setPatterns(saved)
    setFilteredPatterns(saved)
  }, [])

  useEffect(() => {
    if (!searchKeyword.trim()) {
      setFilteredPatterns(patterns)
    } else {
      const keyword = searchKeyword.toLowerCase()
      setFilteredPatterns(
        patterns.filter(
          (p) =>
            p.title.toLowerCase().includes(keyword) ||
            p.keywords.some((k) => k.toLowerCase().includes(keyword))
        )
      )
    }
  }, [searchKeyword, patterns])

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这个图案吗？')) {
      const updated = patterns.filter((p) => p.id !== id)
      setPatterns(updated)
      setFilteredPatterns(updated)
      localStorage.setItem('patterns', JSON.stringify(updated))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">我的收藏</h1>
            <p className="text-gray-600">查看和管理保存的拼豆图纸</p>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <FolderOpen size={20} />
            <span>{patterns.length} 个图案</span>
          </div>
        </div>

        <div className="max-w-xl mb-8">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索图案名称或关键词..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
        </div>

        {filteredPatterns.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ImageIcon size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {searchKeyword ? '没有找到匹配的图案' : '还没有收藏任何图案'}
            </h3>
            <p className="text-gray-500">
              {searchKeyword ? '尝试使用其他关键词搜索' : '去生成你的第一张拼豆图纸吧'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPatterns.map((pattern) => (
              <div key={pattern.id}>
                <PatternCard 
                  pattern={pattern} 
                  onView={() => setSelectedPattern(pattern)} 
                />
                <button
                  onClick={() => handleDelete(pattern.id)}
                  className="mt-2 w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={16} />
                  <span>删除</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedPattern && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedPattern(null)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">{selectedPattern.title}</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedPattern.keywords?.slice(0, 5).map((keyword, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-pink-100 text-pink-600 text-xs rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              <button onClick={() => setSelectedPattern(null)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={24} className="text-gray-500" />
              </button>
            </div>
            <div className="p-4 h-[calc(90vh-100px)]">
              {selectedPattern.grid_data?.length ? (
                <PatternViewer grid={selectedPattern.grid_data} />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  暂无图纸数据
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
