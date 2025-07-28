import { useCallback, useRef } from 'react';

/**
 * useDebounce Hook
 * Returns a debounced version of the callback function that delays execution
 * until after the specified delay has elapsed since the last invocation.
 * 
 * @template T - Function type that extends a function with any parameters and return type
 * @param callback - The function to debounce
 * @param delay - The delay in milliseconds before executing the callback
 * @returns A debounced version of the callback function
 * 
 * @example
 * ```typescript
 * const debouncedSave = useDebounce((data: string) => {
 *   console.log('Saving:', data);
 * }, 500);
 * ```
 */
export function useDebounce<T extends (...args: readonly unknown[]) => unknown>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  ) as T;

  return debouncedCallback;
}