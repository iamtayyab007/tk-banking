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
import SignUp from "../(auth)/sign-up/page";
import SignIn from "../(auth)/sign-in/page";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";

export default function AuthForm({ type }: { type: string }) {
  const router = useRouter();
  const authForm = authFormSchema(type);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof authForm>>({
    resolver: zodResolver(authForm),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof authForm>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    try {
      // signup with appwrite and create plaid token
      if (type === "sign-up") {
        const newUser = await signUp(values);
        setUser(newUser);
      }

      if (type === "sign-in") {
        const response = await signIn({
          email: values.email,
          password: values.password,
        });
        if (response) router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomFormUi
                      control={form.control}
                      placeholder={"Enter your First name"}
                      type={"text"}
                      name={"firstName"}
                      label={"Firstname"}
                    />

                    <CustomFormUi
                      control={form.control}
                      placeholder={"Enter your Last name"}
                      type={"text"}
                      name={"lastName"}
                      label={"Lastname"}
                    />
                  </div>
                  <CustomFormUi
                    control={form.control}
                    placeholder={"Enter your Address"}
                    type={"text"}
                    name={"address1"}
                    label={"Address"}
                  />

                  <CustomFormUi
                    control={form.control}
                    placeholder={"Enter your City"}
                    type={"text"}
                    name={"city"}
                    label={"City"}
                  />
                  <div className="flex gap-4">
                    <CustomFormUi
                      control={form.control}
                      placeholder={"Enter your State"}
                      type={"text"}
                      name={"state"}
                      label={"state"}
                    />

                    <CustomFormUi
                      control={form.control}
                      placeholder={"Postal Code"}
                      type={"text"}
                      name={"postalCode"}
                      label={"PostalCode"}
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomFormUi
                      control={form.control}
                      placeholder={"yyyy-mm-dd"}
                      type={"text"}
                      name={"dateOfBirth"}
                      label={"Date of birth"}
                    />

                    <CustomFormUi
                      control={form.control}
                      placeholder={"SSN"}
                      type={"number"}
                      name={"ssn"}
                      label={"SSN"}
                    />
                  </div>
                </>
              )}
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
              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  className="bg-blue-500 cursor-pointer"
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
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="text-14 cursor-pointer font-medium text-blue-600"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
}
