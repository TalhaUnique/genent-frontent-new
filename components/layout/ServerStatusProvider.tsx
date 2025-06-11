"use client";
import { useEffect, useState } from "react";
import apiEvents from "@/utils/apiEvents";
import { Modal, Box, Typography, CircularProgress } from "@mui/material";

export default function ServerStatusProvider() {

  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justofyItems: "center",
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  const [serverStarting, setServerStarting] = useState(false);

  useEffect(() => {
    apiEvents.on("serverStarting", () => {
      if (!serverStarting) {
        setServerStarting(true);
      }
    });

    apiEvents.on("serverReady", () => {
      setServerStarting(false);
    });

    return () => {
      apiEvents.all.clear();
    };
  }, [serverStarting]);

  return (
    <Modal
        open={serverStarting}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} width="60%">
        <CircularProgress color="warning" size={50} />
        <Typography variant="h6" color="textSecondary" mt={2}>
          Please wait while we set up the application...
        </Typography>
      </Box>
    </Modal>
  );
}

