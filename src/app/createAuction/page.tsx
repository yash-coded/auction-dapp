"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  createAuction,
  CreateAuctionRequest,
} from "../../requests/createAuction";
import { useToast } from "@/hooks/use-toast";
import { BsCopy } from "react-icons/bs";
import { Loader2 } from "lucide-react";
import CopyToClipboard from "react-copy-to-clipboard";

interface AuctionForm {
  name: string;
  description: string;
  image: string;
  startingBid: number;
  duration: string;
}

const CreateAuctionPage = () => {
  const { register, handleSubmit, reset } = useForm<AuctionForm>();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async (data: CreateAuctionRequest) => {
      return createAuction(data);
    },
    onSuccess: (data) => {
      toast({
        title: "Auction created successfully!",
        description: `Copy transaction hash`,
        action: (
          <CopyToClipboard text={data} onCopy={onCopyText}>
            <Button>
              <BsCopy />
            </Button>
          </CopyToClipboard>
        ),
      });

      reset();
    },

    onError: (error) => {
      toast({
        title: "Failed to create auction",
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

  const onSubmit = handleSubmit(async (data) => {
    mutation.mutate({
      description: data.description,
      duration: data.duration,
      image: data.image,
      name: data.name,
      startingBid: data.startingBid,
    });
  });

  return (
    <div className="mt-8">
      <h1 className="text-2xl font-bold text-gray-700">Create Auction</h1>

      <form className="mt-8 space-y-4" onSubmit={onSubmit}>
        <Input
          placeholder="Name"
          {...register("name", {
            required: true,
          })}
        />
        <Input
          placeholder="Description"
          {...register("description", {
            required: true,
          })}
        />
        <Input
          placeholder="Image URL"
          {...register("image", {
            required: true,
          })}
        />
        <Input
          placeholder="Starting Bid"
          {...register("startingBid", {
            required: true,
            validate: (value) => {
              return value > 0 || "Starting bid must be greater than 0";
            },
          })}
        />
        <Input
          placeholder="End Time"
          type="datetime-local"
          {...register("duration", {
            required: true,
          })}
        />

        <Button
          className="w-full  mt-4 "
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending && <Loader2 className="animate-spin" />}
          Create Auction
        </Button>
      </form>
    </div>
  );
};

export default CreateAuctionPage;
