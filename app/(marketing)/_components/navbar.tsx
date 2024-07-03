"use client"
import { useScrollTop } from "@/hooks/use-scroll-top"
import { cn } from "@/lib/utils";
import Logo from "./logo";
import { ModeToggle } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton, UserButton, UserProfile } from "@clerk/clerk-react"
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
const Navbar = () => {
    const { isLoading, isAuthenticated } = useConvexAuth();
    const scrolled = useScrollTop();
    return (
        <div className={cn("z-50 bg-background fixed flex top-0 w-full p-6 items-center navcol", scrolled && "border-b  shadow-md")}
        ><Logo />
            <div className="ml-auto justify-between md:justify-end w-full flex items-center gap-x-2">
                {isLoading && (<Spinner />)}
                {!isLoading && !isAuthenticated && (<>
                    <SignInButton><Button variant="ghost">Login</Button></SignInButton>
                    <SignInButton><Button variant="default">Get Jotion Free</Button></SignInButton></>)}
                {isAuthenticated && <>
                    <Button ><Link href="/docs">Enter Noteify</Link></Button>
                    {/* <SignOutButton><Button>Logout</Button></SignOutButton> */}
                    <UserButton afterSignOutUrl="/"/>
                </>}
                <ModeToggle />
            </div>
        </div>
    )
}
export default Navbar