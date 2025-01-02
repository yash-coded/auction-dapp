"use client";
import { Auction, getAuctions } from "@/requests/getAuctions";
import { useQuery } from "@tanstack/react-query";
import { AuctionItemCard } from "./AuctionItemCard";
import { useSDK } from "@metamask/sdk-react";
import { Loader2 } from "lucide-react";

export const AuctionItemList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getAuctions"],
    queryFn: getAuctions,
  });
  const { account } = useSDK();

  const myAuctions = data?.filter(
    (auction: Auction) =>
      auction.seller.toLowerCase() === account?.toLowerCase()
  );

  if (!account) {
    return (
      <p className="mt-4">Connect your metamask wallet to view your auctions</p>
    );
  }

  return (
    <>
      {isLoading && <Loader2 className="animate-spin mt-4" />}
      {error && <p className="mt-4">Error: {error.message}</p>}
      {myAuctions && myAuctions.length === 0 && (
        <p className="mt-4">You do not have any active auctions</p>
      )}
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 grid-col-1  mt-4">
        {myAuctions?.map((auction, i) => (
          <div key={i} className="">
            <AuctionItemCard auction={auction} allowBid={false} />
          </div>
        ))}
      </div>
    </>
  );
};
