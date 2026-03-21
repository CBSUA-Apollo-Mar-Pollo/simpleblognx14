import Navbar from "@/components/utils/Navbar";
import React, { Suspense } from "react";

export const metadata = {
  title: "Estorya",
  description: "All in one social media app",
};

export default function Layout({ children }) {
  return (
    <Suspense fallback={null}>
      <Navbar />
      {children}
    </Suspense>
  );
}
