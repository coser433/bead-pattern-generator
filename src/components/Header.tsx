import { Link, useLocation } from 'react-router-dom'
import { Home, Plus, FolderOpen, Search, Users, Menu, X, User } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { path: '/', icon: Home, label: '首页' },
    { path: '/create', icon: Plus, label: '生图' },
    { path: '/saved', icon: FolderOpen, label: '收藏' },
    { path: '/discover', icon: Search, label: '发现' },
    { path: '/community', icon: Users, label: '社区' },
  ]

  return (
    <header className="bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">🧩</span>
            </div>
            <span className="text-xl font-bold">拼豆生图</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white text-pink-500 rounded-full font-medium hover:bg-pink-50 transition-colors">
              <User size={18} />
              <span>登录</span>
            </button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/20"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'text-white/80 hover:bg-white/10'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              <button className="flex items-center space-x-3 px-4 py-3 mt-4 bg-white text-pink-500 rounded-lg font-medium">
                <User size={20} />
                <span>登录</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}