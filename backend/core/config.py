import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """应用配置"""

    claude_api_key: str = ""
    supabase_url: str = ""
    supabase_key: str = ""

    class Config:
        env_file = ".env"
        case_sensitive = False


# 全局配置实例
settings = Settings()
