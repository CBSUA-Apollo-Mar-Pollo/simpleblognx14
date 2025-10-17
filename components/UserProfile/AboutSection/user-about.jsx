"use client";

import React, { useState } from "react";
import { Button } from "../../ui/Button";
import UserAboutOverView from "./user-about-overview";
import UserAboutPlacesLived from "./user-about-places-lived";
import UserAboutWorkAndEducation from "./user-about-work-and-education";
import UserAboutFamilyRelations from "./user-about-family-relations";
import UserAboutDetails from "./user-about-details";
import UserAboutLifeEvents from "./user-about-life-events";

const UserAbout = ({ user }) => {
  const [aboutNav, setAboutNav] = useState(1);
  return (
    <div className="bg-white drop-shadow-md shadow rounded-2xl">
      <div className="grid grid-cols-8">
        <div className="pl-2 pt-5 pb-2 col-span-2 border-r border-neutral-300">
          <h1 className="text-xl font-bold pl-3">About</h1>
          <div className="space-y-2 mt-3">
            <Button
              onClick={() => setAboutNav(1)}
              variant="ghost"
              className={`w-full justify-start p-0 pl-3 font-semibold text-neutral-600  text-[15px] ${
                aboutNav === 1 && "bg-blue-50 text-blue-600"
              }`}
            >
              Overview
            </Button>
            <Button
              onClick={() => setAboutNav(2)}
              variant="ghost"
              className={`w-full justify-start p-0 pl-3 font-semibold text-neutral-600  text-[15px] ${
                aboutNav === 2 && "bg-blue-50 text-blue-600"
              }`}
            >
              Work and education
            </Button>
            <Button
              onClick={() => setAboutNav(3)}
              variant="ghost"
              className={`w-full justify-start p-0 pl-3 font-semibold text-neutral-600  text-[15px] ${
                aboutNav === 3 && "bg-blue-50 text-blue-600"
              }`}
            >
              Places lived
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start p-0 pl-3 font-semibold text-neutral-600 text-[15px]"
            >
              Contact and basic info
            </Button>
            <Button
              onClick={() => setAboutNav(5)}
              variant="ghost"
              className={`w-full justify-start p-0 pl-3 font-semibold text-neutral-600  text-[15px] ${
                aboutNav === 5 && "bg-blue-50 text-blue-600"
              }`}
            >
              Family relationships
            </Button>
            <Button
              onClick={() => setAboutNav(6)}
              variant="ghost"
              className={`w-full justify-start p-0 pl-3 font-semibold text-neutral-600  text-[15px] ${
                aboutNav === 6 && "bg-blue-50 text-blue-600"
              }`}
            >
              Details about you
            </Button>
            <Button
              onClick={() => setAboutNav(7)}
              variant="ghost"
              className={`w-full justify-start p-0 pl-3 font-semibold text-neutral-600  text-[15px] ${
                aboutNav === 7 && "bg-blue-50 text-blue-600"
              }`}
            >
              Life events
            </Button>
          </div>
        </div>

        {aboutNav === 1 && <UserAboutOverView user={user} />}

        {aboutNav === 2 && <UserAboutWorkAndEducation />}

        {aboutNav === 3 && <UserAboutPlacesLived />}

        {aboutNav === 5 && <UserAboutFamilyRelations />}

        {aboutNav === 6 && <UserAboutDetails />}

        {aboutNav === 7 && <UserAboutLifeEvents />}
      </div>
    </div>
  );
};

export default UserAbout;
