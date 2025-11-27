"use client";
import { GeneralInput } from "../elements/Form";
import Button, {
  GithubButton,
  GoogleButton,
  MicrosoftButton,
} from "../elements/Button";
import { Paragraph, SectionTitle } from "../elements/Text";
import Link from "next/link";
import SkeletonImage from "./SkeletonImage";
import { signIn } from "next-auth/react";
import { IMAGES } from "@/app/constants/image";

export default function LoginForm() {
  return (
    <>
      <div className="flex min-h-full w-full md:w-fit mx-auto flex-col justify-center p-10 m-5 rounded-2xl lg:px-8 md:bg-white">
        <div className="relative sm:mx-auto sm:w-full sm:max-w-sm">
          <SkeletonImage
            className="w-20 md:w-30 mx-auto"
            src={IMAGES.fullLogo}
            alt="Logo"
            width={120}
            aspectRatio={2 / 1}
          />
          <SectionTitle className="text-center my-3">Sign in</SectionTitle>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            {/* <div>
              <Paragraph>Email address</Paragraph>
              <div className="mt-2">
                <GeneralInput
                  type="email"
                  value="endrik@gmail.com"
                  placeholder="Email"
                  className="w-full"
                  onChange={(e) => console.log(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Paragraph>Password</Paragraph>
                <div className="text-sm">
                  <Link
                    href="#"
                    className="font-semibold text-primary hover:text-primary"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <GeneralInput
                  type="password"
                  value="123123123"
                  placeholder="Password"
                  className="w-full"
                  onChange={(e) => console.log(e.target.value)}
                />
              </div>
            </div> */}

            <div className="flex flex-col gap-y-3">
              {/* <Button className="w-full cursor-pointer">Sign in</Button> */}
              <GoogleButton
                onClick={() => signIn("google", { callbackUrl: "/" })}
              />
              <GithubButton
                onClick={() => signIn("github", { callbackUrl: "/" })}
              />
              <MicrosoftButton
                onClick={() => signIn("azure-ad", { callbackUrl: "/" })}
              />
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Not a member?{" "}
            <Link
              href="#"
              className="font-semibold text-primary hover:text-primary"
            >
              Start a 14 day free trial
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
