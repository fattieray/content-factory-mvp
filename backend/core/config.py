import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """应用配置"""

    # Qwen API 配置
    qwen_api_key: str = ""
    qwen_base_url: str = "https://dashscope.aliyuncs.com/compatible-mode/v1"

    # Supabase 配置
    supabase_url: str = ""
    supabase_key: str = ""

    class Config:
        env_file = ".env"
        extra = "ignore"  # 忽略额外的环境变量


# 全局配置实例
settings = Settings()
