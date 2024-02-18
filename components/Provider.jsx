"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import UpdatingProfilePicLoader from "@/components/Loaders/UpdatingProfilePicLoader";
import { useState } from "react";
import { LoaderContext } from "@/context/LoaderContext";

const Providers = ({ children }) => {
  const queryClient = new QueryClient();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
        {isLoading && <UpdatingProfilePicLoader />}
        <SessionProvider>{children}</SessionProvider>
      </LoaderContext.Provider>
    </QueryClientProvider>
  );
};

export default Providers;
