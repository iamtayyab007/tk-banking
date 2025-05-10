import React from "react";
import HeaderBox from "../components/HeaderBox";
import TotalBalanceBox from "../components/TotalBalanceBox";

export default function Home() {
  const loggedIn = { firstName: "Tayyab" };
  return (
    <section className="no-scrollbar flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
      <div className="no-scrollbar flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll">
        <HeaderBox
          type="greeting"
          title="Welcome"
          user={loggedIn?.firstName || "Guest"}
          subtext="Access and manage your account and transactions efficiently"
        />
        <TotalBalanceBox
          accounts={[]}
          totalBanks={1}
          totalCurrentBalance={1234.5}
        />
      </div>
    </section>
  );
}
