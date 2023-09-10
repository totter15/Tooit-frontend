import { useCallback, useEffect } from 'react';

export default function useDebounce<T>(
  func: () => void,
  delay: number,
  deps: T,
) {
  const callback = useCallback(func, [deps]);

  useEffect(() => {
    const timer = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [callback, delay]);
}
