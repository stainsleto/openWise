"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginPage from "@/pages/login";

const SignIn = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  // Redirect to dashboard if the user is already logged in
  useEffect(() => {
    if (session?.user && !loading) {
      router.push("/dashboard");
    }
  }, [session]);

  return (
    <LoginPage page={"signIn"} loading={loading} setLoading={setLoading} />
  );
};

export default SignIn;
