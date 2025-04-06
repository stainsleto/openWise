"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginPage from "@/pages/login";

const SignUp = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Redirect to dashboard if the user is logged in
    if (session?.user && !loading) {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <LoginPage page={"signUp"} loading={loading} setLoading={setLoading} />
  );
};

export default SignUp;
