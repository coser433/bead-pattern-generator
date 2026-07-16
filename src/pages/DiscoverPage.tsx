import { useState } from 'react'
import { Search, Sparkles, Clock, TrendingUp, Star } from 'lucide-react'
import { Pattern } from '../types'
import { PatternCard } from '../components/PatternCard'

const pixelPatterns: Record<string, string> = {
  'hello-kitty': `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" fill="#FFE4E9"/><circle cx="5" cy="6" r="3" fill="#1a1a1a"/><circle cx="15" cy="6" r="3" fill="#1a1a1a"/><circle cx="5" cy="6" r="1" fill="#fff"/><circle cx="15" cy="6" r="1" fill="#fff"/><circle cx="10" cy="9" r="1" fill="#1a1a1a"/><rect x="8" y="11" width="4" height="2" rx="1" fill="#FF6B8A"/><circle cx="4" cy="3" r="2" fill="#FF1493"/><circle cx="16" cy="3" r="2" fill="#FF1493"/></svg>`,
  'pikachu': `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" fill="#FFD700"/><polygon points="3,4 5,10 1,10" fill="#FFD700"/><polygon points="17,4 15,10 19,10" fill="#FFD700"/><polygon points="3,5 5,9 2,9" fill="#FF6347"/><polygon points="17,5 15,9 18,9" fill="#FF6347"/><circle cx="7" cy="7" r="2" fill="#1a1a1a"/><circle cx="13" cy="7" r="2" fill="#1a1a1a"/><circle cx="7" cy="7" r="0.5" fill="#fff"/><circle cx="13" cy="7" r="0.5" fill="#fff"/><circle cx="10" cy="11" r="2" fill="#FF6347"/><rect x="8" y="13" width="4" height="1" fill="#1a1a1a"/></svg>`,
  'doraemon': `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" fill="#00BFFF"/><circle cx="10" cy="8" r="5" fill="#fff"/><circle cx="7" cy="7" r="1.5" fill="#1a1a1a"/><circle cx="13" cy="7" r="1.5" fill="#1a1a1a"/><circle cx="7" cy="7" r="0.5" fill="#fff"/><circle cx="13" cy="7" r="0.5" fill="#fff"/><circle cx="10" cy="9" r="1" fill="#FF6347"/><rect x="9" y="10" width="2" height="3" fill="#FF6347"/><rect x="6" y="15" width="8" height="3" fill="#FF6347"/><rect x="10" y="15" width="1" height="3" fill="#1a1a1a"/><rect x="8" y="3" width="4" height="1" fill="#FFD700"/></svg>`,
  'my-melody': `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" fill="#FFB6C1"/><polygon points="4,2 7,8 1,8" fill="#FFB6C1"/><polygon points="16,2 13,8 19,8" fill="#FFB6C1"/><polygon points="5,3 7,7 3,7" fill="#FF69B4"/><polygon points="15,3 13,7 17,7" fill="#FF69B4"/><circle cx="7" cy="8" r="1.5" fill="#1a1a1a"/><circle cx="13" cy="8" r="1.5" fill="#1a1a1a"/><circle cx="10" cy="11" r="1" fill="#FF6347"/><path d="M 8 13 Q 10 15 12 13" stroke="#1a1a1a" stroke-width="0.5" fill="none"/><circle cx="4" cy="11" r="1" fill="#FF69B4" opacity="0.5"/><circle cx="16" cy="11" r="1" fill="#FF69B4" opacity="0.5"/></svg>`,
  'stellalou': `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" fill="#9370DB"/><polygon points="4,3 7,9 1,9" fill="#9370DB"/><polygon points="16,3 13,9 19,9" fill="#9370DB"/><polygon points="5,4 7,8 3,8" fill="#DDA0DD"/><polygon points="15,4 13,8 17,8" fill="#DDA0DD"/><circle cx="7" cy="9" r="1.5" fill="#1a1a1a"/><circle cx="13" cy="9" r="1.5" fill="#1a1a1a"/><circle cx="7" cy="9" r="0.5" fill="#fff"/><circle cx="13" cy="9" r="0.5" fill="#fff"/><circle cx="10" cy="12" r="1" fill="#FF6347"/><path d="M 8 14 Q 10 16 12 14" stroke="#1a1a1a" stroke-width="0.5" fill="none"/><rect x="6" y="16" width="8" height="2" fill="#FFD700"/></svg>`,
  'mario': `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" fill="#87CEEB"/><rect x="5" y="4" width="10" height="4" fill="#FF0000"/><circle cx="10" cy="8" r="3" fill="#FFD700"/><circle cx="7" cy="7" r="0.5" fill="#1a1a1a"/><circle cx="13" cy="7" r="0.5" fill="#1a1a1a"/><circle cx="10" cy="9" r="0.5" fill="#FF6347"/><rect x="6" y="12" width="8" height="6" fill="#0000FF"/><rect x="6" y="16" width="3" height="2" fill="#FFD700"/><rect x="11" y="16" width="3" height="2" fill="#FFD700"/></svg>`,
  'winnie': `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" fill="#FFD700"/><circle cx="10" cy="10" r="6" fill="#FFD700"/><circle cx="7" cy="9" r="1" fill="#1a1a1a"/><circle cx="13" cy="9" r="1" fill="#1a1a1a"/><circle cx="10" cy="12" r="1" fill="#1a1a1a"/><path d="M 8 14 Q 10 16 12 14" stroke="#1a1a1a" stroke-width="0.5" fill="none"/><rect x="12" y="8" width="4" height="6" rx="2" fill="#8B4513"/><circle cx="15" cy="11" r="1" fill="#1a1a1a"/></svg>`,
  'stitch': `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" fill="#00BFFF"/><circle cx="10" cy="10" r="5" fill="#00BFFF"/><circle cx="5" cy="7" r="3" fill="#00BFFF"/><circle cx="15" cy="7" r="3" fill="#00BFFF"/><circle cx="7" cy="9" r="1.5" fill="#1a1a1a"/><circle cx="13" cy="9" r="1.5" fill="#1a1a1a"/><circle cx="7" cy="9" r="0.5" fill="#fff"/><circle cx="13" cy="9" r="0.5" fill="#fff"/><circle cx="10" cy="12" r="1" fill="#FF6347"/><path d="M 6 14 L 4 18 M 14 14 L 16 18" stroke="#00BFFF" stroke-width="1"/></svg>`,
}

