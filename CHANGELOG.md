# 内容工厂 MVP - 更新日志

## [0.1.1] - 2026-02-18

### Changed
- 🔧 AI 服务从 Claude API 切换到通义千问 Qwen API
- 📝 更新环境变量配置 (`QWEN_API_KEY`, `QWEN_BASE_URL`)
- 📦 更新依赖：`anthropic` → `openai`
- 📚 添加 Qwen API 配置文档

### Technical
- 使用 OpenAI 兼容接口调用 Qwen
- 模型默认使用 `qwen-plus`
- 保持原有功能逻辑不变

---

## [0.1.0] - 2026-02-18

### Added
- ✨ 初始版本发布
- 🎨 React + TypeScript 前端
- 🐍 Python + Vercel Serverless 后端
- 🤖 AI 内容生成功能
- 📊 5 层特征提取 (L1-L5)
