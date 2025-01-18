import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import axios from "axios";
import googleAuth from "@/utils/googleAuth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setUser } from "@/redux/user";

function SignupPage() {
  const [curstate, setCurstate] = useState<string>("idle");
  const [googleCurstate, setGoogleCurstate] = useState<string>("idle");
  const [errormsg, setErrormsg] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user); // Assuming 'user' is your user slice name

  useEffect(() => {
    if (!user.isLoading && user.isAuth) {
      // Redirect to login page
      navigate("/chatwithai");
    }
  }, [user.isAuth, navigate, user.isLoading]);

  async function handleForm(e: React.SyntheticEvent) {
    e.preventDefault();

    const formData: {
      username: string;
      emailId: string;
      password: string;
    } = {
      username: (e.target as HTMLFormElement).username.value,
      emailId: (e.target as HTMLFormElement).email.value,
      password: (e.target as HTMLFormElement).password.value,
    };

    if (
      formData?.username?.trim()?.toString() != "" &&
      formData?.emailId?.trim()?.toString() != "" &&
      formData?.password != ""
    ) {
      try {
        setCurstate("busy");
        await axios.post(
          `${import.meta.env.VITE_BACKEND_PATH}/api/signup`,
          formData
        );

        // Reset the form
        (e.target as HTMLFormElement).reset();

        setErrormsg("");
        setCurstate("idle");

        // Redirect to .. page
        navigate("/login");
      } catch (error: any) {
        console.error("Error login:", error);
        setErrormsg(error?.response?.data?.message);
        setCurstate("idle");
      }
    }
  }

  async function handleGoogleAuth() {
    setGoogleCurstate("busy");

    const { data }: any = await googleAuth();
    if (data) {
      setGoogleCurstate("idle");

      // set context
      if (data?.user?.emailId && data?.user?.name) {
        dispatch(setUser({ name: data.user.name, email: data.user.emailId }));

        // Redirect to .. page
        navigate("/discover");
      }
    } else {
      setErrormsg("Error in Signing with Google");
      setGoogleCurstate("idle");
    }
  }

  return (
    <div className="min-h-[100vh] flex flex-col justify-center bg-[linear-gradient(180deg,#53b3cb,#5eb8ce)]">
      <Card className=" sm:w-[400px] sm:mx-auto mx-3 my-3 shadow-2xl border-[#00000055]">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Signup</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Create a New Cuddly Account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              className="w-full text-md flex gap-2"
              variant="outline"
              onClick={handleGoogleAuth}
              disabled={googleCurstate === "busy" ? true : false}
            >
              <FaGoogle className="text-xl" />
              <span>Sign in with Google</span>
            </Button>
            <Separator className="my-4" />
            <div className="mt-4 text-center text-md text-red-900">
              {errormsg}
            </div>
            <form onSubmit={handleForm} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="username"
                  placeholder="John Doe"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="john.doe@example.com"
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label className="flex-1" htmlFor="password">
                    Password
                  </Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                />
              </div>
              <Button
                className="w-full text-md"
                type="submit"
                disabled={curstate === "busy" ? true : false}
              >
                {curstate === "busy" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing up
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
            </form>
            <div className="mt-4 text-center text-md">
              Already have an account?{" "}
              <button className="underline" onClick={() => navigate("/login")}>
                Login
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignupPage;
