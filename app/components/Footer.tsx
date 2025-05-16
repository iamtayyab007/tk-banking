import React from "react";

function Footer({ user, type = "desktop" }: FooterProps) {
  return (
    <footer className="flex cursor-pointer items-center justify-between gap-2 py-6">
      <div
        className={
          type === "mobile"
            ? "flex size-10 items-center justify-center rounded-full bg-gray-200 max-xl:hidden"
            : "flex size-10 items-center justify-center rounded-full bg-gray-200"
        }
      >
        <p>{user.name[0]}</p>
      </div>
      <div
        className={
          type === "mobile"
            ? "flex flex-1 flex-col justify-center"
            : "flex flex-1 flex-col justify-center max-xl:hidden"
        }
      >
        <h1 className="text-xl truncate font-normal text-gray-600">
          {user.name}
        </h1>
      </div>
    </footer>
  );
}

export default Footer;
