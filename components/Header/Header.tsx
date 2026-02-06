import BaseIcon from "@/components/BaseIcon";
import "./Header.scss";
export default function Header() {
  return (
    <header className="w-full header">
      <div className="top">
        <div className="box-left">aaaa</div>
        <div className="box-right flex flex-row content-center">
          {/* <BaseIcon name="light" /> */}
          <BaseIcon
            className="cursor-pointer"
            width={20}
            height={20}
            name="dark"
          />
          <BaseIcon
            className="cursor-pointer"
            width={20}
            height={20}
            name="wallet"
          />
          <BaseIcon
            className="cursor-pointer"
            width={20}
            height={20}
            name="logout"
          />
        </div>
      </div>
      <div className="bottom">bottom</div>
    </header>
  );
}
