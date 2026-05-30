import Navbar from "@/components/utils/Navbar";
import React, { Suspense } from "react";
import logo from "@/public/crowlogo2.jpg";
import Image from "next/image";

export const metadata = {
  title: "Estorya",
  description: "All in one social media app",
};

const LoadingFallback = () => {
  return (
    <div className="bg-yellow-50 w-screen h-screen">
      <div className="flex flex-col space-y-2 justify-center items-center w-full h-full">
        <Image
          src={logo}
          className="h-32 w-32 rounded-full"
          alt="Feeling or activity icon"
        />
        <p className="text-3xl font-extrabold">Estorias</p>
      </div>
    </div>
  );
};

export default function Layout({ children }) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Navbar />
      {children}
    </Suspense>
  );
}
