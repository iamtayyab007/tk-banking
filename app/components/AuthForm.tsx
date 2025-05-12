"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormUi from "./CustomFormUi";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function AuthForm({ type }: { type: string }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof authFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    setIsLoading(true);
    console.log(values);
    setIsLoading(false);
  }

  return (
    <section className="flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 py-10 md:gap-8">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex cursor-pointer items-center gap-3">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="horizon logo"
          />
          <h1 className="text-2xl font-ibm-plex-serif font-bold text-black">
            Horizon
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-xl font-bold text-black">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-xl font-normal text-gray-600">
            {user
              ? "Link your account to get started"
              : "Please enter your details "}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4"></div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <CustomFormUi
                control={form.control}
                placeholder={"Enter your Email"}
                type={"email"}
                name={"email"}
                label={"Email"}
              />

              <CustomFormUi
                control={form.control}
                placeholder={"Enter your Password"}
                type={"password"}
                name={"password"}
                label={"Password"}
              />

              <Button
                type="submit"
                className="bg-blue-500"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> &nbsp;
                    Loading...
                  </>
                ) : type === "sign-in" ? (
                  "Sign In "
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p>
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account"}
            </p>
            <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"}>
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
}
