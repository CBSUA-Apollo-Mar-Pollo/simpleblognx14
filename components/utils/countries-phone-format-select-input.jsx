"use client";

import { countries } from "@/constants/countries-phone-formats";
import { Search, Triangle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/Dropdown-menu";

const CountriesPhoneFormatSelectInput = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(countries[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DropdownMenu>
      {/* Selected box */}
      <DropdownMenuTrigger asChild>
        <div className="flex items-center  border rounded-lg p-3 cursor-pointer bg-neutral-200">
          <span className="mr-2">{selected.code}</span>
          <span className="mr-2">{selected.dial}</span>
          <Triangle className="rotate-180 h-2 w-2 text-black fill-black z-20 dark:fill-neutral-800 dark:text-neutral-800" />
        </div>
      </DropdownMenuTrigger>

      {/* Dropdown */}

      <DropdownMenuContent className="ml-[14vw] min-w-[20vw]">
        <div className="flex items-center border-b p-2 gap-x-2">
          <Search className="text-neutral-500" />
          <input
            type="text"
            placeholder="Search country..."
            className="w-full outline-none "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className=" max-h-[40vh] overflow-y-auto">
          {filteredCountries.map((c) => (
            <div
              key={c.code}
              className="p-2 hover:bg-gray-100 cursor-pointer "
              onClick={() => {
                setSelected(c);
                setIsOpen(false);
                setSearch("");
              }}
            >
              <p className="font-semibold text-sm">{c.name}</p>
              <p className="text-xs text-neutral-600 font-semibold">
                {c.code}
                {c.dial}
              </p>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CountriesPhoneFormatSelectInput;
