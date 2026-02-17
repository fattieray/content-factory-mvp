import axios from 'axios';
import type {
  ApiResponse,
  AnalyzeRequest,
  AnalyzeResult,
  GenerationRequest,
  GenerationResult,
  Sample,
} from '@/types';

// API 基础 URL - 开发环境使用 Vercel 本地开发服务器
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120000, // 2 分钟超时（AI 生成可能需要较长时间）
});

// 分析文章
export async function analyzeArticle(content: string): Promise<ApiResponse<AnalyzeResult>> {
  try {
    const response = await apiClient.post<ApiResponse<AnalyzeResult>>('/api/analyze', {
      content,
    } as AnalyzeRequest);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        error: {
          code: 'API_ERROR',
          message: error.message || '分析失败',
        },
      };
    }
    return {
      success: false,
      error: {
        code: 'UNKNOWN_ERROR',
        message: '未知错误',
      },
    };
  }
}

// 生成内容（单版本）
export async function generateContent(
  request: GenerationRequest
): Promise<ApiResponse<GenerationResult>> {
  try {
    const response = await apiClient.post<ApiResponse<GenerationResult>>('/api/generate', request);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        error: {
          code: 'API_ERROR',
          message: error.message || '生成失败',
        },
      };
    }
    return {
      success: false,
      error: {
        code: 'UNKNOWN_ERROR',
        message: '未知错误',
      },
    };
  }
}

// 多版本生成
export interface MultiVersionGenerationRequest extends GenerationRequest {
  version_count?: number;
}

export interface VersionedGenerationResult extends GenerationResult {
  version_type: string;
  style_description: string;
}

export async function generateMultiVersions(
  request: MultiVersionGenerationRequest
): Promise<ApiResponse<VersionedGenerationResult[]>> {
  try {
    // 目前后端暂未实现批量接口，这里模拟多次调用
    const versionTypes = [
      { type: 'professional', style: '专业深沉型' },
      { type: 'balanced', style: '平衡型' },
      { type: 'personal', style: '个人风格型' },
      { type: 'creative', style: '创意探索型' },
    ];

    const results: VersionedGenerationResult[] = [];

    for (const version of versionTypes) {
      const result = await generateContent({
        ...request,
        topic: `${request.topic} (${version.style})`,
      });

      if (result.success && result.data) {
        results.push({
          ...result.data,
          version_type: version.type,
          style_description: version.style,
        });
      }
    }

    return {
      success: true,
      data: results,
    };
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'MULTI_VERSION_ERROR',
        message: '多版本生成失败',
      },
    };
  }
}

// 获取样本列表
export async function getSamples(): Promise<ApiResponse<Sample[]>> {
  try {
    const response = await apiClient.get<ApiResponse<Sample[]>>('/api/samples');
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'API_ERROR',
        message: '获取样本失败',
      },
    };
  }
}

// 获取生成历史
export async function getGenerations(): Promise<ApiResponse<GenerationResult[]>> {
  try {
    const response = await apiClient.get<ApiResponse<GenerationResult[]>>('/api/generations');
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'API_ERROR',
        message: '获取历史失败',
      },
    };
  }
}
