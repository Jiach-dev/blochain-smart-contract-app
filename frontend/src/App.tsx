import React from "react";
import { Container, CssBaseline, Typography } from "@mui/material";
import USDTBalance from "./components/USDTBalance";

const App: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <CssBaseline />
      <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
        Interact with USDT Smart Contract
      </Typography>
      <USDTBalance />
    </Container>
  );
};

export default App;
