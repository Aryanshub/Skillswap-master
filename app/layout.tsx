import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NavBar from "@/components/NavBar";
import Script from "next/script";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Skillswap-learn Something . teach something",
  description: "Connect with people to exchange skills. Whether you're a designer wanting to learn coding, or a developer curious about photography — SkillSwap is for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script id="early-alert" strategy="beforeInteractive">
          {`
          alert("Welcome to SkillSwap! Connect, learn, and share skills with others.");
            console.log("myscript.js loaded");
          `}
         </Script>
      <body
        className={` antialiased`}
      >
         <Toaster />
         <NavBar/>
        {children}
         
      </body>
    </html>
  );
}