const mockPatterns: Pattern[] = [
  { id: '1', user_id: '1', title: 'Hello Kitty', keywords: ['卡通', '可爱', '粉色'], color_map: {}, grid_data: [], grid_size: 30, image_url: pixelPatterns['hello-kitty'], created_at: '2024-01-15' },
  { id: '2', user_id: '2', title: '皮卡丘', keywords: ['宠物小精灵', '动漫', '黄色'], color_map: {}, grid_data: [], grid_size: 40, image_url: pixelPatterns['pikachu'], created_at: '2024-01-14' },
  { id: '3', user_id: '3', title: '哆啦A梦', keywords: ['卡通', '经典', '蓝色'], color_map: {}, grid_data: [], grid_size: 35, image_url: pixelPatterns['doraemon'], created_at: '2024-01-13' },
  { id: '4', user_id: '4', title: '美乐蒂', keywords: ['可爱', '兔子', '粉色'], color_map: {}, grid_data: [], grid_size: 28, image_url: pixelPatterns['my-melody'], created_at: '2024-01-12' },
  { id: '5', user_id: '5', title: '星黛露', keywords: ['迪士尼', '兔子', '紫色'], color_map: {}, grid_data: [], grid_size: 45, image_url: pixelPatterns['stellalou'], created_at: '2024-01-11' },
  { id: '6', user_id: '6', title: '马里奥', keywords: ['游戏', '经典', '红色'], color_map: {}, grid_data: [], grid_size: 32, image_url: pixelPatterns['mario'], created_at: '2024-01-10' },
  { id: '7', user_id: '7', title: '小熊维尼', keywords: ['迪士尼', '可爱', '黄色'], color_map: {}, grid_data: [], grid_size: 30, image_url: pixelPatterns['winnie'], created_at: '2024-01-09' },
  { id: '8', user_id: '8', title: '史迪奇', keywords: ['迪士尼', '外星', '蓝色'], color_map: {}, grid_data: [], grid_size: 42, image_url: pixelPatterns['stitch'], created_at: '2024-01-08' },
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