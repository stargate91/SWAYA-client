import { useMemo } from 'react';

const DEFAULT_CENTER = 150;
const DEFAULT_RADIUS = 92;
const DEFAULT_LEVELS = 4;
const DEFAULT_LABEL_OFFSET = 34;

export function useLibraryDnaPlot(nodes = [], {
  center = DEFAULT_CENTER,
  radius = DEFAULT_RADIUS,
  levels = DEFAULT_LEVELS,
  labelOffset = DEFAULT_LABEL_OFFSET,
} = {}) {
  return useMemo(() => {
    if (!Array.isArray(nodes) || nodes.length === 0) {
      return {
        nodes: [],
        polygonPoints: '',
        rings: [],
      };
    }

    const maxNodeCount = Math.max(...nodes.map((node) => Number(node.count || 0)), 1);
    const plottedNodes = nodes.map((node, index) => {
      const angle = (-Math.PI / 2) + ((Math.PI * 2) / nodes.length) * index;
      const valueRatio = Number(node.count || 0) / maxNodeCount;
      const pointRadius = radius * valueRatio;
      const axisX = center + Math.cos(angle) * radius;
      const axisY = center + Math.sin(angle) * radius;
      const pointX = center + Math.cos(angle) * pointRadius;
      const pointY = center + Math.sin(angle) * pointRadius;
      const labelRadius = radius + labelOffset;
      const labelX = center + Math.cos(angle) * labelRadius;
      const labelY = center + Math.sin(angle) * labelRadius;

      return {
        ...node,
        angle,
        axisX,
        axisY,
        pointX,
        pointY,
        labelX,
        labelY,
        valueRatio,
      };
    });

    const polygonPoints = plottedNodes.map((node) => `${node.pointX},${node.pointY}`).join(' ');
    const rings = Array.from({ length: levels }, (_, index) => {
      const ringRadius = radius * ((index + 1) / levels);
      const points = plottedNodes.map((node) => {
        const x = center + Math.cos(node.angle) * ringRadius;
        const y = center + Math.sin(node.angle) * ringRadius;
        return `${x},${y}`;
      }).join(' ');
      return {
        key: `ring-${index + 1}`,
        points,
      };
    });

    return {
      nodes: plottedNodes,
      polygonPoints,
      rings,
    };
  }, [nodes, center, radius, levels, labelOffset]);
}

export default useLibraryDnaPlot;
