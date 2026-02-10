export function _formatNumber(
  value: number | string | null | undefined,
  options: Intl.NumberFormatOptions = {}
): string {
  // Xử lý giá trị không hợp lệ
  if (value == null) return "—";

  const num = typeof value === "string" ? Number(value) : value;

  if (isNaN(num) || !isFinite(num)) return "—";

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 20,
    ...options,
  }).format(num);
}