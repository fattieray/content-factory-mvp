import React from 'react';
import { useAppStore } from '@/stores/appStore';
import { generateContent } from '@/services/api';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Toast } from '@/components/ui/Toast';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

export function GenerateSection() {
  const [topic, setTopic] = React.useState('');
  const [keyPoints, setKeyPoints] = React.useState('');
  const { features, isGenerating, setIsGenerating, addGeneration, setCurrentGeneration } =
    useAppStore();
  const { copy, copied } = useCopyToClipboard();
  const [toast, setToast] = React.useState<{ message: string; type: 'success' | 'error' } | null>(
    null
  );

  const canGenerate = features && topic.trim();

  const handleGenerate = async () => {
    if (!features || !topic.trim()) {
      setToast({ message: '请先投喂样本并输入主题', type: 'error' });
      return;
    }

    setIsGenerating(true);
    try {
      // TODO: 使用真实的 sample_id
      const result = await generateContent({
        sample_id: 'temp',
        topic: topic.trim(),
        key_points: keyPoints.trim() || undefined,
      });

      if (result.success && result.data) {
        addGeneration(result.data);
        setCurrentGeneration(result.data);
        setToast({ message: '生成成功！', type: 'success' });
      } else {
        throw new Error(result.error?.message || '生成失败');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : '生成失败，请重试';
      setToast({ message, type: 'error' });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    // TODO: 复制当前生成内容
    copy('示例内容');
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-gray-900 mb-4">写作</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">想写什么主题？</label>
          <input
            type="text"
            className="input-primary"
            placeholder="例如：如何打造自驱动团队"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={isGenerating}
          />
        </div>

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
        </div>

        <div className="flex gap-3">
          <Button onClick={handleGenerate} loading={isGenerating} disabled={!canGenerate}>
            生成文章
          </Button>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
