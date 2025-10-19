"use client";

import { Button } from "@/components/ui/Button";
import {
  BookImage,
  CalendarDays,
  Download,
  Heart,
  Loader2,
  Lock,
  MapPin,
  MoreHorizontal,
  Navigation,
  Pencil,
  Phone,
  PlusCircle,
  Search,
  Star,
  Trash2,
  Triangle,
} from "lucide-react";
import React, { useState } from "react";
import HighSchoolForm from "./UserAboutForms/high-school-form";
import PhoneNumberForm from "./UserAboutForms/phone-number-form";
import CollegeForm from "./UserAboutForms/college-form";
import WorkPlaceForm from "./UserAboutForms/workplace-form";
import RelationshipStatusForm from "./UserAboutForms/relationship-status-form";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getUserAboutInfo } from "@/data/get-user-about-info";
import { Icons } from "@/components/utils/Icons";
import parsePhoneNumberFromString from "libphonenumber-js";
import HomeTownForm from "./UserAboutForms/home-town-form";
import CurrentCityForm from "./UserAboutForms/current-city-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";

const UserAboutOverView = ({ user }) => {
  const [toggleAddPhoneNumber, setToggleAddPhoneNumber] = useState(false);
  const [toggleHighSchool, setToggleHighSchool] = useState(false);
  const [toggleCollegeForm, setToggleCollegeForm] = useState(false);
  const [toggleWorkPlaceForm, setToggleWorkPlaceForm] = useState(false);
  const [toggleRelationStatusForm, setToggleRelationStatusForm] =
    useState(false);
  const [toggleHomeTownForm, setToggleHomeTownForm] = useState(false);
  const [toggleCurrentCityForm, setToggleCurrentCityForm] = useState(false);

  const {
    data: userAboutInfo,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["useraboutinfo", user.id],
    queryFn: async () => {
      const res = await getUserAboutInfo(user);
      return res;
    },
  });

  if (isPending) {
    return (
      <Loader2 className="w-5 h-5 text-neutral-600 animate-spin my-10 mr-1" />
    );
  }

  return (
    <div className="col-span-6 pl-4 pr-20 pt-10 pb-4 space-y-6">
      {toggleWorkPlaceForm && (
        <WorkPlaceForm setToggleWorkPlaceForm={setToggleWorkPlaceForm} />
      )}
      {!toggleWorkPlaceForm && (
        <Button
          onClick={() => setToggleWorkPlaceForm(!toggleWorkPlaceForm)}
          variant="ghost"
          className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
        >
          <PlusCircle className="text-blue-600" />
          <p className="text-blue-600">Add a workplace</p>
        </Button>
      )}

      {toggleHighSchool && (
        <HighSchoolForm setToggleHighSchool={setToggleHighSchool} />
      )}

      {!toggleHighSchool && (
        <Button
          onClick={() => setToggleHighSchool(!toggleHighSchool)}
          variant="ghost"
          className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
        >
          <PlusCircle className="text-blue-600" />
          <p className="text-blue-600">Add highschool</p>
        </Button>
      )}

      {toggleCollegeForm && (
        <CollegeForm
          setToggleCollegeForm={setToggleCollegeForm}
          refetch={refetch}
        />
      )}

      {userAboutInfo?.college && !toggleCollegeForm && (
        <div className="flex items-center justify-between ml-2">
          <div className="flex items-center gap-x-3">
            <Icons.GraduationCapIcon className="w-9 h-9 fill-neutral-500 text-white text-transparent" />
            <div className="flex flex-col">
              <div className="relative flex items-center gap-x-1">
                <p className="text-[14px]">Studied at</p>
                <p className="text-[14px] font-medium">
                  {userAboutInfo?.college.collegename}
                </p>
              </div>
              <div>
                <p className="text-[13px] text-neutral-600">
                  Attended from {userAboutInfo?.college.startDate.year} to{" "}
                  {userAboutInfo?.college.endDate.year}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-x-4">
            <button>
              <Icons.earthIcon className="h-5 w-5 fill-neutral-600" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="bg-neutral-200 p-2 rounded-full">
                  <MoreHorizontal className="text-neutral-600 h-5 w-5" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="mr-[17.5rem] p-2 min-w-[18vw] bg-transparent border-0 drop-shadow-[0_4px_9px_rgba(0,0,0,0.4)] shadow-none">
                <div className="relative z-0">
                  <Triangle className="fill-white text-white h-10 w-10 rotate-[15.2rad] absolute -top-2.5 -right-[9px] z-30" />
                  <div className="bg-white mt-2 z-40 relative ml-[3.2px] rounded-xl p-2">
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-start space-x-5 hover:bg-neutral-200"
                    >
                      <Star className="absolute left-4 h-5 w-5 text-neutral-800 z-20 dark:text-neutral-300" />
                      <p className="font-semibold">See life event</p>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-start space-x-5 hover:bg-neutral-200"
                    >
                      <Pencil className="absolute left-4 h-5 w-5 text-neutral-800 z-20 dark:text-neutral-300" />
                      <p className="font-semibold">Edit college</p>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-start space-x-5 hover:bg-neutral-200"
                    >
                      <Trash2 className="absolute left-4 h-5 w-5 text-neutral-800 z-20 dark:text-neutral-300" />
                      <p className="font-semibold">Delete college</p>
                    </Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}

      {!toggleCollegeForm && !userAboutInfo?.college && (
        <Button
          onClick={() => setToggleCollegeForm(!toggleCollegeForm)}
          variant="ghost"
          className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
        >
          <PlusCircle className="text-blue-600" />
          <p className="text-blue-600">Add college</p>
        </Button>
      )}

      {/* Current City */}
      {toggleCurrentCityForm && (
        <CurrentCityForm
          setToggleCurrentCityForm={setToggleCurrentCityForm}
          refetch={refetch}
        />
      )}

      {userAboutInfo?.currentcity && !toggleCurrentCityForm && (
        <div className="flex items-center justify-between ml-2">
          <div className="flex items-center gap-x-3">
            <Icons.HomeFilled className="w-9 h-9 fill-neutral-500 text-white text-transparent" />
            <div className="relative flex items-center gap-x-1">
              <p className="text-[14px]">Lives in</p>
              <p className="text-[14px] font-semibold">
                {userAboutInfo?.currentcity}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-x-4">
            <button>
              <Icons.earthIcon className="h-5 w-5 fill-neutral-600" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="bg-neutral-200 p-2 rounded-full">
                  <MoreHorizontal className="text-neutral-600 h-5 w-5" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="mr-[17.5rem] p-2 min-w-[18vw] bg-transparent border-0 drop-shadow-[0_4px_9px_rgba(0,0,0,0.4)] shadow-none">
                <div className="relative z-0">
                  <Triangle className="fill-white text-white h-10 w-10 rotate-[15.2rad] absolute -top-2.5 -right-[9px] z-30" />
                  <div className="bg-white mt-2 z-40 relative ml-[3.2px] rounded-xl p-2">
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-start space-x-5 hover:bg-neutral-200"
                    >
                      <Pencil className="absolute left-4 h-5 w-5 text-neutral-800 z-20 dark:text-neutral-300" />
                      <p className="font-semibold">Edit current city</p>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-start space-x-5 hover:bg-neutral-200"
                    >
                      <Trash2 className="absolute left-4 h-5 w-5 text-neutral-800 z-20 dark:text-neutral-300" />
                      <p className="font-semibold">Delete current city</p>
                    </Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}

      {!toggleCurrentCityForm && !userAboutInfo?.currentcity && (
        <Button
          onClick={() => setToggleCurrentCityForm(true)}
          variant="ghost"
          className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
        >
          <PlusCircle className="text-blue-600" />
          <p className="text-blue-600">Add current city</p>
        </Button>
      )}

      {/* Hometown */}
      {toggleHomeTownForm && (
        <HomeTownForm
          setToggleHomeTownForm={setToggleHomeTownForm}
          refetch={refetch}
        />
      )}

      {userAboutInfo?.hometown && !toggleHomeTownForm && (
        <div className="flex items-center justify-between ml-2">
          <div className="flex items-center gap-x-3">
            <MapPin className="w-9 h-9 fill-neutral-500 text-white text-transparent" />
            <div className="relative flex items-center gap-x-1">
              <p className="text-[14px]">From</p>
              <p className="text-[14px] font-semibold">
                {userAboutInfo?.hometown}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-x-4">
            <button>
              <Icons.earthIcon className="h-5 w-5 fill-neutral-600" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="bg-neutral-200 p-2 rounded-full">
                  <MoreHorizontal className="text-neutral-600 h-5 w-5" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="mr-[18rem] p-2 min-w-[18vw] bg-transparent border-0 drop-shadow-[0_4px_9px_rgba(0,0,0,0.4)] shadow-none">
                <div className="relative z-0">
                  <Triangle className="fill-white text-white h-10 w-10 rotate-[15.2rad] absolute -top-2.5 -right-[9px] z-30" />
                  <div className="bg-white mt-2 z-40 relative ml-[3.2px] rounded-xl p-2">
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-start space-x-5 hover:bg-neutral-200"
                    >
                      <Pencil className="absolute left-4 h-5 w-5 text-neutral-800 z-20 dark:text-neutral-300" />
                      <p className="font-semibold">Edit hometown</p>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-start space-x-5 hover:bg-neutral-200"
                    >
                      <Trash2 className="absolute left-4 h-5 w-5 text-neutral-800 z-20 dark:text-neutral-300" />
                      <p className="font-semibold">Delete hometown</p>
                    </Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}

      {!toggleHomeTownForm && !userAboutInfo?.hometown && (
        <Button
          onClick={() => setToggleHomeTownForm(true)}
          variant="ghost"
          className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
        >
          <PlusCircle className="text-blue-600" />
          <p className="text-blue-600">Add hometown</p>
        </Button>
      )}

      {/* Relation Status */}
      {toggleRelationStatusForm && (
        <RelationshipStatusForm
          refetch={refetch}
          setToggleRelationStatusForm={setToggleRelationStatusForm}
          userAboutInfo={userAboutInfo}
        />
      )}

      {userAboutInfo?.relationstatus && !toggleRelationStatusForm && (
        <div className="flex items-center justify-between ml-3">
          <div className="flex items-center gap-x-3">
            <Heart className="w-7 h-7 fill-neutral-500 text-transparent" />
            <div className="relative">
              <p className="text-[14px]">{userAboutInfo?.relationstatus}</p>
            </div>
          </div>

          <div className="flex items-center gap-x-4">
            <button>
              <Icons.earthIcon className="h-5 w-5 fill-neutral-600" />
            </button>
            <button
              onClick={() => setToggleRelationStatusForm(true)}
              className="bg-neutral-200 p-2 rounded-full"
            >
              <Pencil className="text-neutral-600 h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {!toggleRelationStatusForm && !userAboutInfo?.relationstatus && (
        <Button
          onClick={() => setToggleRelationStatusForm(!toggleRelationStatusForm)}
          variant="ghost"
          className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
        >
          <PlusCircle className="text-blue-600" />
          <p className="text-blue-600">Add relationsh status</p>
        </Button>
      )}

      {/* Phone number */}
      {toggleAddPhoneNumber && (
        <PhoneNumberForm setToggleAddPhoneNumber={setToggleAddPhoneNumber} />
      )}

      {userAboutInfo?.phonenumber && (
        <div className="flex items-center justify-between ml-3">
          <div className="flex items-center gap-x-3">
            <Phone className="w-7 h-7 fill-neutral-500 text-transparent" />
            <div className="relative">
              <p className="text-[14px]">
                {(() => {
                  try {
                    const phone = userAboutInfo?.phonenumber
                      ? parsePhoneNumberFromString(
                          userAboutInfo.phonenumber.number,
                          userAboutInfo.phonenumber.selectedCode.code
                        )
                      : null;

                    return phone?.formatNational() ?? "No phone number";
                  } catch (e) {
                    return "Invalid phone number";
                  }
                })()}
              </p>
              <p className="text-[13px] text-neutral-600 -mt-0.5 ">Mobile</p>
            </div>
          </div>

          <div className="flex items-center gap-x-4">
            <button>
              <Icons.earthIcon className="h-5 w-5 fill-neutral-600" />
            </button>
            <button className="bg-neutral-200 p-2 rounded-full">
              <Pencil className="text-neutral-600 h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {!toggleAddPhoneNumber && !userAboutInfo?.phonenumber && (
        <Button
          onClick={() => setToggleAddPhoneNumber(!toggleAddPhoneNumber)}
          variant="ghost"
          className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
        >
          <PlusCircle className="text-blue-600" />
          <p className="text-blue-600">Add phone number</p>
        </Button>
      )}
    </div>
  );
};

export default UserAboutOverView;
