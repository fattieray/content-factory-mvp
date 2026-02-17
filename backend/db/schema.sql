-- Supabase 数据库 Schema
-- 执行地址：https://app.supabase.com/project/_/sql

-- 启用 UUID 扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===== Samples 表 =====

CREATE TABLE IF NOT EXISTS samples (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content TEXT NOT NULL,
    features JSONB NOT NULL,
    word_count INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_samples_created_at ON samples(created_at DESC);
CREATE INDEX idx_samples_features ON samples USING GIN(features);

-- ===== Generations 表 =====

CREATE TABLE IF NOT EXISTS generations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sample_id UUID REFERENCES samples(id) ON DELETE SET NULL,
    topic VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    word_count INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_generations_sample_id ON generations(sample_id);
CREATE INDEX idx_generations_created_at ON generations(created_at DESC);
CREATE INDEX idx_generations_topic ON generations USING GIN(to_tsvector('simple', topic));

-- ===== 自动更新 updated_at 触发器 =====

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_samples_updated_at
    BEFORE UPDATE ON samples
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_generations_updated_at
    BEFORE UPDATE ON generations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ===== RLS (行级安全) 策略 =====

-- 启用 RLS
ALTER TABLE samples ENABLE ROW LEVEL SECURITY;
ALTER TABLE generations ENABLE ROW LEVEL SECURITY;

-- 创建策略（MVP 阶段简化，允许所有认证用户访问）
-- 生产环境需要根据 user_id 进行隔离
CREATE POLICY "Allow authenticated users" ON samples
    FOR ALL
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated users" ON generations
    FOR ALL
    TO authenticated
    USING (true);

-- ===== 示例数据 =====

-- 可选：插入测试数据
-- INSERT INTO samples (content, features, word_count)
-- VALUES ('测试文章内容...', '{"l1_structure": {...}}'::jsonb, 1000);
