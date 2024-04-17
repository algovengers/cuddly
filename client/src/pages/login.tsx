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
import axios from "axios";
import { Loader2 } from "lucide-react";
import googleAuth from "@/utils/googleAuth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setUser } from "@/redux/user";

function LoginPage() {
  const [curstate, setCurstate] = useState<string>("idle");
  const [googleCurstate, setGoogleCurstate] = useState<string>("idle");
  const [errormsg, setErrormsg] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user); // Assuming 'user' is your user slice name

  useEffect(() => {
    console.log(user.isLoading);
    if (!user.isLoading && user.isAuth) {
      // Redirect to ai chat page
      navigate("/chatwithai");
    }
  }, [user.isAuth, navigate, user.isLoading]);

  async function handleForm(e: React.SyntheticEvent) {
    e.preventDefault();

    const formData: {
      emailId: string;
      password: string;
    } = {
      emailId: (e.target as HTMLFormElement).email.value,
      password: (e.target as HTMLFormElement).password.value,
    };

    if (
      formData?.emailId?.trim()?.toString() != "" &&
      formData?.password != ""
    ) {
      try {
        setCurstate("busy");
        const { data: userData }: any = await axios.post(
          `${import.meta.env.VITE_BACKEND_PATH}/api/login`,
          formData
        );
        const { data }: any = userData;
        // console.log(data);
        // console.log(data.user);

        // set context
        if (data?.user?.emailId && data?.user?.name) {
          dispatch(setUser({ name: data.user.name, email: data.user.emailId }));

          // Reset the form
          (e.target as HTMLFormElement).reset();

          setErrormsg("");
          setCurstate("idle");

          // Redirect to .. page
          navigate("/chatwithai");
        }
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
    <div className="min-h-[100vh] flex flex-col justify-center bg-[#ffebc4] bg-[linear-gradient(180deg,#ffebc4,#fd9)]">
      <Card className=" sm:w-[400px] sm:mx-auto mx-3 my-3 shadow-2xl border-[#00000055]">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Login</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Get Access to Your Cuddly Account
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
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="john.doe@example.com"
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label className="flex-1" htmlFor="password">
                    Password
                  </Label>
                  {/* <a className="ml-auto underline text-sm" href="#">
                    Forgot your password?
                  </a> */}
                </div>
                <Input id="password" type="password" placeholder="********" />
              </div>
              <Button
                className="w-full text-md"
                type="submit"
                disabled={curstate === "busy" ? true : false}
              >
                {curstate === "busy" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
            <div className="mt-4 text-center text-md">
              Don't have an account?{" "}
              <button className="underline" onClick={() => navigate("/signup")}>
                Sign up
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;
