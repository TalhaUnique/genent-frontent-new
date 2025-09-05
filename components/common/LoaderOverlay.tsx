import * as React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

type LoaderOverlayProps = {
  open: boolean;
  message: string;
};

export function LoaderOverlay({ open, message }: LoaderOverlayProps) {
  if (!open) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        bgcolor: "rgba(0,0,0,0.3)",
        zIndex: (theme) => theme.zIndex.modal + 1,
        pointerEvents: "auto",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <CircularProgress />
        <Typography variant="body1" color="common.white">
          {message}
        </Typography>
      </Box>
    </Box>
  );
}