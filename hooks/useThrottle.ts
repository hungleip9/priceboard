import { useEffect, useRef, useState } from 'react';

type ThrottleMode = 'leading' | 'trailing';

interface UseThrottleOptions {
  delay?: number;
  mode?: ThrottleMode; // 'leading' hoặc 'trailing'
}

/**
 * Hook throttle giá trị input.
 * - mode = 'leading'  : Update NGAY lần đầu mỗi chu kỳ, bỏ qua các lần trong delay.
 * - mode = 'trailing' : Update giá trị MỚI NHẤT sau delay (lấy lần cuối).
 *
 * @param value Giá trị cần throttle (thường là state từ event nhanh như scroll, resize, mouse move...)
 * @param options.delay Thời gian throttle (ms), mặc định 200
 * @param options.mode 'leading' | 'trailing', mặc định 'leading'
 */
export function useThrottle<T>(
  value: T,
  options: UseThrottleOptions = {}
): T {
  const { delay = 200, mode = 'leading' } = options;

  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecutedRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const latestValueRef = useRef<T>(value); // Chỉ dùng cho trailing

  useEffect(() => {
    latestValueRef.current = value; // Luôn cập nhật giá trị mới nhất

    const now = Date.now();

    if (mode === 'leading') {
      // Leading: update ngay nếu đủ thời gian từ lần trước
      if (now - lastExecutedRef.current >= delay) {
        // Đẩy setState ra async để tránh warning "synchronous setState in effect"
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setThrottledValue(value);
          lastExecutedRef.current = Date.now();
          timeoutRef.current = null;
        }, 0);
      }
      // Không trailing → bỏ qua nếu chưa đủ delay
    } else {
      // Trailing mode: lên lịch update giá trị mới nhất sau delay
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setThrottledValue(latestValueRef.current);
        lastExecutedRef.current = Date.now();
        timeoutRef.current = null;
      }, delay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [value, delay, mode]);

  return throttledValue;
}