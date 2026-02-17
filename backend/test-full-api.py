#!/usr/bin/env python3
"""
本地测试后端 API
"""

import sys
import os
import json

# 添加 backend 到路径
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from dotenv import load_dotenv

load_dotenv()


async def test_analyze_api():
    """测试分析接口"""
    import sys

    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

    from api.analyze import analyze_handler
    from core.schemas import AnalyzeRequest

    # 测试文章
    test_content = """
人工智能是未来技术发展的重要方向。作为一名在 AI 行业深耕多年的从业者，我想分享一些对这个行业的思考。

首先，人工智能的发展速度超出了所有人的预期。从深度学习兴起至今，短短十年间，AI 已经从实验室走向了千行百业。无论是医疗、金融，还是制造、交通，都能看到 AI 的身影。

其次，大模型的出现标志着 AI 进入了一个新阶段。GPT、Claude、通义千问等模型的出现，让我们看到了通用人工智能的曙光。这些模型不仅能够完成语言理解、生成等任务，还能进行逻辑推理、编程等复杂操作。

然而，AI 的发展也面临着挑战。算力瓶颈、数据隐私、伦理问题等都需要我们认真思考和解决。作为从业者，我们既要拥抱技术变革，也要承担起社会责任。

最后，我想说，人工智能的未来是光明的，但道路是曲折的。需要我们共同努力，才能让 AI 真正造福人类。
"""

    print("=" * 60)
    print("📝 测试分析接口")
    print("=" * 60)

    try:
        request = AnalyzeRequest(content=test_content)
        result = await analyze_handler(request)

        if result.success:
            print("\n✅ 分析成功！")
            print(f"\n📊 样本 ID: {result.data['sample_id']}")
            print(f"\n📊 字数：{result.data['word_count']}")
            print(f"\n📊 特征提取结果:")

            features = result.data["features"]
            for key, value in features.items():
                if value:
                    print(f"\n  {key}:")
                    if isinstance(value, dict):
                        for k, v in value.items():
                            print(f"    • {k}: {v}")
                    elif isinstance(value, list):
                        print(f"    • {', '.join(value)}")

            return result.data
        else:
            print(f"\n❌ 分析失败：{result.error}")
            return None

    except Exception as e:
        print(f"\n❌ 错误：{str(e)}")
        import traceback

        traceback.print_exc()
        return None


async def test_generate_api(sample_id: str):
    """测试生成接口"""
    import sys

    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

    from api.generate import generate_handler
    from core.schemas import GenerationRequest

    print("\n" + "=" * 60)
    print("✍️  测试生成接口")
    print("=" * 60)

    try:
        request = GenerationRequest(
            sample_id=sample_id,
            topic="创业公司如何吸引和留住优秀人才",
            key_points="价值观匹配，成长空间，股权激励",
            word_count=1500,
        )

        print(f"\n📝 主题：{request.topic}")
        print(f"📝 要点：{request.key_points}")
        print(f"📝 字数：{request.word_count}")

        result = await generate_handler(request)

        if result.success:
            print(f"\n✅ 生成成功！")
            print(f"\n📊 文章 ID: {result.data['id']}")
            print(f"📊 字数：{result.data['word_count']}")
            print(f"\n📄 文章内容预览:")
            print("-" * 60)
            content = result.data["content"]
            # 显示前 500 字
            preview = content[:500] + "..." if len(content) > 500 else content
            print(preview)
            print("-" * 60)

            return result.data
        else:
            print(f"\n❌ 生成失败：{result.error}")
            return None

    except Exception as e:
        print(f"\n❌ 错误：{str(e)}")
        import traceback

        traceback.print_exc()
        return None


async def main():
    """主函数"""
    print("\n🚀 内容工厂 MVP - API 测试")
    print("=" * 60)

    # 测试分析接口
    analyze_result = await test_analyze_api()

    if analyze_result:
        # 测试生成接口
        await test_generate_api(analyze_result["sample_id"])

    print("\n" + "=" * 60)
    print("✅ 测试完成！")
    print("=" * 60 + "\n")


if __name__ == "__main__":
    import asyncio

    asyncio.run(main())
