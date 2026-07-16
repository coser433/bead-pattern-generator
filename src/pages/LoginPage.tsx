import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ArrowLeft, User } from 'lucide-react'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      setTimeout(() => {
        localStorage.setItem('user', JSON.stringify({ id: '1', email, username: email.split('@')[0] }))
        navigate('/')
      }, 1000)
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-rose-400 to-purple-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🧩</span>
          </div>
          <h1 className="text-2xl font-bold">欢迎回来</h1>
          <p className="text-white/80">登录你的拼豆生图账户</p>
        </div>

        <div className="p-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 mb-6"
          >
            <ArrowLeft size={20} />
            <span>返回</span>
          </button>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">邮箱地址</label>
              <div className="relative">
                <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="请输入邮箱"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">密码</label>
              <div className="relative">
                <Lock size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="text-pink-500 rounded focus:ring-pink-500" />
                <span className="text-sm text-gray-600">记住我</span>
              </label>
              <Link to="/" className="text-sm text-pink-500 hover:text-pink-600">
                忘记密码？
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium hover:from-pink-600 hover:to-rose-600 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center space-x-2">
                  <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
                  <span>登录中...</span>
                </span>
              ) : (
                '登录'
              )}
            </button>
          </form>

          <div className="mt-6">
            <p className="text-center text-gray-600">
              还没有账户？{' '}
              <Link to="/register" className="text-pink-500 hover:text-pink-600 font-medium">
                立即注册
              </Link>
            </p>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">或使用以下方式登录</span>
              </div>
            </div>

            <div className="mt-4 flex space-x-4">
              <button className="flex-1 flex items-center justify-center space-x-2 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                <span className="text-xl">📱</span>
                <span className="text-gray-700">微信</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-2 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                <span className="text-xl">📧</span>
                <span className="text-gray-700">QQ</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}