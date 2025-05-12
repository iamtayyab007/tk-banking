import AuthForm from "@/app/components/AuthForm";
import React from "react";

export default function SignIn() {
  return (
    <section className="flex justify-center items-center size-full max-sm:px-6">
      <AuthForm type="sign-in" />
    </section>
  );
}
