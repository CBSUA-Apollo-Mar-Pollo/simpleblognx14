"use client";

import { useState, useEffect, useRef } from "react";
import ProfileButtons from "./ProfileSection/ProfileButtons";

const StickDiv = ({ user }) => {
  function useSticky() {
    const ref = useRef();

    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
      if (!ref.current) {
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsSticky(entry.intersectionRatio < 1); // Trigger when the element is not fully visible
        },
        {
          threshold: [0], // This will trigger the callback as soon as any part of the element is out of view
          rootMargin: "-1px 0px 0px 0px", // Adjust this as necessary to trigger the effect earlier
        }
      );

      observer.observe(ref.current);

      return () => observer.disconnect();
    }, []);

    return { ref, isSticky };
  }

  const { ref, isSticky } = useSticky();

  console.log(isSticky); // See if the state updates when you scroll

  return (
    <div
      ref={ref}
      className={`sticky top-[3.5rem] z-20 ${isSticky ? "hidden" : ""}`}
    >
      <div className="pr-[14vw] bg-white w-full">
        <ProfileButtons userId={user.id} />
      </div>
    </div>
  );
};

export default StickDiv;
