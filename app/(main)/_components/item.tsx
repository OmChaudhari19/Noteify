"use client"

import { Id } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight, TrashIcon, ArchiveIcon, LucideIcon, PlusCircleIcon, MoreHorizontal, User, Trash, Trash2Icon } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

import React from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { DropdownMenu, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/clerk-react"

interface ItemProps {
    id?: Id<"documents">,
    documentIcon?: string,
    active?: boolean,
    expanded?: boolean,
    isSearch?: boolean,
    level?: number,
    onExpand?: () => void,
    label: string,
    onClick: () => void,
    icon: LucideIcon,
}

export const Item = ({ id, documentIcon, active, expanded, isSearch, level = 0, onExpand, label, onClick, icon: Icon }: ItemProps) => {
    const ChevronIcon = expanded ? ChevronDown : ChevronRight
    const { user } = useUser(); const create = useMutation(api.documents.create);
    const archive = useMutation(api.documents.archive);
    const router = useRouter();
    const handleExpand = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        onExpand?.();
    }
    const onCreate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if (!id) return;
        const promise = create({ title: "Untitled", parentDocument: id }).then((docId) => {
            if (!expanded) {
                onExpand?.();
            }
            // router.push(`/docs/${docId}`);
        })
        toast.promise(promise, {
            loading: "Creating New Note...",
            success: "Note created successfully",
            error: "Failed creating a note."
        })

    }
    const handleArchive = (id: Id<"documents">) => {
        const promise = archive({ userId: id });
        toast.promise(promise, {
            loading: "Deleting notes....",
            success: "Note deleted Successfully",
            error: "Failed Deleting the Notes"
        })
    }
    return (
        <div onClick={onClick} role="button" className={cn("group text-muted-foreground min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center font-medium relative", active && "bg-primary/5 text-primary")} style={{ paddingLeft: level ? (`${(level * 12) + 12}px`) : "12px" }}>
            {!!id && (
                <div className="h-full rounded-sm  hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1" role="button" onClick={handleExpand}>
                    <ChevronIcon className="h-4 -w-4 shrink-0 text-muted-foreground/50" />
                </div>
            )}
            {documentIcon ? <div className="shrink-0 mr-2 text-[18px]">
                {documentIcon}
            </div> :
                <Icon className="shrink-0 h-[20px] text-muted-foreground mr-2 " />
            }
            <span className="truncate">
                {label}
            </span>
            {!!id && <div className="ml-auto flex items-center gap-x-2">
                {/* <div role="button" onClick={() => handleArchive(id)} className=" opacity-0 group-hover:opacity-100 ml-auto h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600">
                    <TrashIcon className="h-4 w-4 text-muted-foreground" />
                </div> */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <div role="button" className="opacity-0 group-hover:opacity-100">
                            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className="hover:bg-primary/5 dark:hover:bg-neutral-600">
                            <div role="button" onClick={() => handleArchive(id)} className="w-full flex items-center m-auto ">
                                <div className="font-medium">
                                    Delete
                                </div>
                                <Trash2Icon className="h-4 w-4 ml-auto" />
                            </div>
                        </DropdownMenuItem>
                        {/* <DropdownMenuSeparator /> */}
                        {/* <DropdownMenuItem className="hover:bg-primary/5 dark:hover:bg-neutral-600">
                            <div role="button" className="w-full flex items-center m-auto ">
                                <div className="font-medium">
                                    Delete
                                </div>
                                <TrashIcon className="h-4 w-4 ml-auto" />
                            </div>
                        </DropdownMenuItem> */}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <div className="text-xs text-muted-foreground p-2">Last edited by: Om Chaudhari{user?.fullName}</div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div role="button" onClick={onCreate} className="opacity-0 group-hover:opacity-100 ml-auto h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600">
                    <PlusCircleIcon className="h-4 w-4 text-muted-foreground" />
                </div>
            </div>}
            {isSearch && <kbd className="ml-auto pointer-events-none inline-flex items-center justify-center h-5 select-none gap-1 rounded border bg-muted px-1.5 font-mono text-[10px]  font-medium text-muted-foreground opacity-100">
                <span className="text-xs">ctrl</span>K
            </kbd>}
        </div>
    )
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
    return <div className="flex gap-x-2 py-[3px]" style={{ paddingLeft: level ? (`${(level * 12) + 25}px`) : "12px" }}>
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-[30%]" />
    </div>
}

