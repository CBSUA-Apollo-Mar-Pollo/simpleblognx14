"use client";

import { Button } from "@/components/ui/Button";
import { Lock, Pencil, Phone, PlusCircle } from "lucide-react";
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

const UserAboutOverView = ({ user }) => {
  const [toggleAddPhoneNumber, setToggleAddPhoneNumber] = useState(false);
  const [toggleHighSchool, setToggleHighSchool] = useState(false);
  const [toggleCollegeForm, setToggleCollegeForm] = useState(false);
  const [toggleWorkPlaceForm, setToggleWorkPlaceForm] = useState(false);
  const [toggleRelationStatusForm, setToggleRelationStatusForm] =
    useState(false);

  const {
    data: userAboutInfo,
    status,
    isLoading,
  } = useQuery({
    queryKey: ["useraboutinfo", user.id],
    queryFn: async () => {
      const res = await getUserAboutInfo(user);
      return res;
    },
  });

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

      <CollegeForm
        toggleCollegeForm={toggleCollegeForm}
        setToggleCollegeForm={setToggleCollegeForm}
      />
      {!toggleCollegeForm && (
        <Button
          onClick={() => setToggleCollegeForm(!toggleCollegeForm)}
          variant="ghost"
          className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
        >
          <PlusCircle className="text-blue-600" />
          <p className="text-blue-600">Add college</p>
        </Button>
      )}

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

      {toggleRelationStatusForm && (
        <RelationshipStatusForm
          setToggleRelationStatusForm={setToggleRelationStatusForm}
        />
      )}
      {!toggleRelationStatusForm && (
        <Button
          onClick={() => setToggleRelationStatusForm(!toggleRelationStatusForm)}
          variant="ghost"
          className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
        >
          <PlusCircle className="text-blue-600" />
          <p className="text-blue-600">Add relationsh status</p>
        </Button>
      )}

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
