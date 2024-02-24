"use client";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import BackgroundLoader from "@/components/Loaders/BackgroundLoader";
import { useState } from "react";
import { LoaderContext } from "@/context/LoaderContext";
import { ThemeProvider } from "next-themes";

const Providers = ({ children }) => {
  const queryClient = new QueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [loaderDescription, setLoaderDescription] = useState("");

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <LoaderContext.Provider
          value={{
            isLoading,
            setIsLoading,
            loaderDescription,
            setLoaderDescription,
          }}
        >
          {isLoading && (
            <BackgroundLoader loaderDescription={loaderDescription} />
          )}
          <SessionProvider>{children}</SessionProvider>
        </LoaderContext.Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Providers;
