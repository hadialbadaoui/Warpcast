// src/hooks/useNFTCheck.ts
import { useEffect, useState } from "react";
import { readContract } from "wagmi/actions";
import { wagmiConfig } from "../wagmi";

export default function useNFTCheck(userAddress?: `0x${string}`) {
  const [hasNFT, setHasNFT] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkNFT() {
      if (!userAddress) return;
      setLoading(true);
      try {
        const balance = await readContract(wagmiConfig, {
          address: "0xYourNFTContractAddress" as `0x${string}`,
          abi: [
            {
              name: "balanceOf",
              type: "function",
              stateMutability: "view",
              inputs: [{ name: "owner", type: "address" }],
              outputs: [{ name: "", type: "uint256" }],
            },
          ],
          functionName: "balanceOf",
          args: [userAddress],
        });

        setHasNFT(Number(balance) > 0);
      } catch (err) {
        console.error("NFT check failed", err);
      } finally {
        setLoading(false);
      }
    }

    checkNFT();
  }, [userAddress]);

  return { hasNFT, loading };
}
