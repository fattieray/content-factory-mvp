from typing import Any
from ..core.schemas import ApiResponse, AnalyzeRequest, StyleFeatures
from ..utils.ai_service import ClaudeService
import uuid
from datetime import datetime


# 内存存储（MVP 阶段简化）
samples_db: dict[str, dict[str, Any]] = {}


async def analyze_handler(request: AnalyzeRequest) -> ApiResponse:
    """分析文章特征"""
    try:
        # 初始化 AI 服务
        ai_service = ClaudeService()

        # 分析文章
        features = await ai_service.analyze_article(request.content)

        # 生成样本 ID
        sample_id = str(uuid.uuid4())

        # 存储样本（内存）
        samples_db[sample_id] = {
            "id": sample_id,
            "content": request.content,
            "word_count": len(request.content),
            "features": features.model_dump(),
            "created_at": datetime.now().isoformat(),
        }

        return ApiResponse(
            success=True,
            data={
                "sample_id": sample_id,
                "features": features.model_dump(),
                "word_count": len(request.content),
            },
        )
    except Exception as e:
        return ApiResponse(
            success=False, error={"code": "ANALYZE_ERROR", "message": str(e)}
        )


async def get_samples_handler() -> ApiResponse:
    """获取样本列表"""
    try:
        samples_list = list(samples_db.values())
        return ApiResponse(success=True, data=samples_list)
    except Exception as e:
        return ApiResponse(
            success=False, error={"code": "GET_SAMPLES_ERROR", "message": str(e)}
        )
