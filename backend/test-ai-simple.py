#!/usr/bin/env python3
"""
简化版 API 测试 - 直接测试 AI 服务
"""

import sys
import os
import asyncio

# 添加 backend 到路径
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from dotenv import load_dotenv

load_dotenv()


async def test_qwen_analyze():
    """测试 Qwen 分析功能"""
    from utils.ai_service import QwenService

    test_content = """
人工智能是未来技术发展的重要方向。作为一名在 AI 行业深耕多年的从业者，我想分享一些对这个行业的思考。

首先，人工智能的发展速度超出了所有人的预期。从深度学习兴起至今，短短十年间，AI 已经从实验室走向了千行百业。

其次，大模型的出现标志着 AI 进入了一个新阶段。GPT、Claude、通义千问等模型的出现，让我们看到了通用人工智能的曙光。

然而，AI 的发展也面临着挑战。算力瓶颈、数据隐私、伦理问题等都需要我们认真思考和解决。

最后，我想说，人工智能的未来是光明的，但道路是曲折的。需要我们共同努力，才能让 AI 真正造福人类。
"""

    print("=" * 60)
    print("📝 测试文章特征分析")
    print("=" * 60)
    print(f"\n📄 文章字数：{len(test_content)}")

    try:
        ai_service = QwenService()
        print("\n🔄 正在调用 Qwen API 分析文章...")

        features = await ai_service.analyze_article(test_content)

        print("\n✅ 分析成功！\n")
        print("📊 特征提取结果:")
        print("-" * 60)

        if features.l1_structure:
            print(f"\nL1 结构层：{features.l1_structure.pattern}")
            print(f"  描述：{features.l1_structure.description}")

        if features.l2_logic:
            print(f"\nL2 逻辑层：{features.l2_logic.method}")
            print(f"  描述：{features.l2_logic.description}")

        if features.l3_perspective:
            print(f"\nL3 视角层：{features.l3_perspective.angle}")
            print(f"  描述：{features.l3_perspective.description}")

        if features.l4_expression:
            print(f"\nL4 表达层：{features.l4_expression.style}")
            print(f"  描述：{features.l4_expression.description}")

        if features.l5_material:
            print(f"\nL5 素材层：{', '.join(features.l5_material.types)}")
            print(f"  描述：{features.l5_material.description}")

        print("\n" + "=" * 60)
        return features

    except Exception as e:
        print(f"\n❌ 分析失败：{str(e)}")
        import traceback

        traceback.print_exc()
        return None


async def test_qwen_generate(features):
    """测试 Qwen 内容生成"""
    from utils.ai_service import QwenService

    print("\n" + "=" * 60)
    print("✍️  测试内容生成")
    print("=" * 60)

    topic = "创业公司如何吸引和留住优秀人才"
    key_points = "价值观匹配，成长空间，股权激励"

    print(f"\n📝 主题：{topic}")
    print(f"📝 要点：{key_points}")

    try:
        ai_service = QwenService()
        print("\n🔄 正在调用 Qwen API 生成内容...")

        content = await ai_service.generate_content(
            features=features, topic=topic, key_points=key_points, word_count=800
        )

        print(f"\n✅ 生成成功！")
        print(f"\n📄 生成内容预览:")
        print("-" * 60)
        # 显示前 300 字
        preview = content[:300] + "..." if len(content) > 300 else content
        print(preview)
        print("-" * 60)
        print(f"\n📊 总字数：{len(content)}")

        return content

    except Exception as e:
        print(f"\n❌ 生成失败：{str(e)}")
        import traceback

        traceback.print_exc()
        return None


async def main():
    """主函数"""
    print("\n🚀 内容工厂 MVP - Qwen AI 功能测试")
    print("=" * 60)

    # 测试分析
    features = await test_qwen_analyze()

    if features:
        # 测试生成
        await test_qwen_generate(features)

    print("\n✅ 测试完成！\n")


if __name__ == "__main__":
    asyncio.run(main())
