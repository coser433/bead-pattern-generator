import { useState } from 'react'
import { Post, Comment } from '../types'
import { Heart, MessageCircle, Share2, User, Send, X, ThumbsUp } from 'lucide-react'

interface PostCardProps {
  post: Post
  onLike: (postId: string) => void
  onComment: (postId: string, content: string) => void
  onShare: (postId: string) => void
}

export function PostCard({ post, onLike, onComment, onShare }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [isLiked, setIsLiked] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [commentInputFocused, setCommentInputFocused] = useState(false)

  const handleLikeClick = () => {
    if (!isLiked) {
      onLike(post.id)
      setIsLiked(true)
    }
  }

  const handleSendComment = () => {
    if (newComment.trim()) {
      onComment(post.id, newComment.trim())
      setNewComment('')
    }
  }

  const handleShare = () => {
    onShare(post.id)
    setShowShareModal(true)
    setTimeout(() => {
      setShowShareModal(false)
    }, 2000)
  }

  const mockComments: Comment[] = [
    { id: '1', post_id: post.id, user_id: 'user1', content: '太好看了！', created_at: '2024-01-15T11:00:00' },
    { id: '2', post_id: post.id, user_id: 'user2', content: '用了多少颗豆子呀？', created_at: '2024-01-15T11:30:00' },
  ]

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="flex items-center space-x-3 p-4 border-b border-gray-100">
        <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
          <User size={20} className="text-white" />
        </div>
        <div>
          <div className="font-semibold text-gray-800">拼豆爱好者</div>
          <div className="text-xs text-gray-500">{new Date(post.created_at).toLocaleString()}</div>
        </div>
      </div>
      
      {post.content && (
        <div className="p-4 text-gray-700">
          {post.content}
        </div>
      )}
      
      {post.media_url && (
        <div className="relative">
          <img
            src={post.media_url.startsWith('<svg') ? `data:image/svg+xml;base64,${btoa(post.media_url)}` : post.media_url}
            alt="Post media"
            className="w-full max-h-96 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = `data:image/svg+xml;base64,${btoa(post.media_url)}`
            }}
          />
        </div>
      )}
      
      <div className="flex items-center justify-between p-4 border-t border-gray-100">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLikeClick}
            className={`flex items-center space-x-2 transition-all transform hover:scale-110 ${
              isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
            }`}
          >
            <Heart size={20} className={isLiked ? 'fill-current' : ''} />
            <span>{isLiked ? post.likes + 1 : post.likes}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className={`flex items-center space-x-2 transition-all transform hover:scale-110 ${
              showComments ? 'text-blue-500' : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            <MessageCircle size={20} />
            <span>{mockComments.length} 评论</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-all transform hover:scale-110"
          >
            <Share2 size={20} />
            <span>分享</span>
          </button>
        </div>
      </div>

      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 text-center animate-bounce-in">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Share2 size={32} className="text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">分享成功！</h3>
            <p className="text-gray-500">链接已复制到剪贴板</p>
          </div>
        </div>
      )}
      
      {showComments && (
        <div className="border-t border-gray-100">
          <div className="p-4 space-y-4">
            {mockComments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex-shrink-0 flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <div className="flex-1 bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm text-gray-800">用户{comment.user_id.slice(-2)}</span>
                    <span className="text-xs text-gray-400">{new Date(comment.created_at).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-gray-700 text-sm">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className={`flex items-center space-x-3 p-4 border-t border-gray-100 transition-all ${commentInputFocused ? 'bg-pink-50' : ''}`}>
            <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex-shrink-0 flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onFocus={() => setCommentInputFocused(true)}
              onBlur={() => setCommentInputFocused(false)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendComment()}
              placeholder="写下你的评论..."
              className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              onClick={handleSendComment}
              disabled={!newComment.trim()}
              className="p-2 text-pink-500 hover:text-pink-600 disabled:text-gray-300 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}