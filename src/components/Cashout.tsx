"use client";
import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { endAuction, EndAuctionRequest } from "@/requests/endAuction";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CopyToClipboard from "react-copy-to-clipboard";
import { BsCopy } from "react-icons/bs";
import { queryClient } from "@/context/QueryProvider";

interface CashOutProps {
  auctionId: string;
}

export const CashOut = ({ auctionId }: CashOutProps) => {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: (input: EndAuctionRequest) => endAuction(input),
    onSuccess: (data) => {
      toast({
        title: "Cashout successful",
        description: `Copy transaction hash`,
        action: (
          <CopyToClipboard text={data} onCopy={onCopyText}>
            <Button>
              <BsCopy />
            </Button>
          </CopyToClipboard>
        ),
      });

      queryClient.refetchQueries({
        queryKey: ["getAuctions"],
      });
    },

    onError: (error) => {
      toast({
        title: "Failed to cashout",
        variant: "destructive",
        description: error.message,
      });
    },
  });

  const onCopyText = () => {
    toast({
      title: "Copied to clipboard",
    });
  };

  return (
    <Button
      className="w-full bg-green-600 hover:bg-green-800 p-2 rounded-lg"
      disabled={mutation.isPending}
      onClick={() => mutation.mutate({ auctionId })}
    >
      {mutation.isPending && <Loader2 className="animate-spin" />}
      Cashout
    </Button>
  );
};
