import PaymentInfoCard from "@/components/SettingsComponent/PaymentInfoCard";
import { getAuthSession } from "@/lib/auth";
import React from "react";

const PaymentInfoPage = async () => {
  const session = await getAuthSession();
  return <PaymentInfoCard data={session} />;
};

export default PaymentInfoPage;
