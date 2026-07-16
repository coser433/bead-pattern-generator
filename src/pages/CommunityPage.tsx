import { useState } from 'react'
import { Plus, Image, Video, X, Send, User } from 'lucide-react'
import { Post } from '../types'
import { PostCard } from '../components/PostCard'

const mockPosts: Post[] = [
  {
    id: '1',
    user_id: '1',
    content: '今天完成了这个Hello Kitty拼豆作品，用了大概500颗豆子，花了3个小时！超级喜欢💕',
    media_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=hello%20kitty%20perler%20bead%20art%20finished%20product%20cute%20pink&image_size=square',
    media_type: 'image',
    likes: 128,
    created_at: '2024-01-15T10:30:00',
  },
  {
    id: '2',
    user_id: '2',
    content: '皮卡丘终于完成啦！黄色豆子用得最多，眼睛部分最难弄😅',
    media_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=pikachu%20perler%20bead%20art%20finished%20product%20yellow&image_size=square',
    media_type: 'image',
    likes: 96,
    created_at: '2024-01-15T09:15:00',
  },
  {
    id: '3',
    user_id: '3',
    content: '分享一下我的拼豆工作台，最近迷上了做迪士尼系列的拼豆图✨',
    media_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=perler%20bead%20workspace%20craft%20station%20colorful%20beads%20organized&image_size=square',
    media_type: 'image',
    likes: 75,
    created_at: '2024-01-14T18:45:00',
  },
  {
    id: '4',
    user_id: '4',
    content: '第一次尝试做这么大的图案，星黛露太美了！',
    media_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=stellalou%20perler%20bead%20art%20large%20purple%20rabbit%20disney&image_size=square',
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

  const handleComment = (postId: string, content: string) => {
    alert(`评论已发布: ${content}`)
  }

  const handleShare = (postId: string) => {
    const post = posts.find(p => p.id === postId)
    if (post) {
      navigator.clipboard.writeText(`看看这个拼豆作品: ${post.content}`)
    }
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
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-medium hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
              onLike={handleLike}
              onComment={handleComment}
              onShare={handleShare}
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
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
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
                      className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Image size={20} />
                      <span>图片</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Video size={20} />
                      <span>视频</span>
                    </button>
                  </div>
                  <button
                    onClick={handleCreatePost}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-medium hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg"
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