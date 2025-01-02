"use client";
import { MetaMaskProvider } from "@metamask/sdk-react";
export const WalletProvider = (props: { children: React.ReactNode }) => {
  const host =
    typeof window !== "undefined" ? window.location.host : "defaultHost";
  const sdkOptions = {
    logging: { developerMode: true },
    checkInstallationImmediately: true,
    dappMetadata: {
      name: "Next-Metamask-Boilerplate",
      url: host, // using the host constant defined above
    },
  };
  return (
    <MetaMaskProvider sdkOptions={sdkOptions} debug>
      {props.children}
    </MetaMaskProvider>
  );
};
