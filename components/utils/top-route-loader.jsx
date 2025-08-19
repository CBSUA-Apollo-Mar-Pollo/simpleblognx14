"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function TopLoader() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      NProgress.start();

      // Fake delay to simulate loading
      const timeout = setTimeout(() => {
        NProgress.done();
      }, 500); // adjust as needed

      previousPathname.current = pathname;

      return () => clearTimeout(timeout);
    }
  }, [pathname]);

  return null;
}
