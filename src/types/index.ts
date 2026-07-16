export interface PerlerColor {
  id: string
  name: string
  hex: string
  r: number
  g: number
  b: number
}

export interface ColorUsage {
  color: PerlerColor
  count: number
}

export interface GridCell {
  color: PerlerColor
  row: number
  col: number
}

export interface Pattern {
  id: string
  user_id: string
  title: string
  keywords: string[]
  color_map: Record<string, PerlerColor>
  grid_data: GridCell[][]
  grid_size: number
  image_url: string
  created_at: string
}

export interface Post {
  id: string
  user_id: string
  pattern_id?: string
  content: string
  media_url: string
  media_type: 'image' | 'video'
  likes: number
  created_at: string
}

export interface Comment {
  id: string
  post_id: string
  user_id: string
  content: string
  created_at: string
}

export interface User {
  id: string
  email: string
  username: string
  created_at: string
}