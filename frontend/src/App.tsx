import { FeedSection } from '@/components/features/FeedSection';
import { GenerateSection } from '@/components/features/GenerateSection';
import { FeaturesDisplay } from '@/components/features/FeaturesDisplay';
import { ResultSection } from '@/components/features/ResultSection';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏭</span>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">内容工厂</h1>
                  <p className="text-xs text-gray-500">
                    企业家个人 IP 智能内容生成工具
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-gray-500">MVP 版本</p>
                <p className="text-sm font-medium text-primary">v1.0</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 使用流程指引 */}
        <div className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            📋 使用流程
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <p className="font-medium text-gray-900">投喂样本</p>
                <p className="text-sm text-gray-600">粘贴您的文章</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <p className="font-medium text-gray-900">分析特征</p>
                <p className="text-sm text-gray-600">AI 学习风格</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <p className="font-medium text-gray-900">输入主题</p>
                <p className="text-sm text-gray-600">告诉 AI 写什么</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                4
              </div>
              <div>
                <p className="font-medium text-gray-900">生成内容</p>
                <p className="text-sm text-gray-600">获取 4 个版本</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Feed & Features */}
          <div className="space-y-6">
            <FeedSection />
            <FeaturesDisplay />
          </div>

          {/* Right Column - Generate & Result */}
          <div className="space-y-6">
            <GenerateSection />
            <ResultSection />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2026 内容工厂。让每位企业家都能用 30 分钟/周建立个人品牌。
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <span>⚡ 基于 Qwen3.5 AI</span>
              <span>🔒 数据安全</span>
              <span>✨ 智能生成</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
