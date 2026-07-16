import { useState } from 'react'
import { Search, Sparkles, Clock, TrendingUp, Star } from 'lucide-react'
import { Pattern } from '../types'
import { PatternCard } from '../components/PatternCard'

const mockPatterns: Pattern[] = [
  { id: '1', user_id: '1', title: 'Hello Kitty', keywords: ['卡通', '可爱', '粉色'], color_map: {}, grid_data: [], grid_size: 30, image_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=hello%20kitty%20perler%20bead%20pattern%20cute%20pink&image_size=square', created_at: '2024-01-15' },
  { id: '2', user_id: '2', title: '皮卡丘', keywords: ['宠物小精灵', '动漫', '黄色'], color_map: {}, grid_data: [], grid_size: 40, image_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=pikachu%20perler%20bead%20pattern%20yellow%20cute&image_size=square', created_at: '2024-01-14' },
  { id: '3', user_id: '3', title: '哆啦A梦', keywords: ['卡通', '经典', '蓝色'], color_map: {}, grid_data: [], grid_size: 35, image_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=doraemon%20perler%20bead%20pattern%20blue%20cat&image_size=square', created_at: '2024-01-13' },
  { id: '4', user_id: '4', title: '美乐蒂', keywords: ['可爱', '兔子', '粉色'], color_map: {}, grid_data: [], grid_size: 28, image_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=my%20melody%20perler%20bead%20pattern%20pink%20rabbit&image_size=square', created_at: '2024-01-12' },
  { id: '5', user_id: '5', title: '星黛露', keywords: ['迪士尼', '兔子', '紫色'], color_map: {}, grid_data: [], grid_size: 45, image_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=stellalou%20perler%20bead%20pattern%20purple%20rabbit&image_size=square', created_at: '2024-01-11' },
  { id: '6', user_id: '6', title: '马里奥', keywords: ['游戏', '经典', '红色'], color_map: {}, grid_data: [], grid_size: 32, image_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=mario%20perler%20bead%20pattern%20game%20red&image_size=square', created_at: '2024-01-10' },
  { id: '7', user_id: '7', title: '小熊维尼', keywords: ['迪士尼', '可爱', '黄色'], color_map: {}, grid_data: [], grid_size: 30, image_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=winnie%20the%20pooh%20perler%20bead%20pattern%20yellow%20bear&image_size=square', created_at: '2024-01-09' },
  { id: '8', user_id: '8', title: '史迪奇', keywords: ['迪士尼', '外星', '蓝色'], color_map: {}, grid_data: [], grid_size: 42, image_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=stitch%20perler%20bead%20pattern%20blue%20alien&image_size=square', created_at: '2024-01-08' },
]

const categories = ['全部', '卡通', '动漫', '游戏', '迪士尼', '可爱', '动物', '节日']

export function DiscoverPage() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest')

  const filteredPatterns = mockPatterns.filter((pattern) => {
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
    return 0
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">发现灵感</h1>
            <p className="text-gray-600">浏览社区分享的精彩拼豆作品</p>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <Sparkles size={20} />
            <span>{mockPatterns.length} 个作品</span>
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
            <p className="text-gray-500">尝试使用其他关键词或分类搜索</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedPatterns.map((pattern) => (
              <PatternCard key={pattern.id} pattern={pattern} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}