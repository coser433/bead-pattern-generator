import { useState } from 'react'
import { Plus, Image, Video, X, Send, User } from 'lucide-react'
import { Post } from '../types'
import { PostCard } from '../components/PostCard'

const pixelPatterns: Record<string, string> = {
  'hello-kitty': `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" fill="#FFE4E9"/><circle cx="5" cy="6" r="3" fill="#1a1a1a"/><circle cx="15" cy="6" r="3" fill="#1a1a1a"/><circle cx="5" cy="6" r="1" fill="#fff"/><circle cx="15" cy="6" r="1" fill="#fff"/><circle cx="10" cy="9" r="1" fill="#1a1a1a"/><rect x="8" y="11" width="4" height="2" rx="1" fill="#FF6B8A"/><circle cx="4" cy="3" r="2" fill="#FF1493"/><circle cx="16" cy="3" r="2" fill="#FF1493"/></svg>`,
  'pikachu': `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" fill="#FFD700"/><polygon points="3,4 5,10 1,10" fill="#FFD700"/><polygon points="17,4 15,10 19,10" fill="#FFD700"/><polygon points="3,5 5,9 2,9" fill="#FF6347"/><polygon points="17,5 15,9 18,9" fill="#FF6347"/><circle cx="7" cy="7" r="2" fill="#1a1a1a"/><circle cx="13" cy="7" r="2" fill="#1a1a1a"/><circle cx="7" cy="7" r="0.5" fill="#fff"/><circle cx="13" cy="7" r="0.5" fill="#fff"/><circle cx="10" cy="11" r="2" fill="#FF6347"/><rect x="8" y="13" width="4" height="1" fill="#1a1a1a"/></svg>`,
  'workspace': `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" fill="#F5F5DC"/><rect x="2" y="2" width="16" height="4" fill="#8B4513"/><rect x="2" y="8" width="6" height="6" fill="#FFD700"/><rect x="9" y="8" width="6" height="6" fill="#FF69B4"/><rect x="16" y="8" width="2" height="6" fill="#00BFFF"/><circle cx="4" cy="16" r="1.5" fill="#FF0000"/><circle cx="7" cy="16" r="1.5" fill="#00FF00"/><circle cx="10" cy="16" r="1.5" fill="#0000FF"/><circle cx="13" cy="16" r="1.5" fill="#FFD700"/><circle cx="16" cy="16" r="1.5" fill="#FF69B4"/></svg>`,
  'stellalou': `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" fill="#9370DB"/><polygon points="4,3 7,9 1,9" fill="#9370DB"/><polygon points="16,3 13,9 19,9" fill="#9370DB"/><polygon points="5,4 7,8 3,8" fill="#DDA0DD"/><polygon points="15,4 13,8 17,8" fill="#DDA0DD"/><circle cx="7" cy="9" r="1.5" fill="#1a1a1a"/><circle cx="13" cy="9" r="1.5" fill="#1a1a1a"/><circle cx="7" cy="9" r="0.5" fill="#fff"/><circle cx="13" cy="9" r="0.5" fill="#fff"/><circle cx="10" cy="12" r="1" fill="#FF6347"/><path d="M 8 14 Q 10 16 12 14" stroke="#1a1a1a" stroke-width="0.5" fill="none"/><rect x="6" y="16" width="8" height="2" fill="#FFD700"/></svg>`,
}

const mockPosts: Post[] = [
  {
    id: '1',
    user_id: '1',
    content: '今天完成了这个Hello Kitty拼豆作品，用了大概500颗豆子，花了3个小时！超级喜欢💕',
    media_url: pixelPatterns['hello-kitty'],
    media_type: 'image',
    likes: 128,
    created_at: '2024-01-15T10:30:00',
  },
  {
    id: '2',
    user_id: '2',
    content: '皮卡丘终于完成啦！黄色豆子用得最多，眼睛部分最难弄😅',
    media_url: pixelPatterns['pikachu'],
    media_type: 'image',
    likes: 96,
    created_at: '2024-01-15T09:15:00',
  },
  {
    id: '3',
    user_id: '3',
    content: '分享一下我的拼豆工作台，最近迷上了做迪士尼系列的拼豆图✨',
    media_url: pixelPatterns['workspace'],
    media_type: 'image',
    likes: 75,
    created_at: '2024-01-14T18:45:00',
  },
  {
    id: '4',
    user_id: '4',
    content: '第一次尝试做这么大的图案，星黛露太美了！',
    media_url: pixelPatterns['stellalou'],
    media_type: 'image',
    likes: 156,
    created_at: '2024-01-14T15:20:00',
  },
]

export function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [showModal, setShowModal] = useState(false)
  const [newPostContent, setNewPostContent] = useState('')
  const [selectedImage, setSelectedImage] = useState<string>('')

  const handleCreatePost = () => {
    if (!newPostContent.trim() && !selectedImage) {
      alert('请添加内容或图片')
      return
    }

    const newPost: Post = {
      id: Date.now().toString(),
      user_id: 'current-user',
      content: newPostContent,
      media_url: selectedImage,
      media_type: 'image',
      likes: 0,
      created_at: new Date().toISOString(),
    }

    setPosts([newPost, ...posts])
    setShowModal(false)
    setNewPostContent('')
    setSelectedImage('')
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">拼豆社区</h1>
            <p className="text-gray-600">分享作品，交流心得</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-medium hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg hover:shadow-xl"
          >
            <Plus size={20} />
            <span>发布作品</span>
          </button>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onComment={() => alert('评论功能开发中...')}
            />
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">发布作品</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="p-4">
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="分享你的拼豆作品和心得..."
                  className="w-full h-32 p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />

                <div className="mt-4">
                  <label className="flex items-center space-x-2 p-4 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-pink-300 hover:bg-pink-50 transition-all">
                    <Image size={24} className="text-gray-400" />
                    <span className="text-gray-600">添加图片</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {selectedImage && (
                  <div className="mt-4 relative">
                    <img
                      src={selectedImage}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-xl"
                    />
                    <button
                      onClick={() => setSelectedImage('')}
                      className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Image size={20} />
                      <span>图片</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Video size={20} />
                      <span>视频</span>
                    </button>
                  </div>
                  <button
                    onClick={handleCreatePost}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-medium hover:from-pink-600 hover:to-rose-600 transition-all"
                  >
                    <Send size={18} />
                    <span>发布</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}