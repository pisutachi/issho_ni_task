import { Alert, Button } from "@mui/material";

type StatusBannerProps = {
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
  onRetry?: () => void;
};

export default function StatusBanner({ status, error, onRetry }: StatusBannerProps) {
  if (status === "loading") {
    return <Alert severity="info">データを読み込み中です...</Alert>;
  }

  if (status === "error") {
    return (
      <Alert
        severity="error"
        action={
          onRetry ? (
            <Button color="inherit" size="small" onClick={onRetry}>
              再試行
            </Button>
          ) : undefined
        }
      >
        {error ?? "データの読み込みに失敗しました。"}
      </Alert>
    );
  }

  return null;
}
