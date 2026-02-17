import React from 'react';
import { FeedSection } from '@/components/features/FeedSection';
import { GenerateSection } from '@/components/features/GenerateSection';
import { FeaturesDisplay } from '@/components/features/FeaturesDisplay';
import { ResultSection } from '@/components/features/ResultSection';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">内容工厂</h1>
              <p className="text-sm text-gray-500 mt-1">
                企业家个人 IP 智能内容生成工具
              </p>
            </div>
            <div className="text-sm text-gray-500">
              MVP v0.1.0
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Feed */}
          <div className="space-y-6">
            <FeedSection />
            <FeaturesDisplay />
          </div>

          {/* Right Column - Generate */}
          <div className="space-y-6">
            <GenerateSection />
            <ResultSection />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            © 2026 内容工厂。让每位企业家都能用 30 分钟/周建立个人品牌。
          </p>
        </div>
      </footer>
    </div>
  );
}
