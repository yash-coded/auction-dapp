import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useMutation } from "@tanstack/react-query";
import { placeBid, PlaceBidRequest } from "@/requests/placeBid";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/context/QueryProvider";
import { Loader2 } from "lucide-react";
import { BsCopy } from "react-icons/bs";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface BidForm {
  bidAmount: number;
}

interface PlaceBidProps {
  auctionId: string;
  highestBidAmount: number;
  startingBid: number;
}

export const PlaceBid = ({
  auctionId,
  highestBidAmount,
  startingBid,
}: PlaceBidProps) => {
  const [placeBidMode, setPlaceBidMode] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const { register, handleSubmit, formState, getValues } = useForm<BidForm>({
    mode: "onTouched",
    defaultValues: {
      bidAmount: highestBidAmount > 0 ? highestBidAmount : startingBid,
    },
  });

  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (input: PlaceBidRequest) => {
      return placeBid(input);
    },
    onSuccess: (data) => {
      toast({
        title: "Bid placed successfully",
        description: `Copy transaction hash`,
        action: (
          <CopyToClipboard text={data} onCopy={onCopyText}>
            <Button>
              <BsCopy />
            </Button>
          </CopyToClipboard>
        ),
      });

      setReviewMode(false);
      setPlaceBidMode(false);

      queryClient.refetchQueries({
        queryKey: ["getAuctions"],
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to place bid",
        description: error.message,
        variant: "destructive",
      });

      setReviewMode(false);
      setPlaceBidMode(false);
    },
  });

  const onSubmit = async (data: BidForm) => {
    mutation.mutate({
      auctionId,
      bidAmount: data.bidAmount,
    });
  };

  const onCopyText = () => {
    toast({
      title: "Copied to clipboard",
    });
  };

  return (
    <div>
      {!placeBidMode && (
        <Button className="w-full" onClick={() => setPlaceBidMode(true)}>
          Place Bid
        </Button>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {placeBidMode && !reviewMode && (
          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="Enter bid amount"
              className="border p-2 w-full"
              {...register("bidAmount", {
                required: true,
                min: {
                  value: highestBidAmount,
                  message: "Bid amount should be greater than the highest bid",
                },
                validate: () => {
                  return (
                    (getValues().bidAmount > highestBidAmount &&
                      getValues().bidAmount > startingBid) ||
                    "Bid amount should be greater than the highest bid and starting bid"
                  );
                },
              })}
            />

            <Button
              className="w-full"
              onClick={() => setReviewMode(true)}
              disabled={!!formState?.errors?.bidAmount}
            >
              Review
            </Button>
          </div>
        )}
        {formState.errors.bidAmount && (
          <p className="text-red-500 text-sm">
            {formState.errors.bidAmount.message}
          </p>
        )}

        {reviewMode && (
          <div className="flex space-x-2">
            <Button
              className="w-full bg-red-600 hover:bg-red-800"
              onClick={() => {
                setReviewMode(false);
                setPlaceBidMode(false);
              }}
              disabled={mutation.isPending}
            >
              {mutation.isPending && <Loader2 className="animate-spin" />}
              Cancel
            </Button>
            <Button
              className="w-full bg-green-600 hover:bg-green-800"
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending && <Loader2 className="animate-spin" />}
              Confirm
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};
