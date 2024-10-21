"use client";

import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useSocket } from "../Providers/socket-provider";
import axios from "axios";

const BeforeUnload = ({ children }) => {
  const { data: session } = useSession();
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) {
      return;
    }
    const handleBeforeUnload = async () => {
      socket.emit("sign-out", session.user.id);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [socket]);

  return <div>{children}</div>;
};

export default BeforeUnload;
