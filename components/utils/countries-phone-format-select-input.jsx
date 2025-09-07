"use client";

import { countries } from "@/constants/countries-phone-formats";
import { Triangle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

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
    <div className="w-auto" ref={dropdownRef}>
      {/* Selected box */}
      <div
        className="flex items-center  border rounded-lg p-3 cursor-pointer bg-neutral-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="mr-2">{selected.code}</span>
        <span className="mr-2">{selected.dial}</span>
        <Triangle className="rotate-180 h-2 w-2 text-black fill-black z-20 dark:fill-neutral-800 dark:text-neutral-800" />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute botom-0 mt-1 bg-white  drop-shadow-[0px_0px_8px_rgba(0,0,0,0.3)] w-full z-50 rounded-lg p-2">
          <input
            type="text"
            placeholder="Search country..."
            className="w-full p-2 border-b outline-none "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

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
        </div>
      )}
    </div>
  );
};

export default CountriesPhoneFormatSelectInput;
