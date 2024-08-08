import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { Toaster } from "@/components/ui/Toaster";
import Providers from "@/components/utils/Provider";
import { SocketProvider } from "@/components/Providers/socket-provider";

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
        <Providers>
          <SocketProvider>
            <div className="mx-auto dark:bg-neutral-900">{children}</div>
            <Toaster />
          </SocketProvider>
        </Providers>
      </body>
    </html>
  );
}
