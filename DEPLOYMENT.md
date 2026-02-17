# Day 6 部署准备 - 完整指南

## 部署到 Vercel

本项目使用 Vercel 进行部署，前后端都在 Vercel 上托管。

## 前置准备

1. **Vercel 账号**
   - 访问 https://vercel.com
   - 使用 GitHub 账号登录

2. **Qwen API Key**
   - 确保已有阿里云百炼 API Key
   - 地址：https://dashscope.console.aliyun.com

3. **Git 仓库**（可选）
   - 可以将代码推送到 GitHub
   - 方便 Vercel 自动部署

## 部署步骤

### 方式一：Vercel CLI 部署（推荐）

#### 1. 安装 Vercel CLI

```bash
npm install -g vercel
```

#### 2. 登录 Vercel

```bash
vercel login
```

#### 3. 部署后端

```bash
cd backend

# 首次部署
vercel --prod

# 按提示操作：
# - Set up and deploy? Y
# - Which scope? (选择你的账号)
# - Link to existing project? N
# - Project name? content-factory-mvp
# - Directory? ./
# - Override settings? N
```

#### 4. 配置环境变量

在 Vercel Dashboard 中配置以下环境变量：

```
QWEN_API_KEY=sk-d40bda146c374d95a8098acff585b9f7
QWEN_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
```

**配置方式**：
1. 访问 https://vercel.com/dashboard
2. 选择你的项目
3. Settings → Environment Variables
4. 添加环境变量
5. 重新部署

#### 5. 部署前端

```bash
cd frontend

# 首次部署
vercel --prod

# 配置构建：
# - Build Command: npm run build
# - Output Directory: dist
# - Install Command: npm install
```

### 方式二：Vercel Dashboard 部署

1. **导入项目**
   - 访问 https://vercel.com/new
   - 导入 Git 仓库或拖拽文件夹

2. **配置项目**
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **配置环境变量**
   - 添加 `QWEN_API_KEY`
   - 添加 `QWEN_BASE_URL`

4. **点击 Deploy**

## 部署后验证

### 1. 访问前端

```
https://your-project.vercel.app
```

### 2. 测试 API

```bash
# 替换为你的 Vercel 域名
curl -X POST https://your-project.vercel.app/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"content": "测试文章内容..."}'
```

### 3. 检查日志

在 Vercel Dashboard 查看：
- Functions → Logs
- 查看 API 调用日志

## 自定义域名（可选）

1. **在 Vercel 配置域名**
   - Settings → Domains
   - 添加你的域名

2. **配置 DNS**
   ```
   类型    名称    值
   A       @       76.76.21.21
   CNAME   www     cname.vercel-dns.com
   ```

3. **等待 DNS 生效**（通常几分钟到几小时）

## 性能优化

### 1. 启用缓存

Vercel 自动启用 CDN 缓存，静态资源会自动缓存到全球节点。

### 2. 配置缓存策略

在 `vercel.json` 中添加：

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 3. 优化 API 响应

- 使用 Serverless Functions 的缓存功能
- 考虑添加 Redis 缓存（可使用 Upstash）

## 监控和日志

### 1. Vercel Analytics

在 Vercel Dashboard 启用 Analytics：
- 访问速度监控
- 用户行为分析
- 错误追踪

### 2. 错误监控

建议集成 Sentry：

```bash
cd frontend
npm install @sentry/react
```

配置：

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production",
});
```

## 常见问题

### Q: 部署失败怎么办？

**检查步骤**：
1. 查看 Vercel 部署日志
2. 检查环境变量是否配置
3. 本地运行 `vercel dev` 测试
4. 检查 API Key 是否有效

### Q: API 调用超时？

**解决方案**：
1. 在 `vercel.json` 中增加超时时间
2. 优化 Prompt 长度
3. 考虑使用 qwen-turbo 模型（更快）

```json
{
  "functions": {
    "api/*.py": {
      "maxDuration": 60
    }
  }
}
```

### Q: 前端无法调用后端 API？

**检查**：
1. API 地址是否正确
2. CORS 配置是否正确
3. 检查浏览器控制台错误

## 部署检查清单

部署前确认：

- [ ] Qwen API Key 已配置
- [ ] 环境变量已添加到 Vercel
- [ ] 本地构建测试通过
- [ ] 测试了 API 调用
- [ ] 测试了完整流程
- [ ] 配置了错误监控（可选）
- [ ] 准备了自定义域名（可选）

## 部署后任务

- [ ] 访问前端页面测试
- [ ] 测试完整功能流程
- [ ] 检查 API 日志
- [ ] 监控错误率
- [ ] 收集用户反馈
- [ ] 准备迭代优化

## 成本估算

**Vercel 免费额度**：
- 带宽：100GB/月
- Serverless 执行时间：100 万小时/月
- 构建次数：6000 次/月

**MVP 阶段成本**：
- Vercel: $0（免费额度足够）
- Qwen API: ~¥350/月（根据使用量）
- 总计：~¥350/月

## 下一步

部署完成后：
1. 邀请种子用户体验
2. 收集反馈
3. 持续优化
4. 准备 V1.1 版本

---

**部署文档版本**: v1.0  
**更新时间**: 2026-02-18
