import AuthForm from "@/app/components/AuthForm";
import React from "react";

export default function SignUp() {
  return (
    <section className="flex justify-center items-center size-full max-sm:px-6">
      <AuthForm type="sign-up" />
    </section>
  );
}
