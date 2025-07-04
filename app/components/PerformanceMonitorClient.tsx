'use client';

import { PerformanceMonitor as PerformanceMonitorImpl } from '../utils/performanceMonitor';

export const PerformanceMonitor = () => {
  return <PerformanceMonitorImpl />;
}; 

// This is the correct way to export for the dynamic import in layout.tsx
export default PerformanceMonitor; 