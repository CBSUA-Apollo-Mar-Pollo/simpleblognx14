import Sidebar from "@/components/utils/Sidebar";
import { getAuthSession } from "@/lib/auth";
import React from "react";

const HistoryPage = async () => {
  const session = await getAuthSession();
  return (
    <div>
      <Sidebar session={session} />
    </div>
  );
};

export default HistoryPage;
