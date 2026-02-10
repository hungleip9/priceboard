import Markets from "@/components/Markets/Markets";
import BuySell from "@/components/BuySell/BuySell";
export default function page() {
  return (
    <div className="w-full h-[1277px] flex flex-row">
      <Markets />
      <div className="w-[618px] text border mr-[16.4px]">Box center</div>
      <BuySell />
    </div>
  );
}
