import React from 'react';
import { useAppStore } from '@/stores/appStore';
import { generateContent, generateMultiVersions } from '@/services/api';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Toast } from '@/components/ui/Toast';

// 主题建议
const TOPIC_SUGGESTIONS = [
  'AI 时代，如何保持竞争力',
  '创业公司的团队建设',
  '产品管理的核心方法论',
  '技术与商业的平衡之道',
];

export function GenerateSection() {
  const [topic, setTopic] = React.useState('');
  const [keyPoints, setKeyPoints] = React.useState('');
  const [wordCount, setWordCount] = React.useState(2000);
  const { features, currentSample, isGenerating, setIsGenerating, setError } = useAppStore();
  const [toast, setToast] = React.useState<{ message: string; type: 'success' | 'error' } | null>(
    null
  );

  const canGenerate = features && topic.trim() && currentSample;

  const handleGenerate = async () => {
    if (!currentSample || !topic.trim()) {
      setToast({ message: '请先投喂样本并输入主题', type: 'error' });
      return;
    }

    setIsGenerating(true);
    try {
      // 调用多版本生成 API
      const result = await generateMultiVersions({
        sample_id: currentSample.id,
        topic: topic.trim(),
        key_points: keyPoints.trim() || undefined,
        word_count: wordCount,
        version_count: 4,
      });

      if (result.success && result.data && result.data.length > 0) {
        setToast({ message: `生成成功！共 ${result.data.length} 个版本`, type: 'success' });
        // 跳转到结果页面（由父组件处理）
      } else {
        throw new Error(result.error?.message || '生成失败');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : '生成失败，请重试';
      setError(message);
      setToast({ message, type: 'error' });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setTopic(suggestion);
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-gray-900 mb-4">✍️ 写作</h2>
      <p className="text-sm text-gray-600 mb-4">
        输入主题，AI 将基于您的风格生成 4 个版本的文章
      </p>

      <div className="space-y-4">
        {/* 主题建议 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            主题建议
          </label>
          <div className="flex flex-wrap gap-2">
            {TOPIC_SUGGESTIONS.map((suggestion, index) => (
              <button
                key={index}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                onClick={() => handleSuggestionClick(suggestion)}
                disabled={isGenerating}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* 主题输入 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            想写什么主题？ <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="input-primary"
            placeholder="例如：如何打造自驱动团队"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={isGenerating}
          />
        </div>

        {/* 核心要点 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            核心要点（可选）
          </label>
          <textarea
            className="input-primary min-h-[100px]"
            placeholder="用逗号分隔要点，例如：明确目标，充分授权，结果导向"
            value={keyPoints}
            onChange={(e) => setKeyPoints(e.target.value)}
            disabled={isGenerating}
          />
          <p className="text-xs text-gray-500 mt-1">
            AI 会将这些要点融入文章中
          </p>
        </div>

        {/* 字数选择 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            目标字数
          </label>
          <div className="flex gap-2">
            {[1000, 1500, 2000, 3000].map((count) => (
              <button
                key={count}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  wordCount === count
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setWordCount(count)}
                disabled={isGenerating}
              >
                {count}字
              </button>
            ))}
          </div>
        </div>

        {/* 生成按钮 */}
        <div className="flex gap-3 pt-4">
          <Button 
            onClick={handleGenerate} 
            loading={isGenerating} 
            disabled={!canGenerate}
            className="px-8"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <LoadingSpinner size="sm" />
                生成中...
              </span>
            ) : (
              '✨ 生成 4 个版本'
            )}
          </Button>
        </div>

        {/* 生成中提示 */}
        {isGenerating && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <LoadingSpinner size="sm" />
              <div>
                <p className="text-sm font-medium text-purple-900">正在生成 4 个版本...</p>
                <p className="text-xs text-purple-600 mt-1">
                  AI 正在创作不同风格的文章，预计需要 30-60 秒
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 提示信息 */}
        {!features && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              ⚠️ 请先在左侧投喂样本文章并分析特征，然后才能生成内容
            </p>
          </div>
        )}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
