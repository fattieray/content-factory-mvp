#!/bin/bash

# ============================================
# 内容工厂 MVP - Day 1 快速启动脚本
# ============================================

set -e

echo "🚀 内容工厂 MVP - Day 1 启动"
echo "=============================================="

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 检查 Node.js
echo -e "${YELLOW}检查 Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ 未检测到 Node.js，请先安装 Node.js 18+${NC}"
    echo "下载地址：https://nodejs.org"
    exit 1
fi
NODE_VERSION=$(node -v)
echo -e "${GREEN}✅ Node.js: ${NODE_VERSION}${NC}"

# 检查 Python
echo -e "${YELLOW}检查 Python...${NC}"
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ 未检测到 Python，请先安装 Python 3.11+${NC}"
    echo "下载地址：https://www.python.org"
    exit 1
fi
PYTHON_VERSION=$(python3 --version)
echo -e "${GREEN}✅ ${PYTHON_VERSION}${NC}"

# 检查 Vercel CLI
echo -e "${YELLOW}检查 Vercel CLI...${NC}"
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️  Vercel CLI 未安装，正在安装...${NC}"
    npm install -g vercel
fi
VERCEL_VERSION=$(vercel --version)
echo -e "${GREEN}✅ Vercel CLI: ${VERCEL_VERSION}${NC}"

# 初始化前端
echo ""
echo -e "${YELLOW}📦 初始化前端...${NC}"
cd frontend
if [ ! -d "node_modules" ]; then
    npm install
    echo -e "${GREEN}✅ 前端依赖安装完成${NC}"
else
    echo -e "${GREEN}✅ 前端依赖已安装${NC}"
fi

if [ ! -f ".env.local" ]; then
    cp .env.example .env.local
    echo -e "${GREEN}✅ 前端环境变量文件已创建${NC}"
fi
cd ..

# 初始化后端
echo ""
echo -e "${YELLOW}📦 初始化后端...${NC}"
cd backend
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo -e "${GREEN}✅ Python 虚拟环境已创建${NC}"
else
    echo -e "${GREEN}✅ Python 虚拟环境已存在${NC}"
fi

source venv/bin/activate

if ! python -c "import anthropic" &> /dev/null; then
    pip install -r requirements.txt
    echo -e "${GREEN}✅ 后端依赖安装完成${NC}"
else
    echo -e "${GREEN}✅ 后端依赖已安装${NC}"
fi

deactivate

if [ ! -f ".env" ]; then
    cp .env.example .env
    echo -e "${GREEN}✅ 后端环境变量文件已创建${NC}"
    echo -e "${YELLOW}⚠️  请编辑 backend/.env 填入 Claude API Key${NC}"
fi
cd ..

# 完成
echo ""
echo -e "${GREEN}=============================================="
echo "✅ 项目初始化完成！"
echo -e "==============================================${NC}"
echo ""
echo "下一步操作："
echo ""
echo "1. 配置 Claude API Key"
echo "   编辑：backend/.env"
echo "   获取地址：https://console.anthropic.com"
echo ""
echo "2. 启动前端开发服务器"
echo "   cd frontend"
echo "   npm run dev"
echo "   访问：http://localhost:3000"
echo ""
echo "3. 启动后端开发服务器"
echo "   cd backend"
echo "   source venv/bin/activate"
echo "   vercel dev"
echo ""
echo "4. 查看 Day 1 检查清单"
echo "   打开：DAY1_CHECKLIST.md"
echo ""
echo -e "${YELLOW}=============================================="
echo "祝开发顺利！🎉"
echo -e "==============================================${NC}"
