import React from 'react';
import { useAppStore } from '@/stores/appStore';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';

interface Version {
  id: string;
  version_type: string;
  style_description: string;
  content: string;
  word_count: number;
  topic: string;
  created_at: string;
}

export function ResultSection() {
  const { generations } = useAppStore();
  const { copy, copied } = useCopyToClipboard();
  const [selectedVersion, setSelectedVersion] = React.useState<number>(0);
  const [toast, setToast] = React.useState<{ message: string; type: 'success' | 'error' } | null>(
    null
  );

  // 如果没有生成记录，不显示
  if (generations.length === 0) {
    return null;
  }

  // 获取最新的生成记录（包含 4 个版本）
  const latestGeneration = generations[0];
  
  // 模拟 4 个版本（实际应该从后端获取）
  const versions: Version[] = [
    {
      id: '1',
      version_type: 'professional',
      style_description: '专业深沉型',
      content: latestGeneration?.content || '',
      word_count: latestGeneration?.word_count || 0,
      topic: latestGeneration?.topic || '',
      created_at: latestGeneration?.created_at || '',
    },
    {
      id: '2',
      version_type: 'balanced',
      style_description: '平衡型',
      content: latestGeneration?.content ? latestGeneration.content.slice(0, -100) + '（平衡风格版本）' : '',
      word_count: latestGeneration?.word_count ? latestGeneration.word_count - 100 : 0,
      topic: latestGeneration?.topic || '',
      created_at: latestGeneration?.created_at || '',
    },
    {
      id: '3',
      version_type: 'personal',
      style_description: '个人风格型',
      content: latestGeneration?.content ? latestGeneration.content.slice(0, -50) + '（个人风格版本）' : '',
      word_count: latestGeneration?.word_count ? latestGeneration.word_count - 50 : 0,
      topic: latestGeneration?.topic || '',
      created_at: latestGeneration?.created_at || '',
    },
    {
      id: '4',
      version_type: 'creative',
      style_description: '创意探索型',
      content: latestGeneration?.content ? latestGeneration.content.slice(0, -150) + '（创意探索版本）' : '',
      word_count: latestGeneration?.word_count ? latestGeneration.word_count - 150 : 0,
      topic: latestGeneration?.topic || '',
      created_at: latestGeneration?.created_at || '',
    },
  ];

  const handleCopy = async () => {
    const content = versions[selectedVersion]?.content;
    if (!content) return;
    
    const success = await copy(content);
    setToast({
      message: success ? '复制成功！' : '复制失败',
      type: success ? 'success' : 'error',
    });
  };

  const handleExport = () => {
    const content = versions[selectedVersion]?.content;
    if (!content) return;
    
    // 创建 Blob 并下载
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `文章-${versions[selectedVersion].style_description}.md`;
    link.click();
    URL.revokeObjectURL(url);
    
    setToast({ message: '导出成功！', type: 'success' });
  };

  return (
    <div className="card mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">✨ 生成结果</h2>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleCopy} disabled={copied}>
            {copied ? '✅ 已复制' : '📋 复制全文'}
          </Button>
          <Button variant="secondary" onClick={handleExport}>
            📥 导出
          </Button>
        </div>
      </div>

      {/* 版本选择 */}
      <div className="mb-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {versions.map((version, index) => (
            <button
              key={version.id}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedVersion === index
                  ? 'border-primary bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedVersion(index)}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-lg ${
                  selectedVersion === index ? 'text-primary' : 'text-gray-500'
                }`}>
                  {selectedVersion === index ? '✅' : `📄`}
                </span>
                <span className="font-medium text-gray-900">
                  版本{index + 1}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {version.style_description}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {version.word_count}字
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* 内容展示 */}
      <div className="border-t pt-4">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {versions[selectedVersion]?.topic}
          </h3>
          <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {versions[selectedVersion]?.content}
          </div>
        </div>

        {/* 底部信息 */}
        <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
          <div className="flex gap-4">
            <span>📊 字数：{versions[selectedVersion]?.word_count}</span>
            <span>🕐 生成时间：{new Date(versions[selectedVersion]?.created_at || '').toLocaleString('zh-CN')}</span>
          </div>
          <span className="text-primary font-medium">
            {versions[selectedVersion]?.style_description}
          </span>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
