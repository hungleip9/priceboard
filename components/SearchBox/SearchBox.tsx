"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "antd";

type Item = { username: string; age: number };

const allData: Item[] = Array.from({ length: 1_000_000 }, (_, i) => ({
  username: `user${i + 1}`,
  age: 18 + ((i * 17 + 23) % 43),
}));

const Page_Size = 30;

// Component con để reset state khi key thay đổi
function ListContent({ filtered }: { filtered: Item[] }) {
  const [loadedCount, setLoadedCount] = useState(Page_Size);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const items = useMemo(
    () => filtered.slice(0, loadedCount),
    [filtered, loadedCount],
  );

  const hasMore = loadedCount < filtered.length;

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);
    setLoadedCount((prev) => prev + Page_Size);
    setLoading(false);
  }, [loading, hasMore]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1 },
    );

    const current = loaderRef.current;
    if (current) observerRef.current.observe(current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [loadMore, loading, hasMore]);

  return (
    <>
      {items.map((item, idx) => (
        <div
          key={idx}
          style={{
            padding: "12px 16px",
            borderBottom: "1px solid #eee",
            fontSize: 15,
          }}
        >
          {item.username} • {item.age} tuổi
        </div>
      ))}

      {hasMore && (
        <div
          ref={loaderRef}
          style={{ padding: 20, textAlign: "center", color: "#666" }}
        >
          {loading ? "Đang tải...!" : "Kéo xuống để tải thêm!"}
        </div>
      )}

      {items.length === 0 && (
        <div style={{ padding: 40, textAlign: "center", color: "#999" }}>
          Không tìm thấy kết quả
        </div>
      )}
    </>
  );
}

export default function SearchInfiniteList() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const filtered = useMemo(() => {
    const lower = debouncedSearch.toLowerCase().trim();
    return lower
      ? allData.filter((item) => item.username.toLowerCase().includes(lower))
      : allData;
  }, [debouncedSearch]);

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: 16 }}>
      <h2>Search + Infinite Scroll</h2>
      <Input
        placeholder="Tìm username..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Tìm username..."
        style={{
          width: "100%",
          padding: "10px 12px",
          marginBottom: 16,
          fontSize: 16,
        }}
      /> */}

      <div
        style={{
          height: 420,
          overflowY: "auto",
          border: "1px solid #ddd",
          borderRadius: 8,
          background: "#fafafa",
        }}
      >
        <ListContent key={debouncedSearch} filtered={filtered} />
      </div>
    </div>
  );
}
