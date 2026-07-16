interface PixelPatternProps {
  pattern: 'hello-kitty' | 'pikachu' | 'doraemon' | 'my-melody' | 'stellalou'
  size?: number
}

const patterns: Record<string, string> = {
  'hello-kitty': `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="20" fill="#FFE4E9"/>
    <circle cx="5" cy="6" r="3" fill="#1a1a1a"/>
    <circle cx="15" cy="6" r="3" fill="#1a1a1a"/>
    <circle cx="5" cy="6" r="1" fill="#fff"/>
    <circle cx="15" cy="6" r="1" fill="#fff"/>
    <circle cx="10" cy="9" r="1" fill="#1a1a1a"/>
    <rect x="8" y="11" width="4" height="2" rx="1" fill="#FF6B8A"/>
    <circle cx="4" cy="3" r="2" fill="#FF1493"/>
    <circle cx="16" cy="3" r="2" fill="#FF1493"/>
  </svg>`,
  'pikachu': `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="20" fill="#FFD700"/>
    <polygon points="3,4 5,10 1,10" fill="#FFD700"/>
    <polygon points="17,4 15,10 19,10" fill="#FFD700"/>
    <polygon points="3,5 5,9 2,9" fill="#FF6347"/>
    <polygon points="17,5 15,9 18,9" fill="#FF6347"/>
    <circle cx="7" cy="7" r="2" fill="#1a1a1a"/>
    <circle cx="13" cy="7" r="2" fill="#1a1a1a"/>
    <circle cx="7" cy="7" r="0.5" fill="#fff"/>
    <circle cx="13" cy="7" r="0.5" fill="#fff"/>
    <circle cx="10" cy="11" r="2" fill="#FF6347"/>
    <rect x="8" y="13" width="4" height="1" fill="#1a1a1a"/>
  </svg>`,
  'doraemon': `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="20" fill="#00BFFF"/>
    <circle cx="10" cy="8" r="5" fill="#fff"/>
    <circle cx="7" cy="7" r="1.5" fill="#1a1a1a"/>
    <circle cx="13" cy="7" r="1.5" fill="#1a1a1a"/>
    <circle cx="7" cy="7" r="0.5" fill="#fff"/>
    <circle cx="13" cy="7" r="0.5" fill="#fff"/>
    <circle cx="10" cy="9" r="1" fill="#FF6347"/>
    <rect x="9" y="10" width="2" height="3" fill="#FF6347"/>
    <rect x="6" y="15" width="8" height="3" fill="#FF6347"/>
    <rect x="10" y="15" width="1" height="3" fill="#1a1a1a"/>
    <rect x="8" y="3" width="4" height="1" fill="#FFD700"/>
  </svg>`,
  'my-melody': `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="20" fill="#FFB6C1"/>
    <polygon points="4,2 7,8 1,8" fill="#FFB6C1"/>
    <polygon points="16,2 13,8 19,8" fill="#FFB6C1"/>
    <polygon points="5,3 7,7 3,7" fill="#FF69B4"/>
    <polygon points="15,3 13,7 17,7" fill="#FF69B4"/>
    <circle cx="7" cy="8" r="1.5" fill="#1a1a1a"/>
    <circle cx="13" cy="8" r="1.5" fill="#1a1a1a"/>
    <circle cx="10" cy="11" r="1" fill="#FF6347"/>
    <path d="M 8 13 Q 10 15 12 13" stroke="#1a1a1a" stroke-width="0.5" fill="none"/>
    <circle cx="4" cy="11" r="1" fill="#FF69B4" opacity="0.5"/>
    <circle cx="16" cy="11" r="1" fill="#FF69B4" opacity="0.5"/>
  </svg>`,
  'stellalou': `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="20" fill="#9370DB"/>
    <polygon points="4,3 7,9 1,9" fill="#9370DB"/>
    <polygon points="16,3 13,9 19,9" fill="#9370DB"/>
    <polygon points="5,4 7,8 3,8" fill="#DDA0DD"/>
    <polygon points="15,4 13,8 17,8" fill="#DDA0DD"/>
    <circle cx="7" cy="9" r="1.5" fill="#1a1a1a"/>
    <circle cx="13" cy="9" r="1.5" fill="#1a1a1a"/>
    <circle cx="7" cy="9" r="0.5" fill="#fff"/>
    <circle cx="13" cy="9" r="0.5" fill="#fff"/>
    <circle cx="10" cy="12" r="1" fill="#FF6347"/>
    <path d="M 8 14 Q 10 16 12 14" stroke="#1a1a1a" stroke-width="0.5" fill="none"/>
    <rect x="6" y="16" width="8" height="2" fill="#FFD700"/>
    <rect x="7" y="16" width="1" height="2" fill="#9370DB"/>
    <rect x="12" y="16" width="1" height="2" fill="#9370DB"/>
  </svg>`,
}

export function PixelPattern({ pattern, size = 192 }: PixelPatternProps) {
  return (
    <div 
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: patterns[pattern] || patterns['hello-kitty'] }}
    />
  )
}