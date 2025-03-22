from fastapi import FastAPI, Query
from web3 import Web3
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware


# Load environment variables
load_dotenv()

INFURA_API_URL = os.getenv("INFURA_API_URL", "https://mainnet.infura.io/v3/3b3d1093f4d44ef5850fe529bdcceb74")
USDT_CONTRACT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7"

# ABI for balanceOf function
USDT_ABI = [
    {
        "constant": True,
        "inputs": [{"name": "who", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": False,
        "stateMutability": "view",
        "type": "function"
    }
]

# Initialize FastAPI & Web3
app = FastAPI()
# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://16.171.174.178:3000", "http://localhost:3000", "http://127.0.0.1:3000", "http://usdt-load-balancer-2001650523.eu-north-1.elb.amazonaws.com"],
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)
web3 = Web3(Web3.HTTPProvider(INFURA_API_URL))
usdt_contract = web3.eth.contract(address=USDT_CONTRACT_ADDRESS, abi=USDT_ABI)
# ✅ Add this to avoid 404 on "/"
@app.get("/")
def root():
    return {"message": "API is running"}

@app.get("/api/usdtBalance")
def get_usdt_balance(userAddress: str = Query(..., description="Ethereum wallet address")):
    if not web3.is_address(userAddress):
        return {"error": "Invalid Ethereum address"}
    
    try:
        balance = usdt_contract.functions.balanceOf(userAddress).call()
        balance_in_usdt = balance / 1e6  # Convert from 6 decimals to readable USDT
        return {"balance": str(balance_in_usdt)}
    except Exception as e:
        return {"error": f"Error fetching balance: {str(e)}"}
