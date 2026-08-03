import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

interface PerlerColor {
  id: string
  name: string
  hex: string
  r: number
  g: number
  b: number
}

const perlerColors: PerlerColor[] = [
  { id: 'H7', name: '黑色', hex: '#000000', r: 0, g: 0, b: 0 },
  { id: 'H2', name: '白色', hex: '#FEFFFF', r: 254, g: 255, b: 255 },
  { id: 'H1', name: '透明', hex: '#FDFBFF', r: 253, g: 251, b: 255 },
  { id: 'H3', name: '浅灰紫', hex: '#B6B1BA', r: 182, g: 177, b: 186 },
  { id: 'H4', name: '中灰', hex: '#89858C', r: 137, g: 133, b: 140 },
  { id: 'H5', name: '深灰', hex: '#48464E', r: 72, g: 70, b: 78 },
  { id: 'H6', name: '黑灰', hex: '#2F2B2F', r: 47, g: 43, b: 47 },
  { id: 'H8', name: '淡粉灰', hex: '#E7D6DB', r: 231, g: 214, b: 219 },
  { id: 'H9', name: '灰白', hex: '#EDEDED', r: 237, g: 237, b: 237 },
  { id: 'H10', name: '浅灰白', hex: '#EEE9EA', r: 238, g: 233, b: 234 },
  { id: 'H11', name: '中灰白', hex: '#CECDD5', r: 206, g: 205, b: 213 },
  { id: 'H12', name: '浅橙白', hex: '#FFF5ED', r: 255, g: 245, b: 237 },
  { id: 'H13', name: '米白', hex: '#F5ECD2', r: 245, g: 236, b: 210 },
  { id: 'H14', name: '浅绿灰', hex: '#CFD7D3', r: 207, g: 215, b: 211 },
  { id: 'H15', name: '蓝灰', hex: '#98A6A8', r: 152, g: 166, b: 168 },
  { id: 'H16', name: '深黑', hex: '#1D1414', r: 29, g: 20, b: 20 },
  { id: 'H17', name: '乳白', hex: '#F1EDED', r: 241, g: 237, b: 237 },
  { id: 'H18', name: '暖白', hex: '#FFFDF0', r: 255, g: 253, b: 240 },
  { id: 'H19', name: '象牙白', hex: '#F6EFE2', r: 246, g: 239, b: 226 },
  { id: 'H20', name: '冷灰', hex: '#949FA3', r: 148, g: 159, b: 163 },
  { id: 'H21', name: '淡黄白', hex: '#FFFBE1', r: 255, g: 251, b: 225 },
  { id: 'H22', name: '浅灰蓝', hex: '#CACAD4', r: 202, g: 202, b: 212 },
  { id: 'H23', name: '绿灰', hex: '#9A9D94', r: 154, g: 157, b: 148 },
  
  { id: 'F5', name: '大红色', hex: '#E7002F', r: 231, g: 0, b: 47 },
  { id: 'F4', name: '鲜红', hex: '#FC283C', r: 252, g: 40, b: 60 },
  { id: 'F3', name: '橙红', hex: '#F74941', r: 247, g: 73, b: 65 },
  { id: 'F2', name: '珊瑚红', hex: '#FC3D46', r: 252, g: 61, b: 70 },
  { id: 'F1', name: '肉粉色', hex: '#FD957B', r: 253, g: 149, b: 123 },
  { id: 'F6', name: '深红棕', hex: '#943630', r: 148, g: 54, b: 48 },
  { id: 'F7', name: '酒红', hex: '#971937', r: 151, g: 25, b: 55 },
  { id: 'F8', name: '深血红', hex: '#BC0028', r: 188, g: 0, b: 40 },
  { id: 'F9', name: '粉红', hex: '#E2677A', r: 226, g: 103, b: 122 },
  { id: 'F10', name: '棕红', hex: '#8A4526', r: 138, g: 69, b: 38 },
  { id: 'F11', name: '深棕红', hex: '#5A2121', r: 90, g: 33, b: 33 },
  { id: 'F12', name: '玫红', hex: '#FD4E6A', r: 253, g: 78, b: 106 },
  { id: 'F13', name: '橘红', hex: '#F35744', r: 243, g: 87, b: 68 },
  { id: 'F14', name: '浅粉', hex: '#FFA9AD', r: 255, g: 169, b: 173 },
  { id: 'F15', name: '正红', hex: '#D30022', r: 211, g: 0, b: 34 },
  { id: 'F16', name: '肉色', hex: '#FEC2A6', r: 254, g: 194, b: 166 },
  { id: 'F17', name: '浅棕', hex: '#E69C79', r: 230, g: 156, b: 121 },
  { id: 'F18', name: '土棕', hex: '#D37C46', r: 211, g: 124, b: 70 },
  { id: 'F19', name: '暗红', hex: '#C1444A', r: 193, g: 68, b: 74 },
  { id: 'F20', name: '灰粉', hex: '#CD9391', r: 205, g: 147, b: 145 },
  { id: 'F21', name: '玫瑰粉', hex: '#F7B4C6', r: 247, g: 180, b: 198 },
  { id: 'F22', name: '淡粉', hex: '#FDC0D0', r: 253, g: 192, b: 208 },
  { id: 'F23', name: '珊瑚橙', hex: '#F67E66', r: 246, g: 126, b: 102 },
  { id: 'F24', name: '浅红紫', hex: '#E698AA', r: 230, g: 152, b: 170 },
  { id: 'F25', name: '砖红', hex: '#E54B4F', r: 229, g: 75, b: 79 },
  
  { id: 'A1', name: '米黄', hex: '#FAF4C8', r: 250, g: 244, b: 200 },
  { id: 'A2', name: '乳黄', hex: '#FFFFD5', r: 255, g: 255, b: 213 },
  { id: 'A3', name: '亮黄', hex: '#FEFF8B', r: 254, g: 255, b: 139 },
  { id: 'A4', name: '柠檬黄', hex: '#FBED56', r: 251, g: 237, b: 86 },
  { id: 'A5', name: '金黄', hex: '#F4D738', r: 244, g: 215, b: 56 },
  { id: 'A6', name: '橙黄', hex: '#FEAC4C', r: 254, g: 172, b: 76 },
  { id: 'A7', name: '橙红', hex: '#FE8B4C', r: 254, g: 139, b: 76 },
  { id: 'A8', name: '柠檬金黄', hex: '#FFDA45', r: 255, g: 218, b: 69 },
  { id: 'A9', name: '橙棕', hex: '#FF995B', r: 255, g: 153, b: 91 },
  { id: 'A10', name: '深橙', hex: '#F77C31', r: 247, g: 124, b: 49 },
  { id: 'A11', name: '浅黄', hex: '#FFDD99', r: 255, g: 221, b: 153 },
  { id: 'A12', name: '浅橙', hex: '#FE9F72', r: 254, g: 159, b: 114 },
  { id: 'A13', name: '金黄橙', hex: '#FFC365', r: 255, g: 195, b: 101 },
  { id: 'A14', name: '红橙', hex: '#FD543D', r: 253, g: 84, b: 61 },
  { id: 'A15', name: '浅柠檬', hex: '#FFF365', r: 255, g: 243, b: 101 },
  { id: 'A16', name: '淡黄', hex: '#FFFF9F', r: 255, g: 255, b: 159 },
  { id: 'A17', name: '浅金', hex: '#FFE36E', r: 255, g: 227, b: 110 },
  { id: 'A18', name: '肉橙', hex: '#FEBE7D', r: 254, g: 190, b: 125 },
  { id: 'A19', name: '粉橙', hex: '#FD7C72', r: 253, g: 124, b: 114 },
  { id: 'A20', name: '杏黄', hex: '#FFD568', r: 255, g: 213, b: 104 },
  { id: 'A21', name: '浅杏', hex: '#FFE395', r: 255, g: 227, b: 149 },
  { id: 'A22', name: '黄绿', hex: '#F4F57D', r: 244, g: 245, b: 125 },
  { id: 'A23', name: '肤粉', hex: '#E6C9B7', r: 230, g: 201, b: 183 },
  { id: 'A24', name: '淡黄绿', hex: '#F7F8A2', r: 247, g: 248, b: 162 },
  { id: 'A25', name: '金杏', hex: '#FFD67D', r: 255, g: 214, b: 125 },
  { id: 'A26', name: '亮金黄', hex: '#FFC830', r: 255, g: 200, b: 48 },
  
  { id: 'C1', name: '淡蓝', hex: '#9FD0E8', r: 159, g: 208, b: 232 },
  { id: 'C2', name: '浅天蓝', hex: '#7EC8E3', r: 126, g: 200, b: 227 },
  { id: 'C3', name: '天蓝', hex: '#4FC4F6', r: 79, g: 196, b: 246 },
  { id: 'C4', name: '亮蓝', hex: '#2D9CDB', r: 45, g: 156, b: 219 },
  { id: 'C5', name: '深蓝', hex: '#0E4F80', r: 14, g: 79, b: 128 },
  { id: 'C6', name: '宝蓝', hex: '#00529B', r: 0, g: 82, b: 155 },
  { id: 'C7', name: '紫蓝', hex: '#504B94', r: 80, g: 75, b: 148 },
  { id: 'C8', name: '浅紫', hex: '#9A90E7', r: 154, g: 144, b: 231 },
  { id: 'C9', name: '紫', hex: '#7A67EE', r: 122, g: 103, b: 238 },
  { id: 'C10', name: '深紫', hex: '#5B4D9D', r: 91, g: 77, b: 157 },
  { id: 'C11', name: '粉紫', hex: '#C77DC5', r: 199, g: 125, b: 197 },
  { id: 'C12', name: '紫粉', hex: '#D87DAE', r: 216, g: 125, b: 174 },
  { id: 'C13', name: '蓝紫', hex: '#6B5BAA', r: 107, g: 91, b: 170 },
  { id: 'C14', name: '靛蓝', hex: '#2E4F87', r: 46, g: 79, b: 135 },
  { id: 'C15', name: '深紫蓝', hex: '#3B327D', r: 59, g: 50, b: 125 },
  { id: 'C16', name: '薰衣草紫', hex: '#C6B8E3', r: 198, g: 184, b: 227 },
  { id: 'C17', name: '浅紫蓝', hex: '#91A3D4', r: 145, g: 163, b: 212 },
  { id: 'C18', name: '灰蓝', hex: '#7BA3B5', r: 123, g: 163, b: 181 },
  { id: 'C19', name: '浅蓝', hex: '#B8DFE8', r: 184, g: 223, b: 232 },
  { id: 'C20', name: '冰蓝', hex: '#E0F4FF', r: 224, g: 244, b: 255 },
  { id: 'C21', name: '水蓝', hex: '#6DD5ED', r: 109, g: 213, b: 237 },
  { id: 'C22', name: '薄荷蓝', hex: '#B2EBF2', r: 178, g: 235, b: 242 },
  { id: 'C23', name: '天蓝紫', hex: '#9FA8DA', r: 159, g: 168, b: 218 },
  { id: 'C24', name: '浅紫粉', hex: '#E1BEE7', r: 225, g: 190, b: 231 },
  { id: 'C25', name: '紫灰', hex: '#9E9EBA', r: 158, g: 158, b: 186 },
  
  { id: 'B1', name: '嫩绿', hex: '#B3E5B2', r: 179, g: 229, b: 178 },
  { id: 'B2', name: '黄绿', hex: '#B8E075', r: 184, g: 224, b: 117 },
  { id: 'B3', name: '浅绿', hex: '#9DD99A', r: 157, g: 217, b: 154 },
  { id: 'B4', name: '草绿', hex: '#7BC96F', r: 123, g: 201, b: 111 },
  { id: 'B5', name: '绿', hex: '#58C14D', r: 88, g: 193, b: 77 },
  { id: 'B6', name: '深绿', hex: '#368B3E', r: 54, g: 139, b: 62 },
  { id: 'B7', name: '墨绿', hex: '#2B5A34', r: 43, g: 90, b: 52 },
  { id: 'B8', name: '橄榄绿', hex: '#7B8B5D', r: 123, g: 139, b: 93 },
  { id: 'B9', name: '黄绿', hex: '#C7D94A', r: 199, g: 217, b: 74 },
  { id: 'B10', name: '亮绿', hex: '#69DB7C', r: 105, g: 219, b: 124 },
  { id: 'B11', name: '翠绿', hex: '#38B2AC', r: 56, g: 178, b: 172 },
  { id: 'B12', name: '青绿', hex: '#319795', r: 49, g: 151, b: 149 },
  { id: 'B13', name: '浅黄绿', hex: '#D8FA8F', r: 216, g: 250, b: 143 },
  { id: 'B14', name: '柠檬绿', hex: '#A8E6CF', r: 168, g: 230, b: 207 },
  { id: 'B15', name: '薄荷绿', hex: '#DCEDC1', r: 220, g: 237, b: 193 },
  { id: 'B16', name: '浅草绿', hex: '#BBE5B3', r: 187, g: 229, b: 179 },
  { id: 'B17', name: '灰绿', hex: '#9CAF88', r: 156, g: 175, b: 136 },
  { id: 'B18', name: '棕绿', hex: '#6B7B5F', r: 107, g: 123, b: 95 },
  { id: 'B19', name: '深青绿', hex: '#2C5F5B', r: 44, g: 95, b: 91 },
  { id: 'B20', name: '蓝绿', hex: '#2D5016', r: 45, g: 80, b: 22 },
  { id: 'B21', name: '浅黄绿', hex: '#E6F4A7', r: 230, g: 244, b: 167 },
  { id: 'B22', name: '嫩黄绿', hex: '#D9F99D', r: 217, g: 249, b: 157 },
  { id: 'B23', name: '翠蓝绿', hex: '#5EEAD4', r: 94, g: 234, b: 212 },
  { id: 'B24', name: '亮青绿', hex: '#34D399', r: 52, g: 211, b: 153 },
  { id: 'B25', name: '浅青绿', hex: '#A7F3D0', r: 167, g: 243, b: 208 },
  
  { id: 'E1', name: '粉红', hex: '#F48FB1', r: 244, g: 143, b: 177 },
  { id: 'E2', name: '浅粉红', hex: '#F8BBD9', r: 248, g: 187, b: 217 },
  { id: 'E3', name: '玫瑰红', hex: '#F06292', r: 240, g: 98, b: 146 },
  { id: 'E4', name: '深粉红', hex: '#EC407A', r: 236, g: 64, b: 122 },
  { id: 'E5', name: '紫红', hex: '#CE93D8', r: 206, g: 147, b: 216 },
  { id: 'E6', name: '粉红', hex: '#F48FB1', r: 244, g: 143, b: 177 },
  { id: 'E7', name: '淡粉', hex: '#FCE4EC', r: 252, g: 228, b: 236 },
  { id: 'E8', name: '浅粉紫', hex: '#E1BEE7', r: 225, g: 190, b: 231 },
  { id: 'E9', name: '紫粉', hex: '#F48FB1', r: 244, g: 143, b: 177 },
  { id: 'E10', name: '肉粉', hex: '#FFCDD2', r: 255, g: 205, b: 210 },
  { id: 'E11', name: '肤色', hex: '#FADAD1', r: 250, g: 218, b: 209 },
  { id: 'E12', name: '浅肤色', hex: '#FFECB3', r: 255, g: 236, b: 179 },
  { id: 'E13', name: '桃色', hex: '#FFAB91', r: 255, g: 171, b: 145 },
  { id: 'E14', name: '杏色', hex: '#FFCCBC', r: 255, g: 204, b: 188 },
  { id: 'E15', name: '裸色', hex: '#EFEBE9', r: 239, g: 235, b: 233 },
  { id: 'E16', name: '浅杏色', hex: '#FFE0B2', r: 255, g: 224, b: 178 },
  { id: 'E17', name: '粉杏', hex: '#FFCDD2', r: 255, g: 205, b: 210 },
  { id: 'E18', name: '淡杏', hex: '#FFECB3', r: 255, g: 236, b: 179 },
  { id: 'E19', name: '米肤色', hex: '#F5E6D3', r: 245, g: 230, b: 211 },
  { id: 'E20', name: '暖肤色', hex: '#FDE0DC', r: 253, g: 224, b: 220 },
  { id: 'E21', name: '冷肤色', hex: '#FCE4EC', r: 252, g: 228, b: 236 },
  { id: 'E22', name: '粉肤', hex: '#FFE4E1', r: 255, g: 228, b: 225 },
  { id: 'E23', name: '深肤', hex: '#EFEBE9', r: 239, g: 235, b: 233 },
  { id: 'E24', name: '浅粉肤', hex: '#FFF0F5', r: 255, g: 240, b: 245 },
  { id: 'E25', name: '玫瑰肤', hex: '#F8BBD9', r: 248, g: 187, b: 217 },
  
  { id: 'G1', name: '棕色', hex: '#9E643C', r: 158, g: 100, b: 60 },
  { id: 'G2', name: '浅棕', hex: '#C4A35A', r: 196, g: 163, b: 90 },
  { id: 'G3', name: '深棕', hex: '#5D4037', r: 93, g: 64, b: 55 },
  { id: 'G4', name: '红棕', hex: '#8D6E63', r: 141, g: 110, b: 99 },
  { id: 'G5', name: '金棕', hex: '#BCAAA4', r: 188, g: 170, b: 164 },
  { id: 'G6', name: '棕黄', hex: '#A1887F', r: 161, g: 136, b: 127 },
  { id: 'G7', name: '深棕', hex: '#6D4C41', r: 109, g: 76, b: 65 },
  { id: 'G8', name: '棕褐', hex: '#8D4004', r: 141, g: 64, b: 4 },
  { id: 'G9', name: '浅棕褐', hex: '#BF8F5A', r: 191, g: 143, b: 90 },
  { id: 'G10', name: '深棕褐', hex: '#5D4037', r: 93, g: 64, b: 55 },
  { id: 'G11', name: '棕红', hex: '#8D6E63', r: 141, g: 110, b: 99 },
  { id: 'G12', name: '咖啡棕', hex: '#795548', r: 121, g: 85, b: 72 },
  { id: 'G13', name: '奶咖', hex: '#BCAAA4', r: 188, g: 170, b: 164 },
  { id: 'G14', name: '摩卡', hex: '#A1887F', r: 161, g: 136, b: 127 },
  { id: 'G15', name: '焦糖', hex: '#C67C00', r: 198, g: 124, b: 0 },
  { id: 'G16', name: '琥珀', hex: '#FF8F00', r: 255, g: 143, b: 0 },
  { id: 'G17', name: '茶棕', hex: '#5D4037', r: 93, g: 64, b: 55 },
  { id: 'G18', name: '栗棕', hex: '#8D6E63', r: 141, g: 110, b: 99 },
  { id: 'G19', name: '胡桃棕', hex: '#6D4C41', r: 109, g: 76, b: 65 },
  { id: 'G20', name: '檀木棕', hex: '#5D4037', r: 93, g: 64, b: 55 },
  { id: 'G21', name: '原木棕', hex: '#A1887F', r: 161, g: 136, b: 127 },
  { id: 'G22', name: '浅木棕', hex: '#BCAAA4', r: 188, g: 170, b: 164 },
  { id: 'G23', name: '深木棕', hex: '#6D4C41', r: 109, g: 76, b: 65 },
  { id: 'G24', name: '棕灰', hex: '#757575', r: 117, g: 117, b: 117 },
  { id: 'G25', name: '暖棕', hex: '#8D6E63', r: 141, g: 110, b: 99 },
]

