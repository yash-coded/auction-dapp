"use client";
import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useSDK } from "@metamask/sdk-react";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";

export const Navbar = () => {
  const { account, sdk } = useSDK();

  const disconnect = () => {
    if (sdk) {
      sdk.terminate();
    }
  };
  return (
    <div>
      <div className="md:flex md:flex-row flex flex-col md:justify-between md:items-center md:space-y-0 space-y-4">
        <Link href={"/"}>
          <h1 className="lg:text-4xl  md:text-2xl text-lg font-extrabold cursor-pointer">
            Decentralized Auction
          </h1>
        </Link>
        <div className="flex space-x-4">
          <ConnectWalletButton />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer hover:bg-slate-500">
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-10 min-w-52">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/createAuction">
                <DropdownMenuItem>Create Auction</DropdownMenuItem>
              </Link>
              <Link href={`/myAuctions`}>
                <DropdownMenuItem>My Auctions</DropdownMenuItem>
              </Link>
              {account && (
                <DropdownMenuItem onClick={disconnect}>
                  <p className="text-red-600">Disconnect Wallet</p>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="mt-6">
        <Alert className="border border-yellow-500 bg-yellow-100 text-yellow-900">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Sepolia network</AlertTitle>
          <AlertDescription>
            This app uses Sepolia network. Please do not use real assets to
            interact with it
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};
