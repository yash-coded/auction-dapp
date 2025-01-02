import { AuctionItemList } from "@/components/AuctionItemList";

const MyAuctionsPage = async () => {
  return (
    <div className="">
      <div className="mt-8 grid ">
        <h1 className="text-2xl font-bold">My Auctions</h1>
        <AuctionItemList />
      </div>
    </div>
  );
};

export default MyAuctionsPage;
