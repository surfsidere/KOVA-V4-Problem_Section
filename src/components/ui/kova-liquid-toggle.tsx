"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Building2, Users } from 'lucide-react';

const styles = {
  container: `relative flex items-center justify-center cursor-pointer h-16 w-80
    [--c-background:#0d1b2a]
    [--c-liquid:#FFF9E1]
    [--c-border:#FFF9E1]
    [transform:translateZ(0)]
    [-webkit-transform:translateZ(0)]
    [backface-visibility:hidden]
    [-webkit-backface-visibility:hidden]
    [perspective:1000]
    [-webkit-perspective:1000]`,
  track: `relative h-full w-full cursor-pointer appearance-none rounded-full
    border-2 transition-all duration-300
    [transform:translate3d(0,0,0)]
    [-webkit-transform:translate3d(0,0,0)]
    overflow-hidden`,
  svg: `pointer-events-none absolute inset-0 fill-[--c-liquid]
    [transform:translate3d(0,0,0)]
    [-webkit-transform:translate3d(0,0,0)]`,
  blob: `transform-gpu transition-all duration-600
    [transform:translate3d(0,0,0)]
    [-webkit-transform:translate3d(0,0,0)]
    [backface-visibility:hidden]
    [-webkit-backface-visibility:hidden]`,
  label: `absolute inset-0 flex items-center justify-center font-semibold text-base
    transition-colors duration-300 pointer-events-none z-20`,
  iconWrapper: `flex items-center gap-2`
};

interface KovaLiquidToggleProps {
  selected: 'instituciones' | 'aliados' | null;
  onSelectionChange: (selection: 'instituciones' | 'aliados') => void;
  className?: string;
}

export function KovaLiquidToggle({ 
  selected, 
  onSelectionChange, 
  className 
}: KovaLiquidToggleProps) {
  const [hoveredOption, setHoveredOption] = React.useState<'instituciones' | 'aliados' | null>(null);

  const getBlobPosition = () => {
    if (selected === 'instituciones') return 60; // Left position
    if (selected === 'aliados') return 260; // Right position
    if (hoveredOption === 'instituciones') return 80; // Partial left
    if (hoveredOption === 'aliados') return 240; // Partial right
    return 160; // Center
  };

  const getBlobScale = () => {
    if (selected) return 1.2; // Larger when selected
    if (hoveredOption) return 0.9; // Medium when hovered
    return 0.6; // Smaller in center
  };

  const getTextColor = (option: 'instituciones' | 'aliados') => {
    if (selected === option) return 'text-[#0d1b2a]'; // Dark text over liquid
    return 'text-[#FFF9E1]'; // Pale gold when not selected
  };

  const handleClick = (option: 'instituciones' | 'aliados') => {
    onSelectionChange(option);
  };

  return (
    <div className={cn(styles.container, className)}>
      <div 
        className={cn(
          styles.track,
          'bg-gradient-to-r from-[#0d1b2a] via-[#415a77] to-[#0d1b2a]',
          'border-[#FFF9E1] shadow-lg'
        )}
      >
        <svg
          viewBox="0 0 320 64"
          filter="url(#kova-goo)"
          className={styles.svg}
        >
          <circle
            className={styles.blob}
            cx={getBlobPosition()}
            cy="32"
            r="24"
            style={{
              transformOrigin: `${getBlobPosition()}px 32px`,
              transform: `scale(${getBlobScale()})`,
            }}
          />
        </svg>

        {/* Instituciones Label */}
        <div 
          className={cn(styles.label, 'left-0 w-40', getTextColor('instituciones'))}
          onClick={() => handleClick('instituciones')}
          onMouseEnter={() => setHoveredOption('instituciones')}
          onMouseLeave={() => setHoveredOption(null)}
        >
          <div className={styles.iconWrapper}>
            <Building2 className="w-5 h-5" />
            <span>Instituciones</span>
          </div>
        </div>

        {/* Aliados Label */}
        <div 
          className={cn(styles.label, 'right-0 w-40', getTextColor('aliados'))}
          onClick={() => handleClick('aliados')}
          onMouseEnter={() => setHoveredOption('aliados')}
          onMouseLeave={() => setHoveredOption(null)}
        >
          <div className={styles.iconWrapper}>
            <Users className="w-5 h-5" />
            <span>Aliados</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function KovaGooeyFilter() {
  return (
    <svg className="fixed w-0 h-0 pointer-events-none">
      <defs>
        <filter id="kova-goo">
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="3"
            result="blur"
          />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"
            result="goo"
          />
          <feComposite
            in="SourceGraphic"
            in2="goo"
            operator="atop"
          />
        </filter>
      </defs>
    </svg>
  );
}