import { useSDK } from "@metamask/sdk-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

export const ConnectWalletButton = () => {
  const { account, sdk, connecting } = useSDK();
  const { toast } = useToast();

  const connect = async () => {
    try {
      await sdk?.connect();
      toast({
        title: "Connected successfully",
        description: `Connected to ${account}`,
      });
    } catch {
      toast({
        title: "Failed to connect",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="">
      <Button
        className=" "
        disabled={connecting}
        variant={"secondary"}
        onClick={connect}
      >
        <p className="text-ellipsis overflow-hidden lg:max-w-[10rem] md:max-w-[8rem] max-w-[6rem] ">
          {account ? account : "Connect Wallet"}
        </p>
      </Button>
    </div>
  );
};
