import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100vh] flex flex-col justify-center bg-[#ffebc4] bg-[linear-gradient(180deg,#ffebc4,#fd9)]">
      <Card className=" sm:w-[400px] sm:mx-auto mx-3 my-3 shadow-2xl border-[#00000055]">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Signup</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Create a New Cuddly Account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button className="w-full text-md flex gap-2" variant="outline">
              <FaGoogle className="text-xl" />
              <span>Sign up with Google</span>
            </Button>
            <Separator className="my-4" />
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
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
            </form>
          </div>
        </CardContent>
        <CardFooter className="flex-col">
          <Button className="w-full text-md" type="submit">
            Signup
          </Button>
          <div className="mt-4 text-center text-md">
            Already have an account?{" "}
            <button className="underline" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginPage;
