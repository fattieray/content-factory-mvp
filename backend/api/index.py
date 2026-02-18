"""
Vercel Serverless API Entry Point
通义千问 AI 内容工厂
"""

import os
import json
import uuid
from datetime import datetime
from typing import Dict, Any, Optional

from openai import OpenAI

# === 配置 ===
QWEN_API_KEY = os.getenv("QWEN_API_KEY")
QWEN_BASE_URL = os.getenv(
    "QWEN_BASE_URL", "https://dashscope.aliyuncs.com/compatible-mode/v1"
)

# 初始化 AI 客户端
client = OpenAI(api_key=QWEN_API_KEY, base_url=QWEN_BASE_URL)

# 内存数据库（MVP 简化）
samples_db: Dict[str, Dict[str, Any]] = {}
generations_db: Dict[str, Dict[str, Any]] = {}

# === Prompts ===
ANALYZE_PROMPT = """分析以下文章的特征，提取 5 个层次的特征：

文章内容：
{content}

请以 JSON 格式返回，包含以下结构：
{{
  "l1_structure": {{"pattern": "结构模式", "description": "结构描述"}},
  "l2_logic": {{"method": "逻辑方法", "description": "逻辑描述"}},
  "l3_perspective": {{"angle": "视角定位", "description": "视角描述"}},
  "l4_expression": {{"style": "表达风格", "description": "风格描述"}},
  "l5_material": {{"types": ["素材类型"], "description": "素材描述"}}
}}"""

GENERATE_PROMPT = """根据以下风格特征，生成一篇新文章：

【风格特征】
- 结构模式：{l1_structure}
- 逻辑方法：{l2_logic}
- 视角定位：{l3_perspective}
- 表达风格：{l4_expression}
- 素材类型：{l5_material}

【生成要求】
- 主题：{topic}
- 要点：{key_points}
- 字数：约{word_count}字

请生成符合上述风格特征的文章内容。"""


# === 工具函数 ===
def json_response(
    success: bool, data: Any = None, error: Optional[Dict] = None
) -> Dict:
    """构建 JSON 响应"""
    return {
        "statusCode": 200 if success else (400 if error else 500),
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({"success": success, "data": data, "error": error}),
    }


def call_qwen(messages: list, temperature: float = 0.7) -> str:
    """调用 Qwen API"""
    response = client.chat.completions.create(
        model="qwen-plus",
        messages=messages,
        temperature=temperature,
        max_tokens=4000,
    )
    return response.choices[0].message.content


# === API Handlers ===
def analyze_article(content: str) -> Dict:
    """分析文章特征"""
    try:
        prompt = ANALYZE_PROMPT.format(content=content)
        response_text = call_qwen([{"role": "user", "content": prompt}])

        # 提取 JSON
        json_start = response_text.find("{")
        json_end = response_text.rfind("}") + 1
        if json_start >= 0 and json_end > json_start:
            features = json.loads(response_text[json_start:json_end])
        else:
            features = {}

        # 存储样本
        sample_id = str(uuid.uuid4())
        samples_db[sample_id] = {
            "id": sample_id,
            "content": content,
            "word_count": len(content),
            "features": features,
            "created_at": datetime.now().isoformat(),
        }

        return json_response(
            True,
            {
                "sample_id": sample_id,
                "features": features,
                "word_count": len(content),
            },
        )
    except Exception as e:
        return json_response(False, error={"code": "ANALYZE_ERROR", "message": str(e)})


def generate_content(
    sample_id: str, topic: str, key_points: str = "", word_count: int = 2000
) -> Dict:
    """生成内容"""
    try:
        # 获取样本
        sample = samples_db.get(sample_id)
        if not sample:
            return json_response(
                False, error={"code": "SAMPLE_NOT_FOUND", "message": "样本不存在"}
            )

        features = sample.get("features", {})

        # 生成文章
        prompt = GENERATE_PROMPT.format(
            l1_structure=features.get("l1_structure", {}).get("pattern", ""),
            l2_logic=features.get("l2_logic", {}).get("method", ""),
            l3_perspective=features.get("l3_perspective", {}).get("angle", ""),
            l4_expression=features.get("l4_expression", {}).get("style", ""),
            l5_material=", ".join(features.get("l5_material", {}).get("types", [])),
            topic=topic,
            key_points=key_points or "无特定要求",
            word_count=word_count,
        )

        content = call_qwen([{"role": "user", "content": prompt}], temperature=0.7)

        # 存储生成记录
        generation_id = str(uuid.uuid4())
        generations_db[generation_id] = {
            "id": generation_id,
            "topic": topic,
            "content": content,
            "word_count": len(content),
            "created_at": datetime.now().isoformat(),
        }

        return json_response(
            True,
            {
                "id": generation_id,
                "topic": topic,
                "content": content,
                "word_count": len(content),
            },
        )
    except Exception as e:
        return json_response(False, error={"code": "GENERATE_ERROR", "message": str(e)})


def get_samples() -> Dict:
    """获取样本列表"""
    try:
        samples_list = list(samples_db.values())
        samples_list.sort(key=lambda x: x["created_at"], reverse=True)
        return json_response(True, samples_list)
    except Exception as e:
        return json_response(
            False, error={"code": "GET_SAMPLES_ERROR", "message": str(e)}
        )


def get_generations() -> Dict:
    """获取生成历史"""
    try:
        generations_list = list(generations_db.values())
        generations_list.sort(key=lambda x: x["created_at"], reverse=True)
        return json_response(True, generations_list)
    except Exception as e:
        return json_response(
            False, error={"code": "GET_GENERATIONS_ERROR", "message": str(e)}
        )


# === Vercel Serverless Handler ===
def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """Vercel Serverless 入口函数"""

    # 解析请求
    path = event.get("path", "")
    method = event.get("method", "GET")

    # 解析 body
    body = {}
    body_str = event.get("body", "")
    if body_str and isinstance(body_str, str):
        try:
            body = json.loads(body_str)
        except:
            body = {}

    # 路由分发
    if path == "/api/analyze" and method == "POST":
        content = body.get("content", "")
        if not content:
            return json_response(
                False, error={"code": "INVALID_INPUT", "message": "content 不能为空"}
            )
        return analyze_article(content)

    elif path == "/api/generate" and method == "POST":
        sample_id = body.get("sample_id", "")
        topic = body.get("topic", "")
        key_points = body.get("key_points", "")
        word_count = body.get("word_count", 2000)
        if not sample_id or not topic:
            return json_response(
                False,
                error={
                    "code": "INVALID_INPUT",
                    "message": "sample_id 和 topic 不能为空",
                },
            )
        return generate_content(sample_id, topic, key_points, word_count)

    elif path == "/api/samples" and method == "GET":
        return get_samples()

    elif path == "/api/generations" and method == "GET":
        return get_generations()

    else:
        return {
            "statusCode": 404,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps(
                {
                    "success": False,
                    "error": {"code": "NOT_FOUND", "message": "接口不存在"},
                }
            ),
        }
