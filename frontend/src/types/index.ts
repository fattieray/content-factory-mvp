// API 响应类型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

// 样本文章
export interface Sample {
  id: string;
  content: string;
  word_count: number;
  features?: StyleFeatures;
  created_at: string;
}

// 风格特征
export interface StyleFeatures {
  l1_structure?: {
    pattern: string;
    description: string;
  };
  l2_logic?: {
    method: string;
    description: string;
  };
  l3_perspective?: {
    angle: string;
    description: string;
  };
  l4_expression?: {
    style: string;
    description: string;
  };
  l5_material?: {
    types: string[];
    description: string;
  };
}

// 生成请求
export interface GenerationRequest {
  sample_id: string;
  topic: string;
  key_points?: string;
  word_count?: number;
}

// 生成结果
export interface GenerationResult {
  id: string;
  topic: string;
  content: string;
  word_count: number;
  created_at: string;
}

// 分析请求
export interface AnalyzeRequest {
  content: string;
}

// 分析结果
export interface AnalyzeResult {
  sample_id: string;
  features: StyleFeatures;
  word_count: number;
}
