"use client";
import { SignUp } from "@clerk/nextjs";
import { dark, neobrutalism, shadesOfPurple } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex justify-center items-center min-h-screen py-12">
      <SignUp
        appearance={{
          baseTheme: theme === "dark" ? dark : shadesOfPurple,
        }}
      />
    </div>
  );
}
