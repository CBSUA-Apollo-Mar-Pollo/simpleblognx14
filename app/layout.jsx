import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { Toaster } from "@/components/ui/Toaster";
import Providers from "@/components/utils/Provider";
import { SocketProvider } from "@/components/Providers/socket-provider";
import ChatWindow from "@/components/chat/chat-window";
import { Suspense } from "react";
import ClientSideScrollRestorer from "@/components/utils/client-side-scroll-restorer";
import BeforeUnload from "@/components/utils/before-unload";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("min-h-screen font-sons antialiased", poppins.className)}
      >
        <SocketProvider>
          <Providers>
            <div className="mx-auto dark:bg-neutral-900">
              <BeforeUnload>{children}</BeforeUnload>
            </div>
            <Suspense>
              <ClientSideScrollRestorer />
            </Suspense>
            <Toaster />
            <div className="fixed bottom-0 right-4">
              <ChatWindow />
            </div>
          </Providers>
        </SocketProvider>
      </body>
    </html>
  );
}
