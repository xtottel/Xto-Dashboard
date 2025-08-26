// app/verify/page.tsx
import OTPForm from "@/components/auth/OTPForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Login",
  description: "Verify your login with the OTP sent to your email.",
};

export default function VerifyPage() {
  return <OTPForm />;
}