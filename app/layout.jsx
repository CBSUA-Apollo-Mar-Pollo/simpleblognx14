import { Poppins } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/Toaster";
import Providers from "@/components/Providers/Provider";
import ChatWindow from "@/components/chat/chat-window";
import ClientSideScrollRestorer from "@/components/utils/client-side-scroll-restorer";
import BeforeUnload from "@/components/utils/before-unload";
import NextTopLoader from "nextjs-toploader";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("min-h-screen font-sons antialiased", poppins.className)}
      >
        <Providers>
          <NextTopLoader color="#ffbb00" height={4} showSpinner={false} />
          <div className="mx-auto dark:bg-neutral-900">
            <BeforeUnload>
              <Suspense>{children}</Suspense>
            </BeforeUnload>
          </div>
          <Suspense>
            <ClientSideScrollRestorer />
          </Suspense>
          <Toaster />
          <div className="fixed bottom-0 right-4">
            <ChatWindow />
          </div>
        </Providers>
      </body>
    </html>
  );
}
