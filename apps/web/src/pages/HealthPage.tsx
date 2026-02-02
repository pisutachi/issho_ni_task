import type { HealthResponse } from "@issho/shared";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import { API_BASE_URL, fetchHealth } from "../lib/api";

type LoadState = "idle" | "loading" | "success" | "error";

export default function HealthPage() {
  const [state, setState] = useState<LoadState>("idle");
  const [data, setData] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadHealth = useCallback(async (signal?: AbortSignal) => {
    setState("loading");
    setError(null);

    try {
      const result = await fetchHealth(signal);
      setData(result);
      setState("success");
    } catch (err) {
      if (signal?.aborted) {
        return;
      }

      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      setState("error");
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void loadHealth(controller.signal);
    return () => controller.abort();
  }, [loadHealth]);

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="overline" color="text.secondary">
            API Health Check
          </Typography>
          <Typography variant="h4" fontWeight={700}>
            issho ni task
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {API_BASE_URL}
          </Typography>
        </Box>

        <Paper elevation={2} sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Typography variant="subtitle1">/health response</Typography>

            {state === "loading" && (
              <Stack direction="row" spacing={2} alignItems="center">
                <CircularProgress size={20} />
                <Typography variant="body2">Checking API...</Typography>
              </Stack>
            )}

            {state === "error" && error && (
              <Alert severity="error">{error}</Alert>
            )}

            {state === "success" && data && (
              <Stack spacing={1.5}>
                <Typography variant="body2">
                  Status: {data.data.status}
                </Typography>
                <Typography variant="body2">
                  Service: {data.data.service}
                </Typography>
                <Typography variant="body2">
                  Timestamp: {data.data.timestamp}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Request ID: {data.meta.request_id}
                </Typography>
              </Stack>
            )}

            <Box>
              <Button
                variant="contained"
                onClick={() => loadHealth()}
                disabled={state === "loading"}
              >
                Refresh
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
