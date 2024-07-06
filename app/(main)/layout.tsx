"use client"
import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react"
import { redirect, useRouter } from "next/navigation"
import Navigation from "./_components/navigation";

const DocumentLayout = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isLoading } = useConvexAuth()
    const Router = useRouter();
    return <>
        {isLoading && <div className="w-full flex items-center justify-center"><Spinner size="icon" />
        </div>}
        {!isAuthenticated && redirect("/")}
        <div className="h-full flex bg-[#e0ecec] dark:bg-[#1F1F1F] ">
            <Navigation />
            <main className="flex-1 h-full overflow-y-auto">
                {children}
            </main>
        </div>
    </>
}

export default DocumentLayout