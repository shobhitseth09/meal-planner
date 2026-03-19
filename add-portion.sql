-- Add portion column to meal_plan table
-- Portion is a multiplier: 0.5 = half, 1.0 = full (default), 1.5 = one and half, 2.0 = double
ALTER TABLE meal_plan
ADD COLUMN IF NOT EXISTS portion NUMERIC(4, 2) NOT NULL DEFAULT 1.0;
