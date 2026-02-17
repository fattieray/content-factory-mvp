#!/bin/bash

# 内容工厂 MVP 项目初始化脚本

echo "🚀 内容工厂 MVP - 项目初始化"
echo "=============================="

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 未检测到 Node.js，请先安装 Node.js 18+"
    exit 1
fi
echo "✅ Node.js: $(node -v)"

# 检查 Python
if ! command -v python3 &> /dev/null; then
    echo "❌ 未检测到 Python，请先安装 Python 3.11+"
    exit 1
fi
echo "✅ Python: $(python3 -v)"

# 初始化前端
echo ""
echo "📦 初始化前端..."
cd frontend
npm install
cp .env.example .env.local
cd ..

# 初始化后端
echo ""
echo "📦 初始化后端..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
deactivate
cd ..

echo ""
echo "✅ 项目初始化完成！"
echo ""
echo "下一步："
echo "1. 编辑 backend/.env 填入 Claude API Key"
echo "2. 前端开发：cd frontend && npm run dev"
echo "3. 后端开发：cd backend && source venv/bin/activate && vercel dev"
echo ""
