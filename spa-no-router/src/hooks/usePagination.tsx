import { useMemo, useState } from "react";
export function usePagination() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const start = useMemo(() => (page - 1) * limit, [page, limit]);

  return {
    page,
    start,
    setPage,
    limit,
    setLimit,
  };
}
