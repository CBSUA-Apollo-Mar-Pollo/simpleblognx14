"use client";

import React, { useState } from "react";
import { Button } from "../../ui/Button";
import UserAboutOverView from "./user-about-overview";
import UserAboutPlacesLived from "./user-about-places-lived";
import UserAboutWorkAndEducation from "./user-about-work-and-education";
import UserAboutFamilyRelations from "./user-about-family-relations";
import UserAboutDetails from "./user-about-details";
import UserAboutLifeEvents from "./user-about-life-events";
import { useRouter } from "next/navigation";

const UserAbout = ({ user, aboutTab }) => {
  const router = useRouter();
  const aboutTabMap = {
    about_overview: 1,
    about_work_and_education: 2,
    about_places: 3,
    about_contacts_and_basic_info: 4,
    about_family_and_relationship: 5,
    about_details: 6,
    about_life_events: 7,
  };

  // Fallback to 1 if the aboutTab doesn't match any key
  const initialTab = aboutTabMap[aboutTab] ?? 1;

  const [aboutNav, setAboutNav] = useState(initialTab);
  return (
    <div className="bg-white drop-shadow-md shadow rounded-2xl">
      <div className="grid grid-cols-8">
        <div className="pl-2 pt-5 pb-2 col-span-2 border-r border-neutral-300">
          <h1 className="text-xl font-bold pl-3">About</h1>
          <div className="space-y-2 mt-3">
            <Button
              onClick={() => router.push(`/user/${user.id}/about_overview`)}
              variant="ghost"
              className={`w-full justify-start p-0 pl-3 font-semibold text-neutral-600  text-[15px] ${
                aboutNav === 1 && "bg-blue-50 text-blue-600"
              }`}
            >
              Overview
            </Button>
            <Button
              onClick={() =>
                router.push(`/user/${user.id}/about_work_and_education`)
              }
              variant="ghost"
              className={`w-full justify-start p-0 pl-3 font-semibold text-neutral-600  text-[15px] ${
                aboutNav === 2 && "bg-blue-50 text-blue-600"
              }`}
            >
              Work and education
            </Button>
            <Button
              onClick={() => router.push(`/user/${user.id}/about_places`)}
              variant="ghost"
              className={`w-full justify-start p-0 pl-3 font-semibold text-neutral-600  text-[15px] ${
                aboutNav === 3 && "bg-blue-50 text-blue-600"
              }`}
            >
              Places lived
            </Button>
            <Button
              onClick={() =>
                router.push(`/user/${user.id}/about_contacts_and_basic_info`)
              }
              variant="ghost"
              className="w-full justify-start p-0 pl-3 font-semibold text-neutral-600 text-[15px]"
            >
              Contact and basic info
            </Button>
            <Button
              onClick={() =>
                router.push(`/user/${user.id}/about_family_and_relationship`)
              }
              variant="ghost"
              className={`w-full justify-start p-0 pl-3 font-semibold text-neutral-600  text-[15px] ${
                aboutNav === 5 && "bg-blue-50 text-blue-600"
              }`}
            >
              Family relationships
            </Button>
            <Button
              onClick={() => router.push(`/user/${user.id}/about_details`)}
              variant="ghost"
              className={`w-full justify-start p-0 pl-3 font-semibold text-neutral-600  text-[15px] ${
                aboutNav === 6 && "bg-blue-50 text-blue-600"
              }`}
            >
              Details about you
            </Button>
            <Button
              onClick={() => router.push(`/user/${user.id}/about_life_events`)}
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
