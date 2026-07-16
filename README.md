# 拼豆生图 🧩

将任何照片转换为拼豆图案的创意工具应用。

## 功能特性

- 🎨 **智能生图**: 上传图片自动生成拼豆图纸
- 🎯 **颜色匹配**: 自动匹配Perler拼豆色号（100+种颜色）
- 📊 **豆粒统计**: 显示每种色号需要的豆子数量
- 💾 **收藏功能**: 自动保存生成的图纸，支持关键词搜索
- 🔍 **发现搜索**: 搜索其他用户上传的图纸
- 👥 **社区交流**: 分享作品，点赞互动

## 技术栈

- React 18 + TypeScript
- Vite 6
- Tailwind CSS 3
- Zustand (状态管理)
- Lucide React (图标)
- Supabase (后端服务)

## 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 部署到 Vercel

1. **推送代码到 GitHub**

```bash
git add .
git commit -m "初始化项目"
git branch -M main
git remote add origin https://github.com/your-username/bead-pattern-generator.git
git push -u origin main
```

2. **连接 Vercel**

- 访问 [Vercel](https://vercel.com)
- 点击 "New Project"
- 选择你的 GitHub 仓库
- 点击 "Deploy"

3. **配置 Supabase**

- 访问 [Supabase](https://supabase.com) 创建项目
- 获取项目 URL 和 ANON_KEY
- 在 Vercel 项目设置中添加环境变量：
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

## 项目结构

```
src/
├── components/          # 通用组件
├── pages/               # 页面组件
├── utils/               # 工具函数
├── store/               # 状态管理
├── types/               # TypeScript类型定义
└── lib/                 # 外部库配置
```

## 页面路由

| 路由 | 功能 |
|------|------|
| `/` | 首页 |
| `/create` | 生图工具 |
| `/saved` | 我的收藏 |
| `/discover` | 发现页 |
| `/community` | 社区页 |
| `/login` | 登录页 |
| `/register` | 注册页 |

## License

MIT