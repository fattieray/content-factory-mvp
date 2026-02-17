import React from 'react';
import { useAppStore } from '@/stores/appStore';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';

export function ResultSection() {
  const { currentGeneration } = useAppStore();
  const { copy, copied } = useCopyToClipboard();
  const [toast, setToast] = React.useState<{ message: string; type: 'success' | 'error' } | null>(
    null
  );

  if (!currentGeneration) {
    return null;
  }

  const handleCopy = async () => {
    const success = await copy(currentGeneration.content);
    setToast({
      message: success ? '复制成功！' : '复制失败',
      type: success ? 'success' : 'error',
    });
  };

  return (
    <div className="card mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">生成结果</h2>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={handleCopy}>
            {copied ? '已复制' : '复制'}
          </Button>
        </div>
      </div>

      <div className="prose max-w-none">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {currentGeneration.topic}
        </h3>
        <div className="text-gray-700 whitespace-pre-wrap">
          {currentGeneration.content}
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <span>字数：{currentGeneration.word_count}</span>
        <span>生成时间：{new Date(currentGeneration.created_at).toLocaleString('zh-CN')}</span>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
