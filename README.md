# 企业家个人 IP 智能内容工厂 - MVP

> AI 驱动的个人品牌内容生成工具

## 项目结构

```
content-factory-mvp/
├── frontend/          # React 前端 (Vercel 托管)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   └── styles/
│   └── package.json
│
└── backend/           # Python API (Vercel Serverless)
    ├── api/
    │   ├── analyze.py
    │   ├── generate.py
    │   └── samples.py
    ├── core/
    ├── prompts/
    └── requirements.txt
```

## 快速开始

### 前端开发

```bash
cd frontend
npm install
npm run dev
```

### 后端开发

```bash
cd backend
pip install -r requirements.txt
vercel dev
```

## 环境变量

需要配置以下环境变量：

- `QWEN_API_KEY` - 通义千问 API 密钥（获取：https://dashscope.console.aliyun.com/）
- `QWEN_BASE_URL` - Qwen API 基础 URL（默认：https://dashscope.aliyuncs.com/compatible-mode/v1）
- `SUPABASE_URL` - Supabase 项目 URL（可选）
- `SUPABASE_KEY` - Supabase API 密钥（可选）

## 技术栈

**前端**
- React 18 + TypeScript
- Vite
- Tailwind CSS

**后端**
- Python 3.11
- FastAPI
- Vercel Serverless

**AI**
- 通义千问 API (Qwen3.5 / qwen-plus)

**数据库**
- Supabase (PostgreSQL)

## 开发计划

- Day 1: 环境准备
- Day 2-3: 后端开发
- Day 4-5: 前端开发
- Day 6: 联调测试
- Day 7: 部署上线

## 许可证

MIT
