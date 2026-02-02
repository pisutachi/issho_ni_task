import { useCallback, useEffect, useState } from "react";

type AsyncState<T> = {
  data: T | null;
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
};

export function useApiData<T>(fetcher: () => Promise<T>) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    status: "idle",
    error: null,
  });

  const run = useCallback(async () => {
    setState((prev) => ({ ...prev, status: "loading", error: null }));

    try {
      const data = await fetcher();
      setState({ data, status: "success", error: null });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setState({ data: null, status: "error", error: message });
    }
  }, [fetcher]);

  useEffect(() => {
    void run();
  }, [run]);

  return {
    ...state,
    reload: run,
  };
}
