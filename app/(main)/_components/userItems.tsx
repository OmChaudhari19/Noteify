"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { ChevronsLeftRight } from "lucide-react"
import { SignOutButton, useUser } from "@clerk/clerk-react"
import { Button } from "@/components/ui/button"
const UserItems = () => {
    const { user } = useUser();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center justify-center text-sm hover:bg-primary/5 p-3 w-full">
                    <div className="flex gap-x-2 items-center max-w-[150px]">
                        <Avatar>
                            <AvatarImage src={user?.imageUrl} />
                        </Avatar>
                        <span className="font-medium line-clamp-1 text-start"> Om {user?.fullName}&apos;s Noteify</span>
                    </div>
                    <ChevronsLeftRight className="text-muted-foreground rotate-90 ml-2 h-4 w-4" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 items-center justify-center" align="start" alignOffset={11} forceMount>
                <div className="flex flex-col space-y-4 p-2">
                    <p className="text-xs text-muted-foreground font-medium leading-none">
                        {user?.emailAddresses[0].emailAddress}
                    </p>
                    <div className="flex items-center gap-x-2">
                        <div className="rounded-md bg-secondary p-1">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user?.imageUrl} />
                            </Avatar>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm leading-none">
                                Om{user?.fullName}&apos; Noteify
                            </p>
                        </div>

                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="w-full text-muted-foreground cursor-pointer">
                    <SignOutButton><Button variant="secondary" size="sm" className="w-full">Log Out</Button></SignOutButton>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default UserItems