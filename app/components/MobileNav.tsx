"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function MobileNav({ user }: MobileNavProps) {
  const pathName = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white">
          <Link href="/" className="cursor-pointer items-center gap-1 px-4">
            <Image
              src="/icons/logo.svg"
              width={34}
              height={34}
              alt="horizon logo"
            />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black">
              Horizon
            </h1>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map((link) => {
                  const isActive =
                    pathName === link.route ||
                    pathName.startsWith(`${link.route}/`);
                  return (
                    <SheetClose asChild key={link.route}>
                      <Link
                        href={link.route}
                        key={link.label}
                        className={cn(
                          "flex gap-3 items-center p-4 rounded-lg w-full max-w-60",
                          { "bg-blue-400": isActive }
                        )}
                      >
                        <Image
                          src={link.imgURL}
                          alt={link.label}
                          width={20}
                          height={20}
                          className={cn({
                            "brightness-[3] invert-0": isActive,
                          })}
                        />

                        <p
                          className={cn("text-16 font-semibold text-black", {
                            "text-white": isActive,
                          })}
                        >
                          {link.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetClose>
            <Footer user={user} type="mobile" />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
}
