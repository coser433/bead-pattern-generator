import { Link } from 'react-router-dom'
import { Upload, Sparkles, Heart, Users, ArrowRight, Star } from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: '智能生图',
    description: '上传图片自动生成拼豆图纸，智能颜色匹配',
    color: 'from-pink-400 to-rose-400',
  },
  {
    icon: Heart,
    title: '一键收藏',
    description: '自动保存生成的图纸，随时查看和编辑',
    color: 'from-purple-400 to-violet-400',
  },
  {
    icon: Users,
    title: '社区交流',
    description: '分享作品，发现灵感，结交同好',
    color: 'from-cyan-400 to-blue-400',
  },
]

const mockPatterns = [
  { id: '1', title: 'Hello Kitty', keywords: ['卡通', '可爱'], grid_size: 30, image_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=hello%20kitty%20perler%20bead%20pattern%20cute%20pink&image_size=square' },
  { id: '2', title: '皮卡丘', keywords: ['宠物小精灵', '动漫'], grid_size: 40, image_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=pikachu%20perler%20bead%20pattern%20yellow%20cute&image_size=square' },
  { id: '3', title: '哆啦A梦', keywords: ['卡通', '经典'], grid_size: 35, image_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=doraemon%20perler%20bead%20pattern%20blue%20cat&image_size=square' },
  { id: '4', title: '美乐蒂', keywords: ['可爱', '兔子'], grid_size: 28, image_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=my%20melody%20perler%20bead%20pattern%20pink%20rabbit&image_size=square' },
  { id: '5', title: '星黛露', keywords: ['迪士尼', '兔子'], grid_size: 45, image_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=stellalou%20perler%20bead%20pattern%20purple%20rabbit&image_size=square' },
]

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-rose-400 to-purple-400 opacity-90"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-yellow-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-cyan-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <span className="text-5xl">🧩</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              将任何照片转换为
              <span className="block text-yellow-200">拼豆图案</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              上传图片并立即转换为可打印的拼豆图纸，支持多种色号匹配，自动计算豆粒数量
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/create"
                className="flex items-center space-x-2 px-8 py-4 bg-white text-pink-500 rounded-full font-bold text-lg hover:bg-pink-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Upload size={24} />
                <span>开始制作</span>
              </Link>
              <Link
                to="/discover"
                className="flex items-center space-x-2 px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-full font-bold text-lg hover:bg-white/30 transition-all"
              >
                <span>浏览灵感</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">为什么选择我们</h2>
          <p className="text-gray-600">强大的功能，让拼豆创作更轻松</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <Icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="bg-gradient-to-r from-pink-50 to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">热门作品</h2>
              <p className="text-gray-600">看看大家都在做什么</p>
            </div>
            <Link
              to="/discover"
              className="flex items-center space-x-2 text-pink-500 font-medium hover:text-pink-600"
            >
              <span>查看更多</span>
              <ArrowRight size={20} />
            </Link>
          </div>
          
          <div className="flex overflow-x-auto gap-6 pb-4 -mx-4 px-4 scrollbar-hide">
            {mockPatterns.map((pattern) => (
              <div
                key={pattern.id}
                className="flex-shrink-0 w-64 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={pattern.image_url}
                    alt={pattern.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">热门</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-2">{pattern.title}</h3>
                  <div className="flex flex-wrap gap-1">
                    {pattern.keywords.map((keyword, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-pink-50 text-pink-500 text-xs rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    {pattern.grid_size}x{pattern.grid_size} 网格
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">准备好开始创作了吗？</h2>
          <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
            上传你的第一张图片，看看它会变成什么样的拼豆艺术品！
          </p>
          <Link
            to="/create"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-pink-500 rounded-full font-bold text-lg hover:bg-pink-50 transition-all shadow-lg"
          >
            <Upload size={24} />
            <span>立即开始</span>
          </Link>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-xl">🧩</span>
              </div>
              <span className="font-bold">拼豆生图</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 拼豆生图. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}