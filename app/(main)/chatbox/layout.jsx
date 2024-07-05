import Navbar from "@/components/utils/Navbar";
import React from "react";

export const metadata = {
  title: "Estorya",
  description: "All in one social media app",
};

const ChatLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default ChatLayout;
