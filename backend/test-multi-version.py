#!/usr/bin/env python3
"""
Day 3: 多版本生成测试
"""

import sys
import os
import asyncio

# 添加 backend 到路径
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from dotenv import load_dotenv

load_dotenv()


async def test_multi_version_generation():
    """测试多版本生成"""
    from utils.ai_service import QwenService

    # 特征数据（模拟已分析的样本）
    from core.schemas import (
        StyleFeatures,
        L1Structure,
        L2Logic,
        L3Perspective,
        L4Expression,
        L5Material,
    )

    features = StyleFeatures(
        l1_structure=L1Structure(
            pattern="总分总 + 起承转合",
            description="观点引入—事实展开—矛盾揭示—价值收束",
        ),
        l2_logic=L2Logic(method="演绎法 + 对比论证", description="线性推进与关键转折"),
        l3_perspective=L3Perspective(
            angle="一线从业者视角", description="技术乐观与清醒审慎并存"
        ),
        l4_expression=L4Expression(
            style="理性白话风", description="凝练庄重，有宣言式节奏感"
        ),
        l5_material=L5Material(
            types=["行业共识性事实", "代表性技术案例", "宏观趋势判断"],
            description="素材精炼且具公信力",
        ),
    )

    topic = "AI 时代，产品经理的核心竞争力是什么"
    key_points = "技术理解力，用户洞察，商业敏感度"

    print("=" * 60)
    print("🎨 测试多版本生成")
    print("=" * 60)
    print(f"\n📝 主题：{topic}")
    print(f"📝 要点：{key_points}")
    print()

    # 定义 4 个版本的风格权重
    versions = [
        {
            "name": "版本 1 - 专业深沉型",
            "style": "更加专业、理性，强调数据和技术深度",
            "temperature": 0.5,
        },
        {
            "name": "版本 2 - 平衡型",
            "style": "平衡专业性和可读性，适合大众传播",
            "temperature": 0.7,
        },
        {
            "name": "版本 3 - 个人风格型",
            "style": "强化个人视角和独特观点，更有辨识度",
            "temperature": 0.8,
        },
        {
            "name": "版本 4 - 创意探索型",
            "style": "更具创意和突破性，尝试新颖表达",
            "temperature": 0.9,
        },
    ]

    ai_service = QwenService()

    for i, version in enumerate(versions, 1):
        print(f"\n{'=' * 60}")
        print(f"📄 生成 {version['name']}")
        print(f"   风格：{version['style']}")
        print(f"   Temperature: {version['temperature']}")
        print("=" * 60)

        try:
            # 使用不同的 temperature 生成不同风格
            prompt = f"""你是一位专业的内容创作者。请根据以下风格特征，围绕指定主题创作一篇文章。

**风格特征**：
- L1 结构：{features.l1_structure.pattern} - {features.l1_structure.description}
- L2 逻辑：{features.l2_logic.method} - {features.l2_logic.description}
- L3 视角：{features.l3_perspective.angle} - {features.l3_perspective.description}
- L4 表达：{features.l4_expression.style} - {features.l4_expression.description}
- L5 素材：{", ".join(features.l5_material.types)} - {features.l5_material.description}

**特殊要求**：{version["style"]}

**创作要求**：
- 主题：{topic}
- 核心要点：{key_points}
- 目标字数：600 字左右

请创作一篇完整文章，包含标题和正文。"""

            response = ai_service.client.chat.completions.create(
                model="qwen-plus",
                messages=[{"role": "user", "content": prompt}],
                temperature=version["temperature"],
                max_tokens=1500,
            )

            content = response.choices[0].message.content

            print(f"\n✅ 生成成功！")
            print(f"\n📄 内容预览:")
            print("-" * 60)
            preview = content[:200] + "..." if len(content) > 200 else content
            print(preview)
            print("-" * 60)
            print(f"📊 字数：{len(content)}")

        except Exception as e:
            print(f"\n❌ 生成失败：{str(e)}")

        # 避免 API 限流
        await asyncio.sleep(1)

    print("\n" + "=" * 60)
    print("✅ 多版本生成测试完成！")
    print("=" * 60)


if __name__ == "__main__":
    asyncio.run(test_multi_version_generation())
