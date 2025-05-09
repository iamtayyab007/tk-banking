import React from "react";
import HeaderBox from "../components/HeaderBox";

export default function Home() {
  const loggedIn = { firstName: "Tayyab" };
  return (
    <section className="home">
      <div className="home-content">
        <HeaderBox
          type="greeting"
          title="Welcome"
          user={loggedIn?.firstName || "Guest"}
          subtext="Access and manage your account and transactions efficiently"
        />
      </div>
    </section>
  );
}
