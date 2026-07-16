import { create } from 'zustand'
import { User, Pattern, Post, Comment } from '../types'
import { supabase } from '../lib/supabase'

interface AppState {
  user: User | null
  isLoading: boolean
  patterns: Pattern[]
  posts: Post[]
  comments: Comment[]
  currentPattern: Pattern | null
  gridSize: number
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setGridSize: (size: number) => void
  setCurrentPattern: (pattern: Pattern | null) => void
  fetchPatterns: () => Promise<void>
  fetchPosts: () => Promise<void>
  fetchComments: (postId: string) => Promise<void>
  savePattern: (pattern: Omit<Pattern, 'id' | 'created_at'>) => Promise<Pattern | null>
  deletePattern: (id: string) => Promise<void>
  createPost: (post: Omit<Post, 'id' | 'created_at'>) => Promise<Post | null>
  searchPatterns: (keyword: string) => Promise<Pattern[]>
}

export const useStore = create<AppState>((set, get) => ({
  user: null,
  isLoading: false,
  patterns: [],
  posts: [],
  comments: [],
  currentPattern: null,
  gridSize: 30,

  setUser: (user) => set({ user }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setGridSize: (size) => set({ gridSize: size }),
  
  setCurrentPattern: (pattern) => set({ currentPattern: pattern }),

  fetchPatterns: async () => {
    set({ isLoading: true })
    try {
      if (!supabase) {
        const saved = JSON.parse(localStorage.getItem('patterns') || '[]')
        set({ patterns: saved })
        return
      }
      const { data, error } = await supabase.from('patterns').select('*').order('created_at', { ascending: false })
      if (error) throw error
      set({ patterns: data || [] })
    } catch (error) {
      console.error('Failed to fetch patterns:', error)
      const saved = JSON.parse(localStorage.getItem('patterns') || '[]')
      set({ patterns: saved })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchPosts: async () => {
    set({ isLoading: true })
    try {
      if (!supabase) {
        const saved = JSON.parse(localStorage.getItem('posts') || '[]')
        set({ posts: saved })
        return
      }
      const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false })
      if (error) throw error
      set({ posts: data || [] })
    } catch (error) {
      console.error('Failed to fetch posts:', error)
      const saved = JSON.parse(localStorage.getItem('posts') || '[]')
      set({ posts: saved })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchComments: async (postId) => {
    try {
      if (!supabase) {
        const saved = JSON.parse(localStorage.getItem(`comments_${postId}`) || '[]')
        set({ comments: saved })
        return
      }
      const { data, error } = await supabase.from('comments').select('*').eq('post_id', postId).order('created_at', { ascending: true })
      if (error) throw error
      set({ comments: data || [] })
    } catch (error) {
      console.error('Failed to fetch comments:', error)
      const saved = JSON.parse(localStorage.getItem(`comments_${postId}`) || '[]')
      set({ comments: saved })
    }
  },

  savePattern: async (pattern) => {
    set({ isLoading: true })
    try {
      if (!supabase) {
        const newPattern = {
          ...pattern,
          id: Date.now().toString(),
          created_at: new Date().toISOString()
        } as Pattern
        const saved = JSON.parse(localStorage.getItem('patterns') || '[]')
        saved.unshift(newPattern)
        localStorage.setItem('patterns', JSON.stringify(saved))
        set(state => ({ patterns: [newPattern, ...state.patterns] }))
        return newPattern
      }
      const { data, error } = await supabase.from('patterns').insert([pattern]).select()
      if (error) throw error
      const newPattern = data?.[0]
      if (newPattern) {
        set(state => ({ patterns: [newPattern, ...state.patterns] }))
      }
      return newPattern || null
    } catch (error) {
      console.error('Failed to save pattern:', error)
      return null
    } finally {
      set({ isLoading: false })
    }
  },

  deletePattern: async (id) => {
    try {
      if (!supabase) {
        const saved = JSON.parse(localStorage.getItem('patterns') || '[]')
        const filtered = saved.filter((p: Pattern) => p.id !== id)
        localStorage.setItem('patterns', JSON.stringify(filtered))
        set(state => ({ patterns: state.patterns.filter(p => p.id !== id) }))
        return
      }
      const { error } = await supabase.from('patterns').delete().eq('id', id)
      if (error) throw error
      set(state => ({ patterns: state.patterns.filter(p => p.id !== id) }))
    } catch (error) {
      console.error('Failed to delete pattern:', error)
    }
  },

  createPost: async (post) => {
    set({ isLoading: true })
    try {
      if (!supabase) {
        const newPost = {
          ...post,
          id: Date.now().toString(),
          created_at: new Date().toISOString()
        } as Post
        const saved = JSON.parse(localStorage.getItem('posts') || '[]')
        saved.unshift(newPost)
        localStorage.setItem('posts', JSON.stringify(saved))
        set(state => ({ posts: [newPost, ...state.posts] }))
        return newPost
      }
      const { data, error } = await supabase.from('posts').insert([post]).select()
      if (error) throw error
      const newPost = data?.[0]
      if (newPost) {
        set(state => ({ posts: [newPost, ...state.posts] }))
      }
      return newPost || null
    } catch (error) {
      console.error('Failed to create post:', error)
      return null
    } finally {
      set({ isLoading: false })
    }
  },

  searchPatterns: async (keyword) => {
    try {
      if (!supabase) {
        const saved = JSON.parse(localStorage.getItem('patterns') || '[]')
        return saved.filter((p: Pattern) => 
          p.title.toLowerCase().includes(keyword.toLowerCase()) ||
          p.keywords.some((k: string) => k.toLowerCase().includes(keyword.toLowerCase()))
        )
      }
      const { data, error } = await supabase.from('patterns').select('*')
        .ilike('title', `%${keyword}%`)
        .or(`keywords.ilike.%${keyword}%`)
        .order('created_at', { ascending: false })
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Failed to search patterns:', error)
      return []
    }
  },
}))