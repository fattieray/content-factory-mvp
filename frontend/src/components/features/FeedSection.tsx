import React from 'react';
import { useAppStore } from '@/stores/appStore';
import { analyzeArticle } from '@/services/api';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Toast } from '@/components/ui/Toast';

export function FeedSection() {
  const [content, setContent] = React.useState('');
  const { isAnalyzing, setIsAnalyzing, setFeatures, setError } = useAppStore();
  const [toast, setToast] = React.useState<{ message: string; type: 'success' | 'error' } | null>(
    null
  );

  const wordCount = content.length;
  const isWordCountValid = wordCount >= 1000 && wordCount <= 5000;

  const handleAnalyze = async () => {
    if (!isWordCountValid) {
      setToast({ message: '请输入 1000-5000 字的文章', type: 'error' });
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzeArticle(content);
      if (result.success && result.data) {
        setFeatures(result.data.features);
        setToast({ message: '分析成功！', type: 'success' });
      } else {
        throw new Error(result.error?.message || '分析失败');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : '分析失败，请重试';
      setError(message);
      setToast({ message, type: 'error' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const loadExample = () => {
    const example = `这是一篇示例文章，展示了一个典型的企业家写作风格...

（此处为示例文章内容，实际使用时会被替换）

总的来说，创业就是一场修行，需要我们有足够的耐心和智慧。希望我的分享能对你有所启发。`;
    setContent(example);
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-gray-900 mb-4">投喂样本</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            请粘贴一篇您喜欢的文章（1000-5000 字）
          </label>
          <textarea
            className="input-primary min-h-[300px] font-mono text-sm"
            placeholder="请粘贴文章内容..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isAnalyzing}
          />
          <div className="flex justify-between items-center mt-2">
            <span
              className={`text-sm ${
                isWordCountValid ? 'text-gray-500' : 'text-error'
              }`}
            >
              当前字数：{wordCount} / 5000
            </span>
            <button
              className="text-sm text-primary hover:underline"
              onClick={loadExample}
              disabled={isAnalyzing}
            >
              使用示例
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleAnalyze} loading={isAnalyzing} disabled={!isWordCountValid}>
            分析特征
          </Button>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
