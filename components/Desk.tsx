"use client";

import { useEffect, useRef, useState } from "react";
import { getDeskFeed, type DeskItem } from "@/lib/desk";

type FeedRow = DeskItem & { rowId: number; timestamp: number };

function formatTime(timestamp: number): string {
  const d = new Date(timestamp);
  return (
    String(d.getHours()).padStart(2, "0") +
    ":" +
    String(d.getMinutes()).padStart(2, "0")
  );
}

function formatClock(d: Date): string {
  return (
    [d.getHours(), d.getMinutes(), d.getSeconds()]
      .map((v) => String(v).padStart(2, "0"))
      .join(":") + " CET"
  );
}

export default function Desk() {
  const [pool, setPool] = useState<DeskItem[]>([]);
  const [rows, setRows] = useState<FeedRow[]>([]);
  const [clock, setClock] = useState("");
  const counter = useRef(0);

  useEffect(() => {
    let cancelled = false;
    getDeskFeed().then((items) => {
      if (cancelled || items.length === 0) return;
      setPool(items);
      const now = Date.now();
      const initial: FeedRow[] = [];
      for (let k = 5; k >= 0; k--) {
        const item = items[counter.current % items.length];
        initial.push({ ...item, rowId: counter.current, timestamp: now - k * 140_000 });
        counter.current += 1;
      }
      setRows(initial);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (pool.length === 0) return;
    const id = setInterval(() => {
      const item = pool[counter.current % pool.length];
      const newRow: FeedRow = { ...item, rowId: counter.current, timestamp: Date.now() };
      counter.current += 1;
      setRows((prev) => [newRow, ...prev].slice(0, 7));
    }, 3600);
    return () => clearInterval(id);
  }, [pool]);

  useEffect(() => {
    setClock(formatClock(new Date()));
    const id = setInterval(() => setClock(formatClock(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-24 border-t border-b border-line bg-black">
      <div className="max-w-[1240px] mx-auto px-8">
        <div className="flex items-center gap-3 py-4 border-b border-white/10">
          <span
            className="live-dot w-2 h-2 rounded-full bg-yellow shrink-0"
            aria-hidden="true"
          />
          <span className="mono text-white/60">The desk — live now</span>
          <span className="mono text-[13px] text-yellow ml-auto tabular-nums">
            {clock || "--:--:-- CET"}
          </span>
        </div>

        <div className="h-[200px] overflow-hidden relative">
          {rows.map((row) => (
            <div
              key={row.rowId}
              className="grid grid-cols-[56px_76px_1fr] sm:grid-cols-[64px_92px_1fr_108px] gap-5 items-center py-3.5 border-b border-white/10 text-[15px]"
            >
              <span className="mono text-[12px] text-white/50">
                {formatTime(row.timestamp)}
              </span>
              <span className="mono text-[12px] text-yellow">{row.lang}</span>
              <span className="text-white/90 overflow-hidden text-ellipsis whitespace-nowrap">
                {row.what}
              </span>
              <span className="hidden sm:block mono text-[11px] text-white/50 text-right">
                {row.client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
