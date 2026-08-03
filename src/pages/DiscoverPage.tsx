import { useState, useEffect } from 'react'
import { Search, Sparkles, Clock, TrendingUp, Star, X, Trash2, Plus, Upload } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Pattern } from '../types'
import { PatternViewer } from '../components/PatternViewer'
import { GridPreview } from '../components/GridPreview'
import { getSortedColorUsage } from '../utils/colorMatcher'
import { presetPatterns } from '../data/presetPatterns'

const categories = ['全部', '卡通', '动漫', '游戏', '迪士尼', '可爱', '动物', '节日']

export function DiscoverPage() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest')
  const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(null)
  const [patterns, setPatterns] = useState<Pattern[]>([])

  useEffect(() => {
    const savedPatterns = JSON.parse(localStorage.getItem('discoverPatterns') || '[]')
    const allPatterns = [...presetPatterns, ...savedPatterns]
    const uniquePatterns = allPatterns.filter((pattern, index, self) =>
      index === self.findIndex((p) => p.id === pattern.id)
    )
    setPatterns(uniquePatterns)
  }, [])

  const handleDelete = (id: string) => {
    if (presetPatterns.some(p => p.id === id)) {
      alert('预设图纸无法删除！')
      return
    }
    
    if (confirm('确定要删除这个图案吗？')) {
      const savedPatterns = JSON.parse(localStorage.getItem('discoverPatterns') || '[]')
      const updatedPatterns = savedPatterns.filter((p: Pattern) => p.id !== id)
      localStorage.setItem('discoverPatterns', JSON.stringify(updatedPatterns))
      
      setPatterns(prev => prev.filter(p => p.id !== id))
    }
  }

  const handleSaveToDiscover = () => {
    if (!selectedPattern) return
    
    const savedPatterns = JSON.parse(localStorage.getItem('discoverPatterns') || '[]')
    if (savedPatterns.some((p: Pattern) => p.id === selectedPattern.id)) {
      alert('这个图案已经在发现页面了！')
      return
    }
    
    savedPatterns.push(selectedPattern)
    localStorage.setItem('discoverPatterns', JSON.stringify(savedPatterns))
    
    setPatterns(prev => [...prev, selectedPattern])
    alert('图案已添加到发现页面！')
  }

  const filteredPatterns = patterns.filter((pattern) => {
    const matchesKeyword =
      !searchKeyword ||
      pattern.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      pattern.keywords.some((k) => k.toLowerCase().includes(searchKeyword.toLowerCase()))
    
    const matchesCategory = selectedCategory === '全部' || pattern.keywords.includes(selectedCategory)
    
    return matchesKeyword && matchesCategory
  })

  const sortedPatterns = [...filteredPatterns].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    }
    return b.likes - a.likes
  })

  const handleViewPattern = (pattern: Pattern) => {
    setSelectedPattern(pattern)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">发现灵感</h1>
            <p className="text-gray-600">浏览社区分享的精彩拼豆作品</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-500">
              <Sparkles size={20} />
              <span>{patterns.length} 个作品</span>
            </div>
            <Link
              to="/create"
              className="flex items-center space-x-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors shadow-md"
            >
              <Plus size={18} />
              <span>添加新图纸</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="relative mb-6">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索图案名称或关键词..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">排序:</span>
              <button
                onClick={() => setSortBy('latest')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm transition-all ${
                  sortBy === 'latest'
                    ? 'bg-pink-100 text-pink-500'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Clock size={16} />
                <span>最新</span>
              </button>
              <button
                onClick={() => setSortBy('popular')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm transition-all ${
                  sortBy === 'popular'
                    ? 'bg-pink-100 text-pink-500'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <TrendingUp size={16} />
                <span>热门</span>
              </button>
            </div>
          </div>
        </div>

        {sortedPatterns.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">没有找到匹配的图案</h3>
            <p className="text-gray-500 mb-6">尝试使用其他关键词或分类搜索</p>
            <Link
              to="/create"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              <Upload size={20} />
              <span>创建新图纸</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedPatterns.map((pattern) => {
              const colorUsage = pattern.grid_data?.length ? getSortedColorUsage(pattern.grid_data) : []
              const totalColors = colorUsage.length
              const totalBeads = colorUsage.reduce((sum, c) => sum + c.count, 0)
              const isPreset = presetPatterns.some(p => p.id === pattern.id)
              
              return (
                <div
                  key={pattern.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div 
                    className="relative h-48 bg-gray-100 overflow-hidden cursor-pointer group"
                    onClick={() => handleViewPattern(pattern)}
                  >
                    {pattern.grid_data?.length ? (
                      <div className="w-full h-full flex items-center justify-center p-4">
                        <GridPreview grid={pattern.grid_data} cellSize={Math.max(4, Math.floor(160 / pattern.grid_size))} />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-4xl">🧩</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium text-gray-700">热门</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-full py-2 bg-white text-pink-500 font-medium rounded-lg hover:bg-pink-50 transition-colors">
                        查看图纸
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-gray-800 truncate">{pattern.title}</h3>
                      {!isPreset && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(pattern.id)
                          }}
                          className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                          title="删除"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{pattern.grid_size}x{pattern.grid_size}</span>
                      <span>{totalColors}种颜色</span>
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
                    <div className="text-xs text-gray-400 mt-2">
                      共 {totalBeads} 颗豆粒
                    </div>
                  </div>
                </div>
              )
            })}
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
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handleSaveToDiscover}
                  className="flex items-center space-x-2 px-3 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                >
                  <Plus size={16} />
                  <span>添加到发现</span>
                </button>
                <button onClick={() => setSelectedPattern(null)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <X size={24} className="text-gray-500" />
                </button>
              </div>
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
