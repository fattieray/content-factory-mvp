import axios from 'axios';
import type {
  ApiResponse,
  AnalyzeRequest,
  AnalyzeResult,
  GenerationRequest,
  GenerationResult,
  Sample,
} from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 分析文章
export async function analyzeArticle(content: string): Promise<ApiResponse<AnalyzeResult>> {
  const response = await apiClient.post<ApiResponse<AnalyzeResult>>('/api/analyze', {
    content,
  } as AnalyzeRequest);
  return response.data;
}

// 生成内容
export async function generateContent(
  request: GenerationRequest
): Promise<ApiResponse<GenerationResult>> {
  const response = await apiClient.post<ApiResponse<GenerationResult>>('/api/generate', request);
  return response.data;
}

// 获取样本列表
export async function getSamples(): Promise<ApiResponse<Sample[]>> {
  const response = await apiClient.get<ApiResponse<Sample[]>>('/api/samples');
  return response.data;
}

// 创建样本
export async function createSample(content: string): Promise<ApiResponse<Sample>> {
  const response = await apiClient.post<ApiResponse<Sample>>('/api/samples', { content });
  return response.data;
}

// 获取生成历史
export async function getGenerations(): Promise<ApiResponse<GenerationResult[]>> {
  const response = await apiClient.get<ApiResponse<GenerationResult[]>>('/api/generations');
  return response.data;
}
