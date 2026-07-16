import { useState, useCallback, useRef } from 'react'
import { Upload, Download, Save, RefreshCw, Image as ImageIcon, Grid3X3 } from 'lucide-react'
import { PerlerColor } from '../types'
import { generateGrid, downloadPatternImage } from '../utils/imageProcessor'
import { getSortedColorUsage } from '../utils/colorMatcher'
import { GridPreview } from '../components/GridPreview'
import { ColorPalette } from '../components/ColorPalette'

export function CreatePage() {
  const [originalImage, setOriginalImage] = useState<string>('')
  const [grid, setGrid] = useState<PerlerColor[][]>([])
  const [gridSize, setGridSize] = useState(30)
  const [isProcessing, setIsProcessing] = useState(false)
  const [patternTitle, setPatternTitle] = useState('')
  const [keywords, setKeywords] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsProcessing(true)
    try {
      const reader = new FileReader()
      reader.onload = async (event) => {
        const imgSrc = event.target?.result as string
        setOriginalImage(imgSrc)
        
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = async () => {
          const result = await generateGrid(img, gridSize)
          setGrid(result.grid)
          setIsProcessing(false)
        }
        img.src = imgSrc
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Failed to process image:', error)
      setIsProcessing(false)
    }
  }, [gridSize])

  const handleGridSizeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value)
    setGridSize(newSize)
  }, [])

  const handleRegenerate = useCallback(() => {
    if (!originalImage) return
    
    setIsProcessing(true)
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = async () => {
      const result = await generateGrid(img, gridSize)
      setGrid(result.grid)
      setIsProcessing(false)
    }
    img.src = originalImage
  }, [originalImage, gridSize])

  const handleDownload = useCallback(() => {
    if (grid.length === 0) return
    downloadPatternImage(grid, patternTitle || 'pattern')
  }, [grid, patternTitle])

  const handleSave = useCallback(() => {
    if (grid.length === 0) return
    
    const colorUsage = getSortedColorUsage(grid)
    const patternData = {
      title: patternTitle || '未命名图案',
      keywords: keywords.split(',').map(k => k.trim()).filter(k => k),
      color_map: colorUsage,
      grid_data: grid,
      grid_size: gridSize,
      image_url: originalImage,
    }
    
    const savedPatterns = JSON.parse(localStorage.getItem('patterns') || '[]')
    savedPatterns.push({
      ...patternData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    })
    localStorage.setItem('patterns', JSON.stringify(savedPatterns))
    
    alert('图案已保存到本地！')
  }, [grid, gridSize, patternTitle, keywords, originalImage])

  const colorUsage = grid.length > 0 ? getSortedColorUsage(grid) : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">图片转拼豆</h1>
          <p className="text-gray-600">上传图片，自动生成拼豆图纸</p>
        </div>

        {!originalImage ? (
          <div className="max-w-2xl mx-auto">
            <div
              className="border-2 border-dashed border-pink-300 rounded-2xl p-12 text-center hover:border-pink-400 hover:bg-pink-50/50 transition-all cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload size={40} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">点击或拖拽上传图片</h3>
              <p className="text-gray-500">支持 JPG、PNG 格式，最大 10MB</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <label className="flex items-center space-x-2 mb-4">
                <Grid3X3 size={20} className="text-pink-500" />
                <span className="font-semibold text-gray-800">网格大小</span>
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={gridSize}
                  onChange={handleGridSizeChange}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
                <span className="w-16 text-center font-bold text-pink-500">{gridSize}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">调整网格粗细，数值越小图案越简单</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                  <ImageIcon size={20} className="text-pink-500" />
                  <span>原图</span>
                </h3>
                <div className="bg-gray-100 rounded-lg overflow-hidden max-h-96">
                  <img
                    src={originalImage}
                    alt="Original"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                  <Grid3X3 size={20} className="text-pink-500" />
                  <span>拼豆效果</span>
                </h3>
                {isProcessing ? (
                  <div className="h-96 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
                  </div>
                ) : grid.length > 0 ? (
                  <div className="max-h-96 overflow-auto">
                    <GridPreview grid={grid} cellSize={Math.max(4, Math.floor(300 / gridSize))} />
                  </div>
                ) : (
                  <div className="h-96 flex items-center justify-center text-gray-400">
                    等待生成...
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <ColorPalette colors={colorUsage} />
              </div>

              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-4">保存设置</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">图案名称</label>
                    <input
                      type="text"
                      value={patternTitle}
                      onChange={(e) => setPatternTitle(e.target.value)}
                      placeholder="输入图案名称"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">关键词</label>
                    <input
                      type="text"
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      placeholder="输入关键词，用逗号分隔"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-6">
                  <button
                    onClick={handleRegenerate}
                    disabled={isProcessing}
                    className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                  >
                    <RefreshCw size={20} className={isProcessing ? 'animate-spin' : ''} />
                    <span>重新生成</span>
                  </button>
                  <button
                    onClick={handleDownload}
                    disabled={grid.length === 0}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    <Download size={20} />
                    <span>下载图纸</span>
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={grid.length === 0}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 transition-colors disabled:opacity-50"
                  >
                    <Save size={20} />
                    <span>保存收藏</span>
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