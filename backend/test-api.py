#!/usr/bin/env python3
"""
测试 Qwen API 连接
"""

import sys
import os

# 添加 backend 到路径
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from dotenv import load_dotenv

load_dotenv()


def test_qwen_api():
    """测试 Qwen API 连接"""
    try:
        from openai import OpenAI

        api_key = os.getenv("QWEN_API_KEY")
        base_url = os.getenv("QWEN_BASE_URL")

        if not api_key:
            print("❌ 错误：QWEN_API_KEY 未配置")
            return False

        print(f"✅ API Key 已配置：{api_key[:10]}...")
        print(f"✅ Base URL: {base_url}")

        client = OpenAI(api_key=api_key, base_url=base_url)

        print("\n🔄 正在测试 API 连接...")

        response = client.chat.completions.create(
            model="qwen-plus",
            messages=[{"role": "user", "content": "你好，请用一句话介绍你自己"}],
            max_tokens=100,
        )

        content = response.choices[0].message.content
        print(f"\n✅ API 调用成功！")
        print(f"📝 响应：{content}\n")

        return True

    except Exception as e:
        print(f"\n❌ API 调用失败：{str(e)}\n")
        print("请检查:")
        print("1. API Key 是否正确")
        print("2. 网络连接是否正常")
        print("3. 阿里云账号是否有可用额度")
        return False


if __name__ == "__main__":
    success = test_qwen_api()
    sys.exit(0 if success else 1)
