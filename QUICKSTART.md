# 快速开始指南

## 前置准备

1. **Claude API Key**
   - 访问 https://console.anthropic.com
   - 注册账号并获取 API Key

2. **Node.js** (前端)
   - 版本要求：18.x 或更高
   - 下载地址：https://nodejs.org

3. **Python** (后端)
   - 版本要求：3.11 或更高
   - 下载地址：https://www.python.org

4. **Vercel CLI** (部署)
   ```bash
   npm install -g vercel
   ```

## 本地开发

### 前端

```bash
cd frontend

# 安装依赖
npm install

# 复制环境变量
cp .env.example .env.local

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

### 后端

```bash
cd backend

# 创建虚拟环境
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 安装依赖
pip install -r requirements.txt

# 复制环境变量
cp .env.example .env

# 编辑 .env 填入 Claude API Key

# 本地测试（需要 Vercel CLI）
vercel dev
```

## 部署

### 前端部署

```bash
cd frontend

# 登录 Vercel
vercel login

# 部署
vercel --prod
```

### 后端部署

后端已经配置为 Vercel Serverless Functions，部署前端时会自动部署。

## 环境变量配置

在 Vercel Dashboard 中配置以下环境变量：

- `CLAUDE_API_KEY` - Claude API 密钥
- `SUPABASE_URL` - Supabase 项目 URL（可选）
- `SUPABASE_KEY` - Supabase API 密钥（可选）

## 测试

### API 测试

```bash
# 测试分析接口
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"content": "文章内容..."}'

# 测试生成接口
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "sample_id": "xxx",
    "topic": "测试主题",
    "word_count": 2000
  }'
```

## 常见问题

### 1. Claude API 调用失败
- 检查 API Key 是否正确
- 检查网络连接
- 查看 API 额度是否充足

### 2. 前端无法连接后端
- 检查 VITE_API_URL 环境变量
- 确保后端服务已启动

### 3. 部署失败
- 检查 Vercel 项目配置
- 查看部署日志
- 确认环境变量已配置

## 下一步

1. 完成本地开发测试
2. 邀请种子用户体验
3. 收集反馈并迭代
4. 准备 V1.1 版本功能

## 支持

如有问题，请联系开发团队或查看文档：
- [MVP 产品文档](../MVP 产品文档/)
- [技术文档](../MVP 产品文档/04-技术方案.md)
