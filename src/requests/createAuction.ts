import { differenceInSeconds } from "date-fns";
import { ethers } from "ethers";
import AuctionManagerAbi from "@/contracts/abi/AuctionManagerAbi.json";

export interface CreateAuctionRequest {
  name: string;
  description: string;
  image: string;
  startingBid: number;
  duration: string;
}

export const createAuction = async (
  input: CreateAuctionRequest
): Promise<string> => {
  const { description, duration, image, name, startingBid } = input;
  const endDate = new Date(duration);

  await window.ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const durationInSecondsFromNow = differenceInSeconds(endDate, new Date());

  const contractAddress = process.env[
    "NEXT_PUBLIC_AUCTION_MANAGER_CONTRACT_ADDRESS"
  ] as string;

  const auctionManagerContract = new ethers.Contract(
    contractAddress,
    AuctionManagerAbi,
    signer
  );

  const tx = await auctionManagerContract.createAuction(
    name,
    description,
    image,
    ethers.parseEther(startingBid.toString()),
    durationInSecondsFromNow
  );
  await tx.wait();

  return tx.hash;
};
