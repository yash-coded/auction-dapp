"use client";
import { Auction } from "@/requests/getAuctions";
import Image from "next/image";
import FallbackImg from "../../public/falback-img.png";
import { differenceInSeconds, formatDistanceToNow } from "date-fns";
import { PlaceBid } from "./PlaceBid";
import { AuctionInformationDialog } from "./AuctionInformationDialog";
import { CashOut } from "./Cashout";
import { useSDK } from "@metamask/sdk-react";

interface AuctionItemCardProps {
  auction: Auction;
  allowBid?: boolean;
}

const urlMatcher =
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
const urlRegex = new RegExp(urlMatcher);

export const AuctionItemCard = (props: AuctionItemCardProps) => {
  const { auction, allowBid = true } = props;
  const { account } = useSDK();
  const isOwner = account?.toLowerCase() === auction.seller.toLowerCase();

  const auctionEnded = differenceInSeconds(auction.endTime, new Date()) < 0;

  return (
    <div className="border rounded-lg w-[20rem] h-full flex flex-col justify-between">
      <div className="p-2 border-b text-left">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold ">{auction.itemName}</h1>
          <AuctionInformationDialog auction={auction} />
        </div>
        <p className="text-md  text-ellipsis text-gray-600 overflow-hidden text-nowrap">
          {auction.description}
        </p>
      </div>
      <div className="min-w-40 min-h-40 relative border-b">
        <Image
          src={
            auction.imageUrl.match(urlRegex) ? auction.imageUrl : FallbackImg
          }
          alt={auction.itemName}
          fill
          className="object-contain"
        />
      </div>

      <div className="p-2">
        <p className="text-sm text-ellipsis overflow-hidden">
          <span className="font-semibold">Starting Bid:</span>
          {auction.startingBid}
        </p>
        <p className="text-sm text-ellipsis overflow-hidden">
          <span className="font-semibold">Highest Bid:</span>{" "}
          {auction.highestBid}
        </p>

        <p className="text-sm text-ellipsis overflow-hidden">
          {!auctionEnded ? (
            <>
              <span className="font-semibold"> Ends in:</span>{" "}
              {formatDistanceToNow(auction.endTime)}
            </>
          ) : (
            <span className="font-semibold text-red-600"> Auction Ended</span>
          )}
        </p>
        {allowBid && !auctionEnded && (
          <div className="mt-2">
            <PlaceBid
              auctionId={auction.id}
              highestBidAmount={auction.highestBid}
              startingBid={auction.startingBid}
            />
          </div>
        )}

        {auctionEnded && isOwner && (
          <div className="mt-2">
            <CashOut auctionId={auction.id} />
          </div>
        )}
      </div>
    </div>
  );
};
