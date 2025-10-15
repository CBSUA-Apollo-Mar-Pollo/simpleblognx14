"use client";

import { Button } from "@/components/ui/Button";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import HighSchoolForm from "./UserAboutForms/high-school-form";
import PhoneNumberForm from "./UserAboutForms/phone-number-form";
import CollegeForm from "./UserAboutForms/college-form";
import WorkPlaceForm from "./UserAboutForms/workplace-form";
import RelationshipStatusForm from "./UserAboutForms/relationship-status-form";

const UserAboutOverView = () => {
  const [toggleAddPhoneNumber, setToggleAddPhoneNumber] = useState(false);
  const [toggleHighSchool, setToggleHighSchool] = useState(false);
  const [toggleCollegeForm, setToggleCollegeForm] = useState(false);
  const [toggleWorkPlaceForm, setToggleWorkPlaceForm] = useState(false);
  const [toggleRelationStatusForm, setToggleRelationStatusForm] =
    useState(false);

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

      <PhoneNumberForm
        toggleAddPhoneNumber={toggleAddPhoneNumber}
        setToggleAddPhoneNumber={setToggleAddPhoneNumber}
      />
      {!toggleAddPhoneNumber && (
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
