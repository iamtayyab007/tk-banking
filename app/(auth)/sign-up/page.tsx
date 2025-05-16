import AuthForm from "@/app/components/AuthForm";

export default async function SignUpPage() {
  return (
    <section className="flex justify-center items-center size-full max-sm:px-6">
      <AuthForm type="sign-up" />
    </section>
  );
}
