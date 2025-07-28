"use client";

import { useEffect, useState } from 'react';
import { KOVA_DESIGN } from '@/lib/design-system';

interface DynamicLightTextProps {
  baseText: string;
  dynamicWords: string[];
  interval?: number;
  className?: string;
}

/**
 * DynamicLightText Component
 * Displays text with rotating dynamic words
 */
export function DynamicLightText({ 
  baseText, 
  dynamicWords, 
  interval = 3000,
  className = ''
}: DynamicLightTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % dynamicWords.length);
        setIsVisible(true);
      }, 250); // Half of transition duration
    }, interval);

    return () => clearInterval(timer);
  }, [dynamicWords.length, interval]);

  return (
    <>
      {baseText}{' '}
      <span 
        className={`inline-block transition-all duration-500 ease-in-out ${
          isVisible 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-5'
        } ${className}`}
        style={{ color: KOVA_DESIGN.colors.darkText }}
      >
        {dynamicWords[currentWordIndex]}
      </span>
    </>
  );
}