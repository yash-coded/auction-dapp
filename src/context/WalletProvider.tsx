"use client";
import { MetaMaskProvider } from "@metamask/sdk-react";
export const WalletProvider = (props: { children: React.ReactNode }) => {
  const host =
    typeof window !== "undefined" ? window.location.host : "defaultHost";
  console.log("🚀 ~ WalletProvider ~ sdkOptions.dappMetadata.host:", host);
  const sdkOptions = {
    logging: { developerMode: false },
    checkInstallationImmediately: true,
    dappMetadata: {
      name: "Next-Metamask-Boilerplate",
      url: host, // using the host constant defined above
    },
  };
  return (
    <MetaMaskProvider sdkOptions={sdkOptions}>
      {props.children}
    </MetaMaskProvider>
  );
};
