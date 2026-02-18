# 05-API 接口文档

> 企业家个人 IP 智能内容工厂 - API 接口定义

---

## 一、接口概览

### 1.1 基础信息

| 项目 | 说明 |
|------|------|
| Base URL | https://api.content-factory.com |
| 认证方式 | Bearer Token |
| 数据格式 | JSON |
| 字符编码 | UTF-8 |

### 1.2 公共响应格式

```json
{
  "success": true,
  "data": {},
  "error": null,
  "timestamp": "2026-02-17T12:00:00Z"
}
```

---

## 二、认证接口

### 2.1 用户登录

**POST** `/api/auth/login`

**请求**：
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expires_in": 604800
  }
}
```

---

## 三、核心接口

### 3.1 分析文章特征

**POST** `/api/analyze`

**请求头**：
```
Authorization: Bearer {token}
```

**请求体**：
```json
{
  "content": "文章内容...",
  "word_limit": {
    "min": 1000,
    "max": 5000
  }
}
```

**响应**：
```json
{
  "success": true,
  "data": {
    "sample_id": "550e8400-e29b-41d4-a716-446655440000",
    "features": {
      "L1_structure": {
        "type": "五段式",
        "description": "痛点→分析→归因→方法论→金句"
      },
      "L2_logic": {
        "type": "归纳法 + 对比论证",
        "description": "先列举现象，再归纳本质"
      },
      "L3_perspective": {
        "type": "反共识",
        "description": "从相反角度切入问题"
      },
      "L4_expression": {
        "type": "短句为主",
        "description": "疑问句开场，善用排比"
      },
      "L5_material": {
        "types": ["案例", "数据", "引用"],
        "description": "多用名人案例和研究报告"
      }
    },
    "word_count": 2500,
    "created_at": "2026-02-17T12:00:00Z"
  }
}
```

**错误响应**：
```json
{
  "success": false,
  "error": {
    "code": "CONTENT_TOO_SHORT",
    "message": "文章内容至少 1000 字"
  }
}
```

---

### 3.2 生成文章

**POST** `/api/generate`

**请求体**：
```json
{
  "sample_id": "550e8400-e29b-41d4-a716-446655440000",
  "topic": "如何打造一支自驱动的团队",
  "version_strategy": "balanced",
  "word_count": 2000
}
```

**参数说明**：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| sample_id | string | 是 | 样本 ID |
| topic | string | 是 | 生成主题 |
| version_strategy | string | 否 | 版本策略 |
| word_count | number | 否 | 目标字数 |

**version_strategy 可选值**：

| 值 | 说明 |
|------|------|
| professional | 专业深沉型 |
| balanced | 平衡型 |
| personal | 个人风格型 |
| creative | 创意探索型 |

**响应**：
```json
{
  "success": true,
  "data": {
    "generation_id": "550e8400-e29b-41d4-a716-446655440001",
    "versions": [
      {
        "version": 1,
        "type": "professional",
        "content": "文章内容...",
        "word_count": 2050
      },
      {
        "version": 2,
        "type": "balanced",
        "content": "文章内容...",
        "word_count": 1980
      },
      {
        "version": 3,
        "type": "personal",
        "content": "文章内容...",
        "word_count": 2100
      },
      {
        "version": 4,
        "type": "creative",
        "content": "文章内容...",
        "word_count": 1950
      }
    ],
    "created_at": "2026-02-17T12:00:00Z"
  }
}
```

---

### 3.3 获取历史记录

**GET** `/api/history`

**查询参数**：

| 参数 | 类型 | 说明 |
|------|------|------|
| page | number | 页码，默认 1 |
| page_size | number | 每页数量，默认 20 |

**响应**：
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "generation_id": "uuid",
        "topic": "如何打造自驱动团队",
        "selected_version": 2,
        "created_at": "2026-02-17T12:00:00Z"
      }
    ],
    "total": 50,
    "page": 1,
    "page_size": 20
  }
}
```

---

## 四、错误码

| 错误码 | 说明 | HTTP 状态码 |
|--------|------|-----------|
| CONTENT_TOO_SHORT | 内容太短 | 400 |
| CONTENT_TOO_LONG | 内容太长 | 400 |
| INVALID_SAMPLE_ID | 样本 ID 无效 | 404 |
| GENERATION_FAILED | 生成失败 | 500 |
| RATE_LIMIT_EXCEEDED | 超过限流 | 429 |
| UNAUTHORIZED | 未授权 | 401 |

---

*API 接口文档 - 最后更新：2026 年 2 月*
