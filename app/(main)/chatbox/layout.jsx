import Navbar from "@/components/utils/Navbar";
import React from "react";

export const metadata = {
  title: "Estorya",
  description: "All in one social media app",
};

const ChatLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
};

export default ChatLayout;
