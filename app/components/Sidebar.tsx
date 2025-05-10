import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Sidebar({ user }: SiderbarProps) {
  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col  justify-between border-r border-gray-200 bg-white pt-8 text-white max-md:hidden sm:p-4 xl:p-6 2xl:w-[355px]">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer items-center gap-2">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="horizon logo"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="text-2xl font-ibm-plex-serif text-[26px] font-bold text-black max-xl:hidden">
            Horizon
          </h1>
        </Link>
        {sidebarLinks.map((link, index) => (
          <Link href={link.route}>
            <Image
              src={link.imgURL}
              width={34}
              height={34}
              alt="menu images"
              className="size-[24px] max-xl:size-14"
            />
            <h1 className="2xl:text-26 font-ibm-plex-serif text-[26px] font-bold text-black max-xl:hidden">
              {link.label}
            </h1>
          </Link>
        ))}
      </nav>
    </section>
  );
}
