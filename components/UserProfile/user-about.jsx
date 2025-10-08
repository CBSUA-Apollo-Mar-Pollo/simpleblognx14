"use client";

import React, { useState } from "react";
import { Button } from "../ui/Button";
import { PlusCircle } from "lucide-react";

const UserAbout = () => {
  const [aboutNav, setAboutNav] = useState(1);
  return (
    <div className="bg-white drop-shadow-md shadow rounded-2xl">
      <div className="grid grid-cols-8">
        <div className="px-1 pt-3 pb-2 col-span-2 border-r border-neutral-300">
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

        {aboutNav === 1 && (
          <div className="col-span-6 px-4 pt-10 pb-4 space-y-8">
            <Button
              variant="ghost"
              className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
            >
              <PlusCircle className="text-blue-600" />
              <p className="text-blue-600">Life events</p>
            </Button>
            <Button
              variant="ghost"
              className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
            >
              <PlusCircle className="text-blue-600" />
              <p className="text-blue-600">Add highschool</p>
            </Button>
            <Button
              variant="ghost"
              className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
            >
              <PlusCircle className="text-blue-600" />
              <p className="text-blue-600">Add college</p>
            </Button>
            <Button
              variant="ghost"
              className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
            >
              <PlusCircle className="text-blue-600" />
              <p className="text-blue-600">Add current city</p>
            </Button>
            <Button
              variant="ghost"
              className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
            >
              <PlusCircle className="text-blue-600" />
              <p className="text-blue-600">Add hometown</p>
            </Button>
            <Button
              variant="ghost"
              className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
            >
              <PlusCircle className="text-blue-600" />
              <p className="text-blue-600">Add relationsh status</p>
            </Button>
            <Button
              variant="ghost"
              className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
            >
              <PlusCircle className="text-blue-600" />
              <p className="text-blue-600">Add phone number</p>
            </Button>
          </div>
        )}

        {aboutNav === 2 && (
          <div className="col-span-6 px-4 pt-10 pb-4 space-y-8">
            <div className="space-y-4">
              <h1 className="font-semibold">Work</h1>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
              >
                <PlusCircle className="text-blue-600" />
                <p className="text-blue-600">Add a workspace</p>
              </Button>
            </div>
            <div className="space-y-4">
              <h1 className="font-semibold">College</h1>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
              >
                <PlusCircle className="text-blue-600" />
                <p className="text-blue-600">Add college</p>
              </Button>
            </div>
            <div className="space-y-4">
              <h1 className="font-semibold">High School</h1>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
              >
                <PlusCircle className="text-blue-600" />
                <p className="text-blue-600">Add highschool</p>
              </Button>
            </div>
          </div>
        )}

        {aboutNav === 3 && (
          <div className="col-span-6 px-4 pt-10 pb-4 space-y-8">
            <div className="space-y-6">
              <h1 className="font-semibold">Place lived</h1>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
              >
                <PlusCircle className="text-blue-600" />
                <p className="text-blue-600">Add current city</p>
              </Button>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
              >
                <PlusCircle className="text-blue-600" />
                <p className="text-blue-600">Add hometown</p>
              </Button>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
              >
                <PlusCircle className="text-blue-600" />
                <p className="text-blue-600">Add city</p>
              </Button>
            </div>
          </div>
        )}

        {aboutNav === 5 && (
          <div className="col-span-6 px-4 pt-10 pb-4 space-y-8">
            <div className="space-y-4">
              <h1 className="font-semibold">Relationship</h1>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
              >
                <PlusCircle className="text-blue-600" />
                <p className="text-blue-600">Add a relationship status</p>
              </Button>
            </div>
            <div className="space-y-4">
              <h1 className="font-semibold">Family members</h1>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
              >
                <PlusCircle className="text-blue-600" />
                <p className="text-blue-600">Add family member</p>
              </Button>
            </div>
          </div>
        )}

        {aboutNav === 6 && (
          <div className="col-span-6 px-4 pt-10 pb-4 space-y-6">
            <div className="space-y-1">
              <h1 className="font-semibold">About you</h1>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
              >
                <PlusCircle className="text-blue-600" />
                <p className="text-blue-600">
                  Write some details about yourself
                </p>
              </Button>
            </div>
            <div className="space-y-1">
              <h1 className="font-semibold">Name pronounciation</h1>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
              >
                <PlusCircle className="text-blue-600" />
                <p className="text-blue-600">Add a name pronounciation</p>
              </Button>
            </div>
            <div className="space-y-1">
              <h1 className="font-semibold">Other names</h1>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
              >
                <PlusCircle className="text-blue-600" />
                <p className="text-blue-600">Add a nickname, a birth name...</p>
              </Button>
            </div>
            <div className="space-y-1">
              <h1 className="font-semibold">Favorite qoutes</h1>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
              >
                <PlusCircle className="text-blue-600" />
                <p className="text-blue-600">Add your favorite qoutations</p>
              </Button>
            </div>
          </div>
        )}

        {aboutNav === 7 && (
          <div className="col-span-6 px-4 pt-10 pb-4 space-y-6">
            <div className="space-y-1">
              <h1 className="font-semibold">Life events</h1>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start gap-x-4 p-0 pl-3 font-medium  text-[15px]"
              >
                <PlusCircle className="text-blue-600" />
                <p className="text-blue-600">Add a life event</p>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAbout;
