"use client";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import { SessionProvider, useSession } from "next-auth/react";
import BackgroundLoader from "@/components/Loaders/BackgroundLoader";
import { Suspense, useState } from "react";
import { LoaderContext } from "@/context/LoaderContext";
import { ThemeProvider } from "next-themes";
import { ScrollRestoration } from "@tanstack/react-router";
import { SocketProvider } from "./socket-provider";
import { TooltipProvider } from "../ui/tooltip";
import SwitchingProfileLoader from "../Loaders/switching-profile-loader";

const Providers = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  const [isLoading, setIsLoading] = useState(false);
  const [loaderDescription, setLoaderDescription] = useState("");
  const [isSwitchingProfile, setIsSwitchingProfile] = useState(false);
  const [profileInfo, setProfileInfo] = useState(null);

  return (
    <SocketProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <LoaderContext.Provider
              value={{
                isLoading,
                setIsLoading,
                loaderDescription,
                setLoaderDescription,
                isSwitchingProfile,
                setIsSwitchingProfile,
                setProfileInfo,
              }}
            >
              {isLoading && (
                <BackgroundLoader loaderDescription={loaderDescription} />
              )}

              {isSwitchingProfile && (
                <SwitchingProfileLoader profileInfo={profileInfo} />
              )}

              <TooltipProvider>{children}</TooltipProvider>
            </LoaderContext.Provider>
          </SessionProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </SocketProvider>
  );
};

export default Providers;
