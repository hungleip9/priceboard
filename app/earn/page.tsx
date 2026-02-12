import Link from "next/link";
export default function Page() {
  return (
    <div>
      <p className="text">Earn</p>
      <Link
        key="/trade"
        href="/trade"
        className={`text underline text-2xl mr-6 leading-5`}
      >
        Go to Trade
      </Link>
    </div>
  );
}
