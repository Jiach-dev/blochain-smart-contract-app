import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Card, Typography, CircularProgress } from "@mui/material";

const USDTBalance: React.FC = () => {
  const [userAddress, setUserAddress] = useState<string>("");
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckBalance = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!userAddress) {
        throw new Error("Wallet address is required");
      }

      // Change this URL to match your backend
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/usdtBalance`, { 
        params: { userAddress } 
      });
      
      setBalance(response.data.balance);
    } catch (err) {
      setError("Error fetching balance");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ p: 3, mb: 2, textAlign: "center", backgroundColor: "#f5f5f5" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Check USDT Balance
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="Wallet Address"
        placeholder="Enter your wallet address"
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleCheckBalance} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Check Balance"}
      </Button>

      {error && <Typography color="error" mt={2}>{error}</Typography>}
      {balance && (
        <Typography variant="h6" color="green" mt={2}>
          Your USDT Balance: {balance} USDT
        </Typography>
      )}
    </Card>
  );
};

export default USDTBalance;
