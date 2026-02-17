import { useAppStore } from '@/stores/appStore';

interface FeatureItemProps {
  title: string;
  value?: string;
  description?: string;
}

function FeatureItem({ title, value, description }: FeatureItemProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h4 className="text-sm font-medium text-gray-900 mb-2">{title}</h4>
      {value && <p className="text-gray-700 font-medium">{value}</p>}
      {description && <p className="text-gray-500 text-sm mt-1">{description}</p>}
    </div>
  );
}

export function FeaturesDisplay() {
  const { features } = useAppStore();

  if (!features) {
    return null;
  }

  return (
    <div className="card mt-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">分析结果</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.l1_structure && (
          <FeatureItem
            title="L1 结构层"
            value={features.l1_structure.pattern}
            description={features.l1_structure.description}
          />
        )}

        {features.l2_logic && (
          <FeatureItem
            title="L2 逻辑层"
            value={features.l2_logic.method}
            description={features.l2_logic.description}
          />
        )}

        {features.l3_perspective && (
          <FeatureItem
            title="L3 视角层"
            value={features.l3_perspective.angle}
            description={features.l3_perspective.description}
          />
        )}

        {features.l4_expression && (
          <FeatureItem
            title="L4 表达层"
            value={features.l4_expression.style}
            description={features.l4_expression.description}
          />
        )}

        {features.l5_material && (
          <FeatureItem
            title="L5 素材层"
            value={features.l5_material.types.join(', ')}
            description={features.l5_material.description}
          />
        )}
      </div>
    </div>
  );
}
