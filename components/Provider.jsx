"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import BackgroundLoader from "@/components/Loaders/BackgroundLoader";
import { useState } from "react";
import { LoaderContext } from "@/context/LoaderContext";

const Providers = ({ children }) => {
  const queryClient = new QueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [loaderDescription, setLoaderDescription] = useState("");
  return (
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
  );
};

export default Providers;
