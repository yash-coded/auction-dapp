import { ethers } from "ethers";
import AuctionManagerAbi from "@/contracts/abi/AuctionManagerAbi.json";

export interface PlaceBidRequest {
  auctionId: string;
  bidAmount: number;
}

export const placeBid = async (input: PlaceBidRequest): Promise<string> => {
  const { auctionId, bidAmount } = input;
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const contractAddress = process.env[
    "NEXT_PUBLIC_AUCTION_MANAGER_CONTRACT_ADDRESS"
  ] as string;

  const auctionManagerContract = new ethers.Contract(
    contractAddress,
    AuctionManagerAbi,
    signer
  );

  const tx = await auctionManagerContract.placeBid(auctionId, {
    value: ethers.parseEther(bidAmount.toString()),
  });

  await tx.wait();

  return tx.hash;
};
