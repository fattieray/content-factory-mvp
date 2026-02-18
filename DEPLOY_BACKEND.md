# 🚀 后端 API 部署步骤

## 方式一：Vercel Dashboard 部署（推荐）

### 第 1 步：访问 Vercel

打开浏览器访问：**https://vercel.com/new**

### 第 2 步：创建项目

1. 点击 **"Add New Project"**
2. 选择 **"Import Third Party Git"** 或直接 **"Continue"**

### 第 3 步：上传后端代码

**如果没有 Git 仓库**：

1. 在 Vercel Dashboard 点击 **"Add New Project"**
2. 选择 **"Deploy"** 区域
3. 选择 **"CLI"** 或 **"Import Files"**
4. 将 `backend` 文件夹中的文件拖拽上传

**需要的文件**：
```
backend/
├── api/
│   ├── index.py
│   ├── analyze.py
│   ├── generate.py
│   └── __init__.py
├── core/
│   ├── config.py
│   ├── schemas.py
│   └── __init__.py
├── prompts/
│   ├── templates.py
│   └── __init__.py
├── utils/
│   ├── ai_service.py
│   └── __init__.py
├── db/
│   ├── client.py
│   ├── schema.sql
│   └── __init__.py
├── requirements.txt
└── vercel.json
```

### 第 4 步：配置项目

- **Framework Preset**: Other
- **Root Directory**: `backend`（如果上传的是整个 backend 文件夹）
- **Build Command**: 留空
- **Install Command**: `pip install -r requirements.txt`
- **Output Directory**: 留空

### 第 5 步：配置环境变量（重要！）

点击 **"Environment Variables"**，添加以下变量：

| Name | Value |
|------|-------|
| `QWEN_API_KEY` | `sk-d40bda146c374d95a8098acff585b9f7` |
| `QWEN_BASE_URL` | `https://dashscope.aliyuncs.com/compatible-mode/v1` |

### 第 6 步：点击 Deploy

等待部署完成（约 2-5 分钟）

### 第 7 步：获取 API 地址

部署成功后，Vercel 会显示：
```
https://your-project-name.vercel.app
```

你的 API 地址是：
```
https://your-project-name.vercel.app/api/analyze
https://your-project-name.vercel.app/api/generate
```

---

## 方式二：Vercel CLI 部署

如果 CLI 已经登录成功，执行：

```bash
cd /Users/xangwei/Documents/OpenCode/科技小老板的内容生产系统/content-factory-mvp/backend
vercel --prod
```

按提示操作：
- Set up and deploy? **Y**
- Which scope? (选择你的账号)
- Link to existing project? **N**
- Project name? **content-factory-backend**
- Directory? **./**
- Override settings? **N**

---

## 测试 API

部署完成后，测试 API：

```bash
# 替换为你的 Vercel 域名
curl -X POST https://your-project.vercel.app/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"content": "人工智能是未来技术发展的重要方向..."}'
```

---

## 常见问题

### Q: 部署失败？

**检查**：
1. 查看 Vercel 部署日志
2. 确认 `requirements.txt` 存在
3. 检查环境变量是否配置

### Q: API 返回 500 错误？

**可能原因**：
1. 环境变量未配置
2. API Key 无效
3. 网络问题

**解决**：
1. 检查 Vercel 环境变量
2. 查看 Functions 日志
3. 测试 API Key

---

**部署时间**: 约 5 分钟  
**难度**: ⭐⭐ (简单)
