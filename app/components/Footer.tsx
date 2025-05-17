import { logout } from "@/lib/actions/user.actions";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

function Footer({ user, type = "desktop" }: FooterProps) {
  const router = useRouter();
  const handleLogout = async () => {
    const userLogout = await logout();

    if (userLogout) {
      router.push("/sign-in");
    }
  };
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
        <h1 className="text-xl truncate  text-gray-700 font-semibold">
          {user.name}
        </h1>
        <p className="text-sm truncate font-normal text-gray-600">
          {user.email}
        </p>
      </div>
      <div
        className="relative size-5 max-xl:w-full max-xl:flex max-xl:justify-center max-xl:items-center"
        onClick={handleLogout}
      >
        <Image src="icons/logout.svg" fill alt="tk_banking" />
      </div>
    </footer>
  );
}

export default Footer;
