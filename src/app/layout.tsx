import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/custom/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, neobrutalism, shadesOfPurple } from "@clerk/themes";
import { Toaster } from "@/components/ui/toaster";
import Footer from "../components/custom/Footer";
import AppHeader from "@/components/custom/Header";

const inter = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={
        "pk_test_c2V0dGxpbmctbWl0ZS0xMi5jbGVyay5hY2NvdW50cy5kZXYk"
      }
      appearance={{
        baseTheme: [dark],
      }}
    >
      <html lang="en">
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div
              className="dark:bg-gray-900 bg-gray-100
              
            min-h-screen dark:text-gray-300 text-gray-800 w-full"
            >
              <AppHeader />
              {children}
              <Footer />
              <Toaster />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

// Generate a course totorial on following detail with field as  Course Name ,description,along with chapter Name,about,duration:
// Category:'programming',topic:'javascript',level:'Basic',duration:'2 hours',noOfChapters:'5', in JSON format
// http://localhost:3000/create-course/5f717b1f-efdb-4ee9-8350-394ae929a6b4/finish

// https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ybEhnMUtJallDUmY3QlN0dVFHQUgyR1NKWmQiLCJyaWQiOiJ1c2VyXzJsU2JRbjVGZ3IyOHJNVWRxV2JWN2x6QzNTZiJ9
