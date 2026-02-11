import BaseIcon from "@/components/BaseIcon";
export default function ChangeBox(
  changePercent: number | string = 0,
  className = "",
  spanClassName = "",
  size = 12,
  flashUI = false,
) {
  const change = Number(Number(changePercent).toFixed(2)) || 0;
  const isPositive = change >= 0;
  let colorClass = "";
  if (flashUI) {
    colorClass = isPositive ? "box-green" : "box-red";
  } else {
    colorClass = isPositive ? "text-green" : "text-red";
  }
  const iconName = isPositive ? "arr-up" : "arr-down";
  const displayValue = isPositive ? `+${change}` : change;

  return (
    <div
      className={`flex flex-row content-center items-center ${colorClass} ${className}`}
    >
      <BaseIcon width={size} height={size} name={iconName} />
      <span className={`text-sm ${spanClassName}`}>{displayValue}%</span>
    </div>
  );
}
