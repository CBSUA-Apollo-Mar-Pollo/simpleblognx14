import AllActivitySideBar from "@/components/allactivity/all-activity-sidebar";
import { Input } from "@/components/ui/Input";
import { Separator } from "@/components/ui/Separator";
import {
  CalendarDays,
  CircleEllipsisIcon,
  List,
  Search,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const ArchivePage = () => {
  return (
    <div className="flex">
      <AllActivitySideBar />
      <div>ArchivePage</div>;
    </div>
  );
};

export default ArchivePage;
