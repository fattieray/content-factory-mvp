from pydantic import BaseModel, Field
from typing import Optional, List


# 分析请求
class AnalyzeRequest(BaseModel):
    content: str = Field(..., min_length=1000, max_length=50000)


# 风格特征
class L1Structure(BaseModel):
    pattern: str
    description: str


class L2Logic(BaseModel):
    method: str
    description: str


class L3Perspective(BaseModel):
    angle: str
    description: str


class L4Expression(BaseModel):
    style: str
    description: str


class L5Material(BaseModel):
    types: List[str]
    description: str


class StyleFeatures(BaseModel):
    l1_structure: Optional[L1Structure] = None
    l2_logic: Optional[L2Logic] = None
    l3_perspective: Optional[L3Perspective] = None
    l4_expression: Optional[L4Expression] = None
    l5_material: Optional[L5Material] = None


# 分析结果
class AnalyzeResult(BaseModel):
    sample_id: str
    features: StyleFeatures
    word_count: int


# 生成请求
class GenerationRequest(BaseModel):
    sample_id: str
    topic: str
    key_points: Optional[str] = None
    word_count: Optional[int] = Field(default=2000, ge=500, le=5000)


# 生成结果
class GenerationResult(BaseModel):
    id: str
    topic: str
    content: str
    word_count: int
    created_at: str


# 通用响应
class ApiResponse(BaseModel):
    success: bool
    data: Optional[dict] = None
    error: Optional[dict] = None


# 样本
class Sample(BaseModel):
    id: str
    content: str
    word_count: int
    features: Optional[StyleFeatures] = None
    created_at: str
