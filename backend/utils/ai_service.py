import os
import json
import sys
from typing import Dict, Any
from openai import OpenAI

# 支持直接运行和模块导入两种模式
try:
    from ..prompts import ANALYZE_PROMPT, GENERATE_PROMPT
    from ..core.schemas import (
        StyleFeatures,
        L1Structure,
        L2Logic,
        L3Perspective,
        L4Expression,
        L5Material,
    )
except ImportError:
    # 添加 backend 到路径
    backend_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    sys.path.insert(0, backend_path)
    from prompts import ANALYZE_PROMPT, GENERATE_PROMPT
    from core.schemas import (
        StyleFeatures,
        L1Structure,
        L2Logic,
        L3Perspective,
        L4Expression,
        L5Material,
    )


class QwenService:
    """通义千问 Qwen3.5 AI 服务"""

    def __init__(self):
        # Qwen API 配置
        api_key = os.getenv("QWEN_API_KEY")
        base_url = os.getenv(
            "QWEN_BASE_URL", "https://dashscope.aliyuncs.com/compatible-mode/v1"
        )

        if not api_key:
            raise ValueError("QWEN_API_KEY 未配置")

        # 使用 OpenAI 兼容接口
        self.client = OpenAI(api_key=api_key, base_url=base_url)

    async def analyze_article(self, content: str) -> StyleFeatures:
        """分析文章特征"""
        prompt = ANALYZE_PROMPT.format(content=content)

        response = self.client.chat.completions.create(
            model="qwen-plus",  # 或 qwen-turbo / qwen-max
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=2000,
        )

        # 提取 JSON 内容
        content_text = response.choices[0].message.content

        # 尝试提取 JSON
        json_start = content_text.find("{")
        json_end = content_text.rfind("}") + 1

        if json_start >= 0 and json_end > json_start:
            json_str = content_text[json_start:json_end]
            features_data = json.loads(json_str)

            return StyleFeatures(
                l1_structure=L1Structure(**features_data.get("l1_structure", {})),
                l2_logic=L2Logic(**features_data.get("l2_logic", {})),
                l3_perspective=L3Perspective(**features_data.get("l3_perspective", {})),
                l4_expression=L4Expression(**features_data.get("l4_expression", {})),
                l5_material=L5Material(**features_data.get("l5_material", {})),
            )
        else:
            raise ValueError("无法解析 AI 响应")

    async def generate_content(
        self,
        features: StyleFeatures,
        topic: str,
        key_points: str = "",
        word_count: int = 2000,
    ) -> str:
        """生成内容"""
        prompt = GENERATE_PROMPT.format(
            l1_structure=features.l1_structure.pattern if features.l1_structure else "",
            l2_logic=features.l2_logic.method if features.l2_logic else "",
            l3_perspective=features.l3_perspective.angle
            if features.l3_perspective
            else "",
            l4_expression=features.l4_expression.style
            if features.l4_expression
            else "",
            l5_material=", ".join(features.l5_material.types)
            if features.l5_material
            else "",
            topic=topic,
            key_points=key_points or "无特定要求",
            word_count=word_count,
        )

        response = self.client.chat.completions.create(
            model="qwen-plus",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=4000,
        )

        return response.choices[0].message.content
