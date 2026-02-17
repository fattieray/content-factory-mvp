import React from 'react';
import { useAppStore } from '@/stores/appStore';
import { analyzeArticle } from '@/services/api';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Toast } from '@/components/ui/Toast';

// 示例文章
const EXAMPLE_ARTICLES = [
  {
    title: 'AI 行业思考',
    content: `人工智能是未来技术发展的重要方向。作为一名在 AI 行业深耕多年的从业者，我想分享一些对这个行业的思考。

首先，人工智能的发展速度超出了所有人的预期。从深度学习兴起至今，短短十年间，AI 已经从实验室走向了千行百业。无论是医疗、金融，还是制造、交通，都能看到 AI 的身影。

其次，大模型的出现标志着 AI 进入了一个新阶段。GPT、Claude、通义千问等模型的出现，让我们看到了通用人工智能的曙光。这些模型不仅能够完成语言理解、生成等任务，还能进行逻辑推理、编程等复杂操作。

然而，AI 的发展也面临着挑战。算力瓶颈、数据隐私、伦理问题等都需要我们认真思考和解决。作为从业者，我们既要拥抱技术变革，也要承担起社会责任。

最后，我想说，人工智能的未来是光明的，但道路是曲折的。需要我们共同努力，才能让 AI 真正造福人类。`
  },
  {
    title: '创业心得',
    content: `创业十年，我最大的感悟是：创业不是短跑，而是一场没有终点的马拉松。

刚开始创业时，我也和很多人一样，追求快速成长，追求融资，追求规模。但后来我发现，真正重要的不是跑得多快，而是跑得多久。

做企业，最重要的是找到你的核心价值。这个价值不是你想出来的，而是市场验证出来的。我们花了三年时间，才真正找到了自己的定位。

团队也很关键。创业初期，我们招错了两个人，花了整整一年才纠正过来。现在我明白，价值观匹配比能力更重要。

最后，我想说，创业很苦，但也很甜。苦在过程，甜在成长。如果你也在这条路上，共勉。`
  }
];

export function FeedSection() {
  const [content, setContent] = React.useState('');
  const [selectedExample, setSelectedExample] = React.useState<number | null>(null);
  const { isAnalyzing, setIsAnalyzing, setFeatures, setError, setCurrentSample } = useAppStore();
  const [toast, setToast] = React.useState<{ message: string; type: 'success' | 'error' } | null>(
    null
  );

  const wordCount = content.length;
  const isWordCountValid = wordCount >= 1000 && wordCount <= 50000;

  const handleAnalyze = async () => {
    if (!isWordCountValid) {
      setToast({ message: '请输入 1000-50000 字的文章', type: 'error' });
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzeArticle(content);
      if (result.success && result.data) {
        setFeatures(result.data.features);
        setCurrentSample({
          id: result.data.sample_id,
          content: content,
          word_count: result.data.word_count,
          created_at: new Date().toISOString()
        });
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

  const loadExample = (index: number) => {
    setSelectedExample(index);
    setContent(EXAMPLE_ARTICLES[index].content);
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-gray-900 mb-4">📤 投喂样本</h2>
      <p className="text-sm text-gray-600 mb-4">
        粘贴一篇您的文章，AI 将分析您的写作风格特征
      </p>

      <div className="space-y-4">
        {/* 示例文章选择 */}
        <div className="flex gap-2 flex-wrap">
          <span className="text-sm text-gray-600 py-2">快速加载示例：</span>
          {EXAMPLE_ARTICLES.map((article, index) => (
            <button
              key={index}
              className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                selectedExample === index
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => loadExample(index)}
              disabled={isAnalyzing}
            >
              {article.title}
            </button>
          ))}
        </div>

        {/* 文本输入 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            文章内容
          </label>
          <textarea
            className="input-primary min-h-[400px] font-sans text-base leading-relaxed"
            placeholder="请粘贴文章内容...（建议 1000 字以上，以便 AI 准确分析您的写作风格）"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setSelectedExample(null);
            }}
            disabled={isAnalyzing}
          />
          <div className="flex justify-between items-center mt-2">
            <span
              className={`text-sm ${
                isWordCountValid ? 'text-gray-500' : 'text-error'
              }`}
            >
              当前字数：{wordCount.toLocaleString()} / 50,000
              {!isWordCountValid && wordCount > 0 && (
                <span className="ml-2 text-orange-600">
                  （至少需要 1000 字）
                </span>
              )}
            </span>
            {wordCount > 0 && (
              <button
                className="text-sm text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setContent('');
                  setSelectedExample(null);
                }}
                disabled={isAnalyzing}
              >
                清空
              </button>
            )}
          </div>
        </div>

        {/* 分析按钮 */}
        <div className="flex gap-3 pt-4">
          <Button 
            onClick={handleAnalyze} 
            loading={isAnalyzing} 
            disabled={!isWordCountValid || wordCount === 0}
            className="px-8"
          >
            {isAnalyzing ? '分析中...' : '🔍 开始分析特征'}
          </Button>
        </div>

        {/* 分析中提示 */}
        {isAnalyzing && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <LoadingSpinner size="sm" />
              <div>
                <p className="text-sm font-medium text-blue-900">正在分析文章特征...</p>
                <p className="text-xs text-blue-600 mt-1">
                  AI 正在提取 L1-L5 五层特征，预计需要 10-20 秒
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
