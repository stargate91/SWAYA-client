import { useMemo } from 'react';

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const getDistance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

export function estimateChipSize(label = '') {
  const width = 20 + (label.length * 7.2);
  const height = 28;
  return { halfW: width / 2, halfH: height / 2 };
}

export function chipOverlapsBadge(cx, cy, halfW, halfH, badgeCx, badgeCy, badgeR, gap) {
  const nearX = clamp(badgeCx, cx - halfW - gap, cx + halfW + gap);
  const nearY = clamp(badgeCy, cy - halfH - gap, cy + halfH + gap);
  const dx = badgeCx - nearX;
  const dy = badgeCy - nearY;
  return (dx * dx + dy * dy) < (badgeR * badgeR);
}

export function createChipLayout(chips = []) {
  const placed = [];
  const shellW = 320;
  const shellH = 168;
  const centerX = shellW / 2;     // 160
  const centerY = shellH / 2;     // 84
  const badgeRadius = 48;         // 6rem / 2 = 48px
  const badgeGap = 10;            // minimum gap between chip edge and badge edge
  const chipGap = 10;             // minimum gap between chips

  const chipModels = chips.map((chip, index) => ({
    ...chip,
    index,
    ...estimateChipSize(chip?.label || ''),
  }));

  chipModels.forEach((chip) => {
    let bestCandidate = null;
    let bestScore = -Infinity;

    for (let attempt = 0; attempt < 200; attempt += 1) {
      // Generate random position within the shell, respecting edge padding
      const edgePad = 6;
      const x = edgePad + chip.halfW + Math.random() * (shellW - 2 * edgePad - 2 * chip.halfW);
      const y = edgePad + chip.halfH + Math.random() * (shellH - 2 * edgePad - 2 * chip.halfH);

      // Skip if this chip's box overlaps the central badge
      if (chipOverlapsBadge(x, y, chip.halfW, chip.halfH, centerX, centerY, badgeRadius, badgeGap)) {
        continue;
      }

      // Check distance to all already-placed chips
      let minChipDist = Infinity;
      let overlapsPlaced = false;
      for (const p of placed) {
        // AABB overlap check between two chips
        const overlapX = (chip.halfW + p.halfW + chipGap) - Math.abs(x - p.x);
        const overlapY = (chip.halfH + p.halfH + chipGap) - Math.abs(y - p.y);
        if (overlapX > 0 && overlapY > 0) {
          overlapsPlaced = true;
          break;
        }
        const d = getDistance({ x, y }, p);
        if (d < minChipDist) minChipDist = d;
      }

      if (overlapsPlaced) continue;

      // Score: prefer positions further from the center (more visually spread)
      const distFromCenter = Math.hypot(x - centerX, y - centerY);
      const score = distFromCenter + minChipDist * 0.3;

      if (score > bestScore) {
        bestScore = score;
        bestCandidate = { x, y };
      }
    }

    // Absolute fallback: place at a fixed offset if nothing was found
    if (!bestCandidate) {
      const fallbackAngle = (placed.length * 2.1) + 0.5;
      bestCandidate = {
        x: centerX + Math.cos(fallbackAngle) * (badgeRadius + badgeGap + chip.halfW + 20),
        y: centerY + Math.sin(fallbackAngle) * (badgeRadius + badgeGap + chip.halfH + 20),
      };
      bestCandidate.x = clamp(bestCandidate.x, chip.halfW + 6, shellW - chip.halfW - 6);
      bestCandidate.y = clamp(bestCandidate.y, chip.halfH + 6, shellH - chip.halfH - 6);
    }

    placed.push({
      ...bestCandidate,
      key: `${chip.label}-${placed.length}`,
      halfW: chip.halfW,
      halfH: chip.halfH,
    });
  });

  return placed;
}

export function useOrbitChipLayout(chips = []) {
  return useMemo(() => createChipLayout(chips), [chips]);
}

export default useOrbitChipLayout;
