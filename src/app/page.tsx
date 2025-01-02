"use client";

import { useQuery } from "@tanstack/react-query";
import { getAuctions } from "../requests/getAuctions";
import { AuctionItemCard } from "@/components/AuctionItemCard";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getAuctions"],
    queryFn: getAuctions,
  });
  const list = data && [...data];
  return (
    <div className="">
      <div className="mt-8 grid ">
        <h1 className="text-2xl font-bold ">All Listings</h1>
        {isLoading && <Loader2 className="animate-spin mt-4" />}
        {error && <p>Error: {error.message}</p>}
        {data && data.length === 0 && (
          <p className="mt-4">No active auctions</p>
        )}
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 grid-col-1  mt-4">
          {list?.map((auction, i) => (
            <div key={i} className="">
              <AuctionItemCard auction={auction} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
