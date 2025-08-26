import ResendVerificationForm from "@/components/auth/ResendVerificationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resend Verification ",
  description: "Log in to your Sendexa account to access your messaging and email services.",
};

export default function LogIn() {
  return <ResendVerificationForm />;
}
