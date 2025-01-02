"use client";
import { ethers } from "ethers";
import AuctionManagerAbi from "@/contracts/abi/AuctionManagerAbi.json";

export interface AuctionContract {
  auctionId: number;
  itemName: string;
  description: string;
  imageUrl: string;
  seller: string;
  startingBid: number;
  highestBid: number;
  highestBidder: string;
  endTime: number;
  isActive: boolean;
}

export interface Auction
  extends Omit<
    AuctionContract,
    "endTime" | "startingBid" | "highestBid" | "auctionId"
  > {
  id: string;
  endTime: Date;
  startingBid: number;
  highestBid: number;
}

const getAuctions = async (): Promise<Auction[]> => {
  // await window.ethereum.request({
  //   method: "eth_requestAccounts",
  // });

  const provider = new ethers.BrowserProvider(window.ethereum);

  const contractAddress = process.env[
    "NEXT_PUBLIC_AUCTION_MANAGER_CONTRACT_ADDRESS"
  ] as string;
  const auctionManagerContract = new ethers.Contract(
    contractAddress,
    AuctionManagerAbi,
    provider
  );

  const auctions = await auctionManagerContract.getActiveAuctions();
  const typedAuction: Auction[] = auctions.map(
    (auction: AuctionContract): Auction => {
      const endTimeInSeconds = Number(auction.endTime);
      const endTimeDate = new Date(endTimeInSeconds * 1000);

      return {
        id: auction.auctionId.toString(),
        itemName: auction.itemName,
        description: auction.description,
        imageUrl: auction.imageUrl,
        seller: auction.seller,
        startingBid: parseFloat(ethers.formatEther(auction.startingBid)),
        highestBid: parseFloat(ethers.formatEther(auction.highestBid)),
        highestBidder: auction.highestBidder,
        endTime: endTimeDate,
        isActive: auction.isActive,
      };
    }
  );

  return typedAuction;
};

export { getAuctions };
