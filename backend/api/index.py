"""
Vercel Serverless API Entry Point
"""

from typing import Any, Dict
from .api import analyze_handler, generate_handler
from .core.schemas import AnalyzeRequest, GenerationRequest


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """Vercel Serverless 处理函数"""

    # 获取请求信息
    path = event.get("path", "")
    method = event.get("method", "GET")
    body = event.get("body", {})

    # 路由处理
    if path == "/api/analyze" and method == "POST":
        return handle_analyze(body)
    elif path == "/api/generate" and method == "POST":
        return handle_generate(body)
    elif path == "/api/samples" and method == "GET":
        return handle_get_samples()
    elif path == "/api/generations" and method == "GET":
        return handle_get_generations()
    else:
        return {
            "statusCode": 404,
            "body": '{"success": false, "error": {"code": "NOT_FOUND", "message": "接口不存在"}}',
        }


async def handle_analyze(body: Dict[str, Any]) -> Dict[str, Any]:
    """处理分析请求"""
    try:
        request = AnalyzeRequest(**body)
        result = await analyze_handler(request)
        return {
            "statusCode": 200 if result.success else 400,
            "body": result.model_dump_json(),
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": f'{{"success": false, "error": {{"code": "INTERNAL_ERROR", "message": "{str(e)}"}}}}',
        }


async def handle_generate(body: Dict[str, Any]) -> Dict[str, Any]:
    """处理生成请求"""
    try:
        request = GenerationRequest(**body)
        result = await generate_handler(request)
        return {
            "statusCode": 200 if result.success else 400,
            "body": result.model_dump_json(),
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": f'{{"success": false, "error": {{"code": "INTERNAL_ERROR", "message": "{str(e)}"}}}}',
        }


async def handle_get_samples() -> Dict[str, Any]:
    """处理获取样本请求"""
    from .api import get_samples_handler

    result = await get_samples_handler()
    return {
        "statusCode": 200 if result.success else 500,
        "body": result.model_dump_json(),
    }


async def handle_get_generations() -> Dict[str, Any]:
    """处理获取生成历史请求"""
    from .api.generate import get_generations_handler

    result = await get_generations_handler()
    return {
        "statusCode": 200 if result.success else 500,
        "body": result.model_dump_json(),
    }
