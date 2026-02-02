import { Alert, Button } from "@mui/material";

type StatusBannerProps = {
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
  onRetry?: () => void;
};

export default function StatusBanner({ status, error, onRetry }: StatusBannerProps) {
  if (status === "loading") {
    return <Alert severity="info">Loading data...</Alert>;
  }

  if (status === "error") {
    return (
      <Alert
        severity="error"
        action={
          onRetry ? (
            <Button color="inherit" size="small" onClick={onRetry}>
              Retry
            </Button>
          ) : undefined
        }
      >
        {error ?? "Failed to load data."}
      </Alert>
    );
  }

  return null;
}
