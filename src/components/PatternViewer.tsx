import { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, Maximize2, RotateCcw } from 'lucide-react';
import { PerlerColor } from '../types';

interface PatternViewerProps {
  grid: PerlerColor[][];
}

export function PatternViewer({ grid }: PatternViewerProps) {
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const rows = grid.length;
  const cols = grid[0]?.length || 0;
  const baseCellSize = 16;
  
  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 5));
  };
  
  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.2));
  };
  
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };
  
  const handleFit = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth - 32;
      const containerHeight = containerRef.current.clientHeight - 32;
      const scaleX = containerWidth / (cols * baseCellSize);
      const scaleY = containerHeight / (rows * baseCellSize);
      setScale(Math.min(scaleX, scaleY, 2));
      setPosition({ x: 0, y: 0 });
    }
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - startPosition.x,
      y: e.clientY - startPosition.y,
    });
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    setScale((prev) => Math.min(Math.max(prev + delta, 0.2), 5));
  };
  
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mouseup', handleMouseUp);
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseUp);
      return () => {
        container.removeEventListener('mouseup', handleMouseUp);
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseUp);
      };
    }
  }, [isDragging, position, startPosition]);
  
  useEffect(() => {
    handleFit();
  }, []);
  
  const cellSize = baseCellSize * scale;
  const showLabel = cellSize >= 12;
  const labelFontSize = Math.max(6, Math.floor(cellSize * 0.4));
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleZoomOut}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="缩小"
          >
            <ZoomOut size={20} className="text-gray-600" />
          </button>
          <span className="text-sm font-medium text-gray-700 min-w-[70px] text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="放大"
          >
            <ZoomIn size={20} className="text-gray-600" />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleFit}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="适应窗口"
          >
            <Maximize2 size={20} className="text-gray-600" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="重置"
          >
            <RotateCcw size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
      
      <div
        ref={containerRef}
        className="flex-1 overflow-hidden bg-gray-50 rounded-lg relative cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.1s ease-out',
            }}
          >
            <div
              className="bg-white p-3 rounded-lg shadow-inner border border-gray-200"
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, ${baseCellSize}px)`,
                gap: '1px',
                backgroundColor: '#e8e8e8',
              }}
            >
              {grid.map((row, rowIndex) =>
                row.map((color, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className="relative"
                    style={{
                      width: baseCellSize,
                      height: baseCellSize,
                      backgroundColor: color.hex,
                      border: '1px solid rgba(0,0,0,0.08)',
                    }}
                    title={`${color.name} (${color.id})`}
                  >
                    {showLabel && (
                      <span
                        className="absolute inset-0 flex items-center justify-center font-bold select-none pointer-events-none"
                        style={{
                          fontSize: labelFontSize,
                          color: getContrastColor(color.hex),
                          textShadow: scale <= 1 ? '0.5px 0.5px 0 rgba(0,0,0,0.3)' : 'none',
                          lineHeight: '1',
                        }}
                      >
                        {color.id}
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
            
            <div className="mt-3 text-xs text-gray-500 text-center">
              {cols} × {rows} 格子 | 共 {cols * rows} 颗豆粒 | 实际尺寸: {Math.round(cols * baseCellSize * 0.1)} × {Math.round(rows * baseCellSize * 0.1)} cm
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          滚轮缩放 · 拖动平移
        </div>
      </div>
    </div>
  );
}

function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 140 ? '#222222' : '#ffffff';
}