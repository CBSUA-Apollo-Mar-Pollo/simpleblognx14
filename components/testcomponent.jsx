"use client";

import { signOut } from "next-auth/react";
import React from "react";

const Testcomponent = () => {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: `/sign-in`,
        })
      }
    >
      sign out
    </button>
  );
};

export default Testcomponent;
