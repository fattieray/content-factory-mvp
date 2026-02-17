# Day 1: 环境准备 - 检查清单

## ✅ 已完成

- [x] 项目脚手架创建
- [x] 环境变量配置文件创建
- [x] 清理错误目录

## 📋 今日任务

### 1. 申请 Claude API Key (预计 10 分钟)

**步骤**：
1. 访问 https://console.anthropic.com
2. 注册/登录账号
3. 进入 API Keys 页面
4. 创建新的 API Key
5. 复制 Key 到 `backend/.env` 文件

**验证**：
```bash
curl --request POST \
  --url https://api.anthropic.com/v1/messages \
  --header 'x-api-key: sk-ant-api03-xxxxxxxxxxxxx' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "claude-3-5-sonnet-20241022",
    "max_tokens": 100,
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

### 2. 安装前端依赖 (预计 5 分钟)

**命令**：
```bash
cd frontend
npm install
```

**验证**：
```bash
npm run dev
# 访问 http://localhost:3000
```

**预期结果**：
- ✅ 看到内容工厂首页
- ✅ 无控制台错误

### 3. 安装后端依赖 (预计 5 分钟)

**命令**：
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

**验证**：
```bash
python -c "import anthropic; print('OK')"
```

### 4. 安装 Vercel CLI (预计 3 分钟)

**命令**：
```bash
npm install -g vercel
```

**验证**：
```bash
vercel --version
```

### 5. 配置 Vercel 项目 (预计 10 分钟)

**步骤**：
```bash
# 后端
cd backend
vercel login
vercel link --project content-factory-mvp

# 前端
cd ../frontend
vercel link --project content-factory-mvp
```

**配置环境变量**：
在 Vercel Dashboard 中添加：
- `CLAUDE_API_KEY` - 你的 Claude API Key
- `SUPABASE_URL` - (可选)
- `SUPABASE_KEY` - (可选)

### 6. 本地测试后端 (预计 15 分钟)

**命令**：
```bash
cd backend
source venv/bin/activate
vercel dev
```

**测试 API**：
```bash
# 新开终端
curl -X POST http://localhost:3001/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"content": "测试文章内容..."}'
```

---

## 🎯 今日验收标准

- [ ] Claude API Key 配置完成
- [ ] 前端可以正常启动
- [ ] 后端可以正常启动
- [ ] Vercel CLI 安装完成
- [ ] 能够调用 Claude API

---

## ⚠️ 常见问题

### 1. Node.js 版本过低
**错误**: `ERR_UNSUPPORTED_NODE_VERSION`
**解决**: 升级到 Node.js 18+
```bash
nvm install 20
nvm use 20
```

### 2. Python 版本过低
**错误**: `ModuleNotFoundError`
**解决**: 使用 Python 3.11+
```bash
python3 --version  # 应该 >= 3.11
```

### 3. Claude API 调用失败
**检查**:
- API Key 是否正确
- 是否有可用额度
- 网络连接是否正常

---

## 📝 进度记录

| 时间 | 任务 | 状态 | 备注 |
|------|------|------|------|
|      | Claude API 申请 | ⏳ | |
|      | 前端依赖安装 | ⏳ | |
|      | 后端依赖安装 | ⏳ | |
|      | Vercel CLI 安装 | ⏳ | |
|      | 本地测试 | ⏳ | |

---

**开始时间**: ____:____  
**结束时间**: ____:____  
**负责人**: _______
