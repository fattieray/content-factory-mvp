from typing import Any
from ..core.schemas import ApiResponse, GenerationRequest
from ..utils.ai_service import QwenService
from .analyze import samples_db
import uuid
from datetime import datetime


# 内存存储生成记录
generations_db: dict[str, dict[str, Any]] = {}


async def generate_handler(request: GenerationRequest) -> ApiResponse:
    """生成内容"""
    try:
        # 获取样本特征
        sample = samples_db.get(request.sample_id)
        if not sample:
            return ApiResponse(
                success=False,
                error={"code": "SAMPLE_NOT_FOUND", "message": "样本不存在"},
            )

        # 初始化 AI 服务
        ai_service = QwenService()

        # 从样本中提取特征
        features_data = sample.get("features", {})
        from ..core.schemas import (
            StyleFeatures,
            L1Structure,
            L2Logic,
            L3Perspective,
            L4Expression,
            L5Material,
        )

        features = StyleFeatures(
            l1_structure=L1Structure(**features_data.get("l1_structure", {}))
            if features_data.get("l1_structure")
            else None,
            l2_logic=L2Logic(**features_data.get("l2_logic", {}))
            if features_data.get("l2_logic")
            else None,
            l3_perspective=L3Perspective(**features_data.get("l3_perspective", {}))
            if features_data.get("l3_perspective")
            else None,
            l4_expression=L4Expression(**features_data.get("l4_expression", {}))
            if features_data.get("l4_expression")
            else None,
            l5_material=L5Material(**features_data.get("l5_material", {}))
            if features_data.get("l5_material")
            else None,
        )

        # 生成内容
        content = await ai_service.generate_content(
            features=features,
            topic=request.topic,
            key_points=request.key_points or "",
            word_count=request.word_count or 2000,
        )

        # 生成记录 ID
        generation_id = str(uuid.uuid4())

        # 存储生成记录
        generations_db[generation_id] = {
            "id": generation_id,
            "topic": request.topic,
            "content": content,
            "word_count": len(content),
            "created_at": datetime.now().isoformat(),
        }

        return ApiResponse(
            success=True,
            data={
                "id": generation_id,
                "topic": request.topic,
                "content": content,
                "word_count": len(content),
                "created_at": datetime.now().isoformat(),
            },
        )
    except Exception as e:
        return ApiResponse(
            success=False, error={"code": "GENERATE_ERROR", "message": str(e)}
        )


async def get_generations_handler() -> ApiResponse:
    """获取生成历史"""
    try:
        generations_list = list(generations_db.values())
        # 按时间倒序排列
        generations_list.sort(key=lambda x: x["created_at"], reverse=True)
        return ApiResponse(success=True, data=generations_list)
    except Exception as e:
        return ApiResponse(
            success=False, error={"code": "GET_GENERATIONS_ERROR", "message": str(e)}
        )
