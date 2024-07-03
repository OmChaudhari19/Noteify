"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
import { SignInButton } from "@clerk/clerk-react";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-10 sm:mt-8 md:mt-8">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents, &Plans. Unified. Welcome to <span className="underline">Noteify</span>
      </h1 >
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Noteify is connected workspace where <br /> better,faster work happens
      </h3>
      {isLoading && <div className="w-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>}
      {isAuthenticated && !isLoading && <Button asChild>
        <Link href="/docs">Go to Docs <ArrowRight className="w-4 h-4 ml-2 items-center" /></Link>
      </Button>}
      {!isAuthenticated && <SignInButton><Button>SignIn Noteify <ArrowRight className="w-4 h-4 ml-2 items-center" /> </Button></SignInButton>}
    </div >
  )
}
export default Heading