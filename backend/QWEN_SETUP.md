# 通义千问 Qwen API 配置

## 获取 API Key

1. 访问阿里云百炼平台：https://dashscope.console.aliyun.com/
2. 登录/注册阿里云账号
3. 进入「API-KEY 管理」页面
4. 创建新的 API Key
5. 复制 Key 到 `.env` 文件

## API 模型

推荐使用以下模型：

| 模型 | 说明 | 适用场景 |
|------|------|----------|
| qwen-plus | 性能均衡 | 推荐用于内容生成 |
| qwen-turbo | 速度快 | 快速测试 |
| qwen-max | 最强性能 | 复杂任务 |

## 环境变量

```bash
# .env
QWEN_API_KEY=sk-xxxxxxxxxxxxx
QWEN_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
```

## 测试 API

```bash
curl --request POST \
  --url https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions \
  --header 'Authorization: Bearer sk-xxxxxxxxxxxxx' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "qwen-plus",
    "messages": [{"role": "user", "content": "Hello"}],
    "max_tokens": 100
  }'
```

## 价格参考

- qwen-turbo: ¥0.002 / 1K tokens
- qwen-plus: ¥0.004 / 1K tokens  
- qwen-max: ¥0.02 / 1K tokens

**注意**: 首次开通有免费额度

## 文档链接

- [阿里云百炼文档](https://help.aliyun.com/zh/dashscope/)
- [Qwen API 参考](https://help.aliyun.com/zh/dashscope/developer-reference/api-reference)
