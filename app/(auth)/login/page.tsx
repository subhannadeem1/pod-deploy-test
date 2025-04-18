import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { UserAuthForm } from "@/components/auth/user-auth-form";

export const metadata: Metadata = {
  title: "Login | The Pod Transcripts",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className = "container flex h-screen w-screen flex-col items-center justify-center">
      
      <Link href = "/" className = { cn(buttonVariants({ variant: "ghost" }), "absolute left-4 top-4 md:left-8 md:top-8" )}>
        
        <>
          <ChevronLeft className = "mr-2 h-4 w-4" />Back
        </>

      </Link>
      
      <div className = "mx-auto flex w-full flex-col justify-center gap-6 sm:w-[350px]">
        
        <div className = "flex flex-col gap-2 text-center">
          
          <h1 className = "text-2xl font-semibold tracking-tight">Welcome Back</h1>
          
          <p className = "text-sm text-muted-foreground">Login to your account.</p>
        
        </div>
        
        <UserAuthForm />
        
        <p className = "px-8 text-center text-sm text-muted-foreground">
          
          <Link href = "/register" className = "hover:text-brand underline underline-offset-4">Don&apos;t have an account? Sign Up.</Link>
        
        </p>

      </div>

    </div>
  );
}