function findClosestColor(r: number, g: number, b: number): PerlerColor {
  let closestColor = perlerColors[0]
  let minDistance = Infinity
  
  for (const color of perlerColors) {
    const dr = r - color.r
    const dg = g - color.g
    const db = b - color.b
    const distance = dr * dr + dg * dg + db * db
    
    if (distance < minDistance) {
      minDistance = distance
      closestColor = color
    }
  }
  
  return closestColor
}

async function generatePatternFromImage(imagePath: string, gridSize: number = 32): Promise<{ grid: PerlerColor[][], colors: Map<string, number> }> {
  const image = await sharp(imagePath)
    .resize(gridSize, gridSize, { fit: 'cover' })
    .removeAlpha()
    .raw()
    .toBuffer()
  
  const grid: PerlerColor[][] = []
  const colors = new Map<string, number>()
  
  for (let y = 0; y < gridSize; y++) {
    const row: PerlerColor[] = []
    for (let x = 0; x < gridSize; x++) {
      const idx = (y * gridSize + x) * 3
      const r = image[idx]
      const g = image[idx + 1]
      const b = image[idx + 2]
      
      const color = findClosestColor(r, g, b)
      row.push(color)
      
      colors.set(color.id, (colors.get(color.id) || 0) + 1)
    }
    grid.push(row)
  }
  
  return { grid, colors }
}

