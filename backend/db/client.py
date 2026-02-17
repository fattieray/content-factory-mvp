"""
Supabase 数据库客户端
"""

import os
from supabase import create_client, Client
from typing import Optional, List, Dict, Any
from datetime import datetime


class DatabaseClient:
    """Supabase 数据库客户端"""

    def __init__(self):
        supabase_url = os.getenv("SUPABASE_URL")
        supabase_key = os.getenv("SUPABASE_KEY")

        if supabase_url and supabase_key:
            self.client: Optional[Client] = create_client(supabase_url, supabase_key)
            self.enabled = True
        else:
            self.client = None
            self.enabled = False
            print("⚠️  Supabase 未配置，使用内存存储模式")

    # ===== Samples 表操作 =====

    async def create_sample(
        self, content: str, features: Dict[str, Any], word_count: int
    ) -> str:
        """创建样本"""
        if not self.enabled:
            return "memory-sample-id"

        try:
            data = {
                "content": content,
                "features": features,
                "word_count": word_count,
                "created_at": datetime.now().isoformat(),
            }

            result = self.client.table("samples").insert(data).execute()
            return result.data[0]["id"]
        except Exception as e:
            print(f"❌ 创建样本失败：{e}")
            return "memory-sample-id"

    async def get_sample(self, sample_id: str) -> Optional[Dict[str, Any]]:
        """获取样本"""
        if not self.enabled:
            return None

        try:
            result = (
                self.client.table("samples").select("*").eq("id", sample_id).execute()
            )
            return result.data[0] if result.data else None
        except Exception as e:
            print(f"❌ 获取样本失败：{e}")
            return None

    async def list_samples(self, limit: int = 20) -> List[Dict[str, Any]]:
        """获取样本列表"""
        if not self.enabled:
            return []

        try:
            result = (
                self.client.table("samples")
                .select("*")
                .order("created_at", desc=True)
                .limit(limit)
                .execute()
            )
            return result.data
        except Exception as e:
            print(f"❌ 获取样本列表失败：{e}")
            return []

    # ===== Generations 表操作 =====

    async def create_generation(
        self, topic: str, content: str, word_count: int, sample_id: Optional[str] = None
    ) -> str:
        """创建生成记录"""
        if not self.enabled:
            return "memory-generation-id"

        try:
            data = {
                "sample_id": sample_id,
                "topic": topic,
                "content": content,
                "word_count": word_count,
                "created_at": datetime.now().isoformat(),
            }

            result = self.client.table("generations").insert(data).execute()
            return result.data[0]["id"]
        except Exception as e:
            print(f"❌ 创建生成记录失败：{e}")
            return "memory-generation-id"

    async def get_generation(self, generation_id: str) -> Optional[Dict[str, Any]]:
        """获取生成记录"""
        if not self.enabled:
            return None

        try:
            result = (
                self.client.table("generations")
                .select("*")
                .eq("id", generation_id)
                .execute()
            )
            return result.data[0] if result.data else None
        except Exception as e:
            print(f"❌ 获取生成记录失败：{e}")
            return None

    async def list_generations(self, limit: int = 20) -> List[Dict[str, Any]]:
        """获取生成历史"""
        if not self.enabled:
            return []

        try:
            result = (
                self.client.table("generations")
                .select("*")
                .order("created_at", desc=True)
                .limit(limit)
                .execute()
            )
            return result.data
        except Exception as e:
            print(f"❌ 获取生成历史失败：{e}")
            return []


# 全局数据库客户端实例
db = DatabaseClient()
