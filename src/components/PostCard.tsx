import { Post } from '../types'
import { Heart, MessageCircle, Share2, User } from 'lucide-react'

interface PostCardProps {
  post: Post
  onComment?: () => void
}

export function PostCard({ post, onComment }: PostCardProps) {
  const isSvg = post.media_url?.startsWith('<svg')

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="flex items-center space-x-3 p-4 border-b border-gray-100">
        <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
          <User size={20} className="text-white" />
        </div>
        <div>
          <div className="font-semibold text-gray-800">用户</div>
          <div className="text-xs text-gray-500">{new Date(post.created_at).toLocaleDateString()}</div>
        </div>
      </div>
      
      {post.content && (
        <div className="p-4 text-gray-700">
          {post.content}
        </div>
      )}
      
      {post.media_url && (
        <div className="relative">
          {isSvg ? (
            <div 
              className="w-full max-h-96 flex items-center justify-center bg-gray-100"
              dangerouslySetInnerHTML={{ __html: post.media_url }}
            />
          ) : (
            <img
              src={post.media_url}
              alt="Post media"
              className="w-full max-h-96 object-cover"
            />
          )}
        </div>
      )}
      
      <div className="flex items-center justify-between p-4 border-t border-gray-100">
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
            <Heart size={20} />
            <span>{post.likes}</span>
          </button>
          <button
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
            onClick={onComment}
          >
            <MessageCircle size={20} />
            <span>评论</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors">
            <Share2 size={20} />
            <span>分享</span>
          </button>
        </div>
      </div>
    </div>
  )
}