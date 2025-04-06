import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CreateUser } from "../../app/lib/actions/createUser";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "./ui/spinner";

interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {
  page: string;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export function LoginForm({
  className,
  page,
  loading,
  setLoading,
  ...props
}: LoginFormProps) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    name: "",
  });
  const router = useRouter();
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Toaster />
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            Welcome {page === "signIn" && "back"} 👋
          </CardTitle>
          <CardDescription>
            {page === "signIn" ? "Sign in" : "Sign up"} with your Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                {/* <Button
                  variant="outline"
                  onClick={() => {
                    console.log("clicked apple");
                  }}
                  className="w-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button> */}
                <Button
                  variant="outline"
                  onClick={async () => {
                    await signIn("google");
                  }}
                  className="w-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  {page === "signIn" ? "Sign in" : "Sign up"} with Google
                </Button>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    onChange={(e) =>
                      setCredentials((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
                {page === "signUp" && (
                  <div className="flex gap-3">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="mark"
                        required
                        onChange={(e) =>
                          setCredentials((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="number"
                        placeholder="phone"
                        required
                        onChange={(e) =>
                          setCredentials((prev) => ({
                            ...prev,
                            phoneNumber: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                )}

                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    {page === "signIn" && (
                      <Link
                        href="#"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    )}
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="password"
                    onChange={(e) =>
                      setCredentials((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                {page === "signIn" ? (
                  <Button
                    type="submit"
                    onClick={async () => {
                      setLoading(true);
                      const res = await signIn("credentials", {
                        email: credentials.email,
                        password: credentials.password,
                        redirect: false,
                      });
                      if (res?.ok) {
                        toast.success("user logged-in");
                        await new Promise((resolve) =>
                          setTimeout(resolve, 1200)
                        );
                        setLoading(false);
                        router.push("/dashboard");
                      } else {
                        setLoading(false);
                        if (res?.status == 401) {
                          toast.error("Wrong credentials");
                        } else {
                          toast.warning("login failed");
                        }
                      }
                    }}
                    className="w-full"
                  >
                    Login {loading && <Spinner />}
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={loading}
                    onClick={async () => {
                      setLoading(true);
                      const userCreationResponse =
                        await CreateUser(credentials);

                      // getting the user logged in after successful signup

                      try {
                        if (userCreationResponse.success) {
                          const userLogin = await signIn("credentials", {
                            email: credentials.email,
                            password: credentials.password,
                            redirect: false,
                          });
                          if (userLogin?.ok) {
                            toast.success("Account Created");
                            await new Promise((resolve) =>
                              setTimeout(resolve, 1200)
                            );
                            setLoading(false);
                            router.push("/dashboard");
                          } else {
                            toast.warning("User creation failed");
                          }
                        } else {
                          setLoading(false);
                          toast.warning(`${userCreationResponse.message}`);
                        }
                      } catch (err) {
                        setLoading(false);
                        toast.error("Signup failed", {
                          description: `${err}`,
                        });
                      }
                    }}
                    className="w-full"
                  >
                    Signup {loading && <Spinner />}
                  </Button>
                )}
              </div>
              {page === "signIn" ? (
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              ) : (
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/signin" className="underline underline-offset-4">
                    Sign in
                  </Link>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms and policy */}
      {/* <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div> */}
    </div>
  );
}
