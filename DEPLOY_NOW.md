# 🚀 快速部署指南

## 为什么看到 404 错误？

你访问的链接 `https://content-factory-mvp.vercel.app` 只是一个示例地址。项目还没有实际部署到 Vercel，所以会显示 404。

## 部署方式

有两种部署方式：

### 方式一：Vercel Dashboard 部署（推荐新手）

这是最简单的方式，不需要安装任何工具。

#### 步骤：

1. **访问 Vercel**
   - 打开 https://vercel.com
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "Add New Project"
   - 选择 "Import Git Repository"
   - 选择你的 GitHub 仓库
   
   **或者**
   
   - 选择 "Deploy" → "CLI" 手动上传（如果没有 Git 仓库）

3. **配置项目**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **配置环境变量**
   
   点击 "Environment Variables"，添加：
   
   ```
   QWEN_API_KEY=sk-d40bda146c374d95a8098acff585b9f7
   QWEN_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
   ```

5. **点击 Deploy**
   - 等待部署完成（约 2-5 分钟）
   - 部署成功后会显示访问链接

---

### 方式二：Vercel CLI 部署

适合熟悉命令行的开发者。

#### 1. 安装 Vercel CLI

```bash
npm install -g vercel
```

#### 2. 登录 Vercel

```bash
vercel login
```

会打开浏览器让你登录。

#### 3. 部署前端

```bash
cd /Users/xangwei/Documents/OpenCode/科技小老板的内容生产系统/content-factory-mvp/frontend

# 首次部署
vercel

# 按提示操作：
# - Set up and deploy? Y
# - Which scope? (选择你的账号)
# - Link to existing project? N
# - Project name? content-factory-mvp
# - Directory? ./
# - Override settings? N
```

#### 4. 配置环境变量

部署完成后，在 Vercel Dashboard 配置环境变量：

1. 访问 https://vercel.com/dashboard
2. 找到你的项目
3. Settings → Environment Variables
4. 添加环境变量
5. 重新部署

#### 5. 生产部署

```bash
vercel --prod
```

---

## 部署后访问

部署成功后，Vercel 会给你一个域名：

```
https://content-factory-mvp-xxx.vercel.app
```

**注意**: 域名会是随机的，可以在 Vercel Dashboard 中设置自定义域名。

---

## 本地测试（无需部署）

如果只是想测试功能，可以在本地运行：

### 前端

```bash
cd /Users/xangwei/Documents/OpenCode/科技小老板的内容生产系统/content-factory-mvp/frontend

# 安装依赖（如果还没安装）
npm install

# 启动开发服务器
npm run dev
```

访问：http://localhost:5173

### 后端测试

```bash
cd /Users/xangwei/Documents/OpenCode/科技小老板的内容生产系统/content-factory-mvp/backend

# 测试 AI 功能
python3 test-ai-simple.py

# 测试多版本生成
python3 test-multi-version.py
```

---

## 常见问题

### Q: 部署失败怎么办？

**检查步骤**:
1. 查看 Vercel 部署日志
2. 确认环境变量已配置
3. 检查本地构建是否成功 (`npm run build`)
4. 查看错误信息

### Q: 需要绑定自定义域名吗？

**不需要**。Vercel 提供的免费域名足够使用：
- `https://content-factory-mvp.vercel.app`
- 自动 HTTPS
- 全球 CDN 加速

如果需要自定义域名：
1. Settings → Domains
2. 添加你的域名
3. 配置 DNS

### Q: 部署后 API 调用失败？

**可能原因**:
1. 环境变量未配置
2. API Key 无效
3. 网络问题

**解决方案**:
1. 检查 Vercel 环境变量
2. 测试 API Key 是否有效
3. 查看 Vercel Functions 日志

---

## 部署检查清单

部署前确认：

- [ ] 已注册 Vercel 账号
- [ ] 已有 Qwen API Key
- [ ] 本地构建测试通过
- [ ] 环境变量已配置
- [ ] 测试了 API 调用

部署后验证：

- [ ] 可以访问前端页面
- [ ] 投喂样本功能正常
- [ ] 分析功能正常
- [ ] 生成功能正常
- [ ] 导出功能正常

---

## 成本说明

**Vercel 免费额度**:
- 带宽：100GB/月
- Serverless: 100 万小时/月
- 构建：6000 次/月

**MVP 阶段足够免费使用！**

**Qwen API 费用**:
- 约 ¥350/月（根据使用量）
- 新用户有免费额度

---

## 下一步

部署完成后：

1. 访问部署链接测试
2. 邀请种子用户体验
3. 收集反馈
4. 持续优化

---

**需要帮助？**

查看完整文档：
- [DEPLOYMENT.md](DEPLOYMENT.md) - 完整部署指南
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - 项目总结
- [README.md](README.md) - 项目说明

**部署时间**: 约 5-10 分钟  
**难度**: ⭐⭐ (简单)
