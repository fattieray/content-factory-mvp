import { create } from 'zustand';
import type { Sample, GenerationResult, StyleFeatures } from '@/types';

interface AppState {
  // 样本相关
  samples: Sample[];
  currentSample: Sample | null;
  features: StyleFeatures | null;
  
  // 生成相关
  generations: GenerationResult[];
  currentGeneration: GenerationResult | null;
  isGenerating: boolean;
  
  // UI 状态
  isAnalyzing: boolean;
  error: string | null;
  
  // Actions
  setSamples: (samples: Sample[]) => void;
  setCurrentSample: (sample: Sample | null) => void;
  setFeatures: (features: StyleFeatures | null) => void;
  addGeneration: (generation: GenerationResult) => void;
  setCurrentGeneration: (generation: GenerationResult | null) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // 初始状态
  samples: [],
  currentSample: null,
  features: null,
  generations: [],
  currentGeneration: null,
  isGenerating: false,
  isAnalyzing: false,
  error: null,
  
  // Actions
  setSamples: (samples) => set({ samples }),
  setCurrentSample: (sample) => set({ currentSample: sample }),
  setFeatures: (features) => set({ features }),
  addGeneration: (generation) =>
    set((state) => ({ generations: [generation, ...state.generations] })),
  setCurrentGeneration: (generation) => set({ currentGeneration: generation }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setError: (error) => set({ error }),
}));
