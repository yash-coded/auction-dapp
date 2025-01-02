"use client";
import { Auction } from "@/requests/getAuctions";
import { BsInfoCircle } from "react-icons/bs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsCopy } from "react-icons/bs";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "date-fns";

interface AuctionInformationDialogProps {
  auction: Auction;
}

export const AuctionInformationDialog = (
  input: AuctionInformationDialogProps
) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <BsInfoCircle className="text-gray-500 hover:text-gray-700 cursor-pointer text-lg" />
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Auction Information</DialogTitle>
          <DialogDescription>
            Auction contract information and bidding details
          </DialogDescription>
        </DialogHeader>

        <div className=" space-y-1">
          <InformationItem
            label="Contract Address"
            value={
              process.env.NEXT_PUBLIC_AUCTION_MANAGER_CONTRACT_ADDRESS as string
            }
            copyToClipboard
          />
          <InformationItem
            label="Seller"
            value={input.auction.seller}
            copyToClipboard
          />

          <InformationItem
            label="Highest Bid"
            value={input.auction.highestBid}
          />
          <InformationItem
            label="Highest Bidder"
            value={input.auction.highestBidder}
            copyToClipboard
          />
          <InformationItem
            label="Starting Bid"
            value={input.auction.startingBid}
          />
          <InformationItem
            label="Ends At"
            value={formatDate(input.auction.endTime, "MMM dd, y HH:mm:ss")}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

const InformationItem = (input: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  label: string;
  copyToClipboard?: boolean;
}) => {
  const { value, label, copyToClipboard = false } = input;
  const { toast } = useToast();
  return (
    <div>
      <span>{label}: </span>
      <div className="flex items-center space-x-2">
        <span className="text-gray-500 text-sm">{value}</span>
        {copyToClipboard && (
          <CopyToClipboard
            text={value}
            onCopy={() => {
              toast({
                title: "Copied to clipboard",
              });
            }}
          >
            <BsCopy className="text-sm cursor-pointer hover:text-gray-900 text-gray-500" />
          </CopyToClipboard>
        )}
      </div>
    </div>
  );
};
