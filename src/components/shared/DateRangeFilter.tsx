"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function DateRangeFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialStart = searchParams.get("startDate") || "";
  const initialEnd = searchParams.get("endDate") || "";

  const [startDate, setStartDate] = useState(initialStart);
  const [endDate, setEndDate] = useState(initialEnd);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (startDate) params.set("startDate", startDate);
    else params.delete("startDate");

    if (endDate) params.set("endDate", endDate);
    else params.delete("endDate");

    router.push(`/trips?${params.toString()}`);
  }, [startDate, endDate]);

  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
      <div className="flex items-center gap-5">
        <label className="text-sm text-gray-600">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded-md px-2 py-1"
        />
      </div>

      <div className="flex items-center gap-5">
        <label className="text-sm text-gray-600">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded-md px-2 py-1"
        />
      </div>
    </div>
  );
}
