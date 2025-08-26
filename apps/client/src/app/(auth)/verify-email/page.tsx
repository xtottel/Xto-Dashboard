import VerifyEmail from "@/components/auth/VerifyEmailForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Account ",
  description: "Log in to your Sendexa account to access your messaging and email services.",
};

export default function LogIn() {
  return <VerifyEmail />;
}
