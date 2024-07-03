"use client"
import { Button } from "@/components/ui/button"
import { SignInButton } from "@clerk/clerk-react"
import { useConvexAuth } from "convex/react"

const DocumentPage = () => {
    const { isAuthenticated } = useConvexAuth()
    return (
        <>
            {isAuthenticated && (<div>DocumentPage</div>)}
            {!isAuthenticated && <>
                Sorry You cannot enter the page as you are not Authenticated
                <SignInButton><Button>Please SignIn</Button></SignInButton>
            </>}

        </>


    )
}
export default DocumentPage