import os
import json
from typing import Dict, Any
import anthropic
from ..prompts import ANALYZE_PROMPT, GENERATE_PROMPT
from ..core.schemas import (
    StyleFeatures,
    L1Structure,
    L2Logic,
    L3Perspective,
    L4Expression,
    L5Material,
)


class ClaudeService:
    """Claude AI 服务"""

    def __init__(self):
        api_key = os.getenv("CLAUDE_API_KEY")
        if not api_key:
            raise ValueError("CLAUDE_API_KEY 未配置")
        self.client = anthropic.Anthropic(api_key=api_key)

    async def analyze_article(self, content: str) -> StyleFeatures:
        """分析文章特征"""
        prompt = ANALYZE_PROMPT.format(content=content)

        response = self.client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=2000,
            messages=[{"role": "user", "content": prompt}],
        )

        # 提取 JSON 内容
        content_text = response.content[0].text
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

        response = self.client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=4000,
            messages=[{"role": "user", "content": prompt}],
        )

        return response.content[0].text