function generateGridCode(grid: PerlerColor[][], patternName: string): string {
  let code = `export const ${patternName}Grid: PerlerColor[][] = [\n`
  
  for (let y = 0; y < grid.length; y++) {
    code += '  ['
    for (let x = 0; x < grid[y].length; x++) {
      code += `'${grid[y][x].id}'`
      if (x < grid[y].length - 1) {
        code += ', '
      }
    }
    code += ']'
    if (y < grid.length - 1) {
      code += ',\n'
    }
  }
  
  code += '\n]\n'
  return code
}

function generateColorMapCode(colors: Map<string, number>): string {
  let code = 'color_map: {\n'
  
  const sortedColors = Array.from(colors.entries()).sort((a, b) => b[1] - a[1])
  
  for (const [colorId, count] of sortedColors) {
    const color = perlerColors.find(c => c.id === colorId)
    if (color) {
      code += `    '${colorId}': { name: '${color.name}', count: ${count} },\n`
    }
  }
  
  code += '  },'
  return code
}

async function main() {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  
  const publicDir = path.join(__dirname, '..', 'public')
  const presetDir = path.join(__dirname, '..', 'src', 'data')
  
  const imageFiles = [
    { name: 'spiderman', fileName: '屏幕截图 2026-07-16 205738.png' },
    { name: 'helloKittyBear', fileName: '屏幕截图 2026-07-16 205817.png' },
    { name: 'pikachu', fileName: '屏幕截图 2026-07-16 205903.png' },
    { name: 'helloKittyPink', fileName: '屏幕截图 2026-07-16 205922.png' },
    { name: 'pattern1', fileName: '0538786595fbd6c84c15174eb9cfade.jpg' },
    { name: 'pattern2', fileName: '20201008105545_5c3be.jpeg' },
    { name: 'pattern3', fileName: '28913413_164005153619_2.jpg' },
    { name: 'pattern4', fileName: '7c32ad0e73d1cd60ed9778ff04fd4b8.jpg' },
    { name: 'pattern5', fileName: '96788c687fbf3d71221c964095f6008.jpg' },
    { name: 'pattern6', fileName: '微信图片_20260716194835.jpg' },
  ]
  
  let presetCode = `import { PerlerColor, Pattern } from '../types'\nimport { perlerColors } from '../utils/perlerColors'\n\nconst getColor = (id: string): PerlerColor => {\n  return perlerColors.find(c => c.id === id) || perlerColors[0]\n}\n\n`
  
  const patterns: { name: string; title: string; description: string; keywords: string[] }[] = [
    { name: 'spiderman', title: '蜘蛛侠', description: '酷炫的蜘蛛侠拼豆图纸', keywords: ['超级英雄', '漫威', '酷炫'] },
    { name: 'helloKittyBear', title: 'Hello Kitty抱小熊', description: '可爱的Hello Kitty抱着小熊拼豆图纸', keywords: ['卡通', '可爱', 'Sanrio'] },
    { name: 'pikachu', title: '皮卡丘', description: '萌萌的皮卡丘拼豆图纸', keywords: ['动漫', '宝可梦', '可爱'] },
    { name: 'helloKittyPink', title: 'Hello Kitty', description: '粉色背景的Hello Kitty拼豆图纸', keywords: ['卡通', '可爱', 'Sanrio'] },
    { name: 'pattern1', title: '拼豆图纸1', description: '精美拼豆图案图纸', keywords: ['拼豆', '手工', '创意'] },
    { name: 'pattern2', title: '拼豆图纸2', description: '精美拼豆图案图纸', keywords: ['拼豆', '手工', '创意'] },
    { name: 'pattern3', title: '拼豆图纸3', description: '精美拼豆图案图纸', keywords: ['拼豆', '手工', '创意'] },
    { name: 'pattern4', title: '拼豆图纸4', description: '精美拼豆图案图纸', keywords: ['拼豆', '手工', '创意'] },
    { name: 'pattern5', title: '拼豆图纸5', description: '精美拼豆图案图纸', keywords: ['拼豆', '手工', '创意'] },
    { name: 'pattern6', title: '拼豆图纸6', description: '精美拼豆图案图纸', keywords: ['拼豆', '手工', '创意'] },
  ]
  
  for (const { name, fileName } of imageFiles) {
    const imagePath = path.join(publicDir, fileName)
    
    if (!fs.existsSync(imagePath)) {
      console.log(`文件不存在: ${imagePath}`)
      continue
    }
    
    console.log(`正在处理: ${fileName} -> ${name}`)
    
    const { grid, colors } = await generatePatternFromImage(imagePath, 48)
    
    const whiteColor = perlerColors.find(c => c.id === 'H2')!
    
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        const r = grid[y][x].r
        const g = grid[y][x].g
        const b = grid[y][x].b
        const brightness = (r * 299 + g * 587 + b * 114) / 1000
        if (brightness > 240) {
          grid[y][x] = whiteColor
          colors.set('H2', (colors.get('H2') || 0) + 1)
          if (grid[y][x].id !== 'H2') {
            colors.set(grid[y][x].id, (colors.get(grid[y][x].id) || 0) - 1)
          }
        }
      }
    }
    
    presetCode += `export const ${name}Grid: PerlerColor[][] = (() => {\n`
    presetCode += `  const grid = []\n`
    
    for (let y = 0; y < grid.length; y++) {
      presetCode += `  grid.push([`
      for (let x = 0; x < grid[y].length; x++) {
        presetCode += `getColor('${grid[y][x].id}')`
        if (x < grid[y].length - 1) {
          presetCode += ', '
        }
      }
      presetCode += `])\n`
    }
    
    presetCode += '  return grid\n'
    presetCode += `})()\n\n`
  }
  
  presetCode += 'export const presetPatterns: Pattern[] = [\n'
  
  for (let i = 0; i < imageFiles.length; i++) {
    const { name } = imageFiles[i]
    const pattern = patterns[i]
    
    presetCode += `  {\n`
    presetCode += `    id: '${name}',\n`
    presetCode += `    title: '${pattern.title}',\n`
    presetCode += `    description: '${pattern.description}',\n`
    presetCode += `    grid_size: 48,\n`
    presetCode += `    grid_data: ${name}Grid,\n`
    
    const imagePath = path.join(publicDir, imageFiles[i].fileName)
    let colorMapCode = '    color_map: {\n'
    
    if (fs.existsSync(imagePath)) {
      const { colors } = await generatePatternFromImage(imagePath, 48)
      const sortedColors = Array.from(colors.entries()).sort((a, b) => b[1] - a[1])
      
      for (const [colorId, count] of sortedColors) {
        const color = perlerColors.find(c => c.id === colorId)
        if (color) {
          colorMapCode += `      '${colorId}': { name: '${color.name}', count: ${count} },\n`
        }
      }
    }
    
    colorMapCode += '    },\n'
    presetCode += colorMapCode
    
    presetCode += `    keywords: ['${pattern.keywords.join("', '")}'],\n`
    presetCode += `    created_at: '2024-01-${String(15 - i).padStart(2, '0')}',\n`
    presetCode += `    likes: ${Math.max(500, 2150 - i * 180)},\n`
    presetCode += '  },\n'
  }
  
  presetCode += ']\n'
  
  const outputPath = path.join(presetDir, 'presetPatterns.ts')
  fs.writeFileSync(outputPath, presetCode)
  
  console.log(`\n生成完成！文件已保存到: ${outputPath}`)
}

main().catch(console.error)
