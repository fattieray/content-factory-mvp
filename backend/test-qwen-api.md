# 测试 Qwen API

## 使用 curl 测试

```bash
curl --request POST \
  --url https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions \
  --header 'Authorization: Bearer sk-d40bda146c374d95a8098acff585b9f7' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "qwen-plus",
    "messages": [{"role": "user", "content": "你好，请介绍一下自己"}],
    "max_tokens": 200
  }'
```

## 预期响应

```json
{
  "choices": [
    {
      "message": {
        "content": "你好！我是 Qwen3.5..."
      }
    }
  ]
}
```

## 测试 Python 代码

```python
from openai import OpenAI

client = OpenAI(
    api_key="sk-d40bda146c374d95a8098acff585b9f7",
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
)

response = client.chat.completions.create(
    model="qwen-plus",
    messages=[{"role": "user", "content": "你好"}]
)

print(response.choices[0].message.content)
```
