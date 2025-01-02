import { ethers } from "ethers";
import AuctionManagerAbi from "@/contracts/abi/AuctionManagerAbi.json";

export interface EndAuctionRequest {
  auctionId: string;
}

export const endAuction = async (input: EndAuctionRequest): Promise<string> => {
  const { auctionId } = input;
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

  const tx = await auctionManagerContract.endAuction(auctionId);

  await tx.wait();

  return tx.hash;
};
