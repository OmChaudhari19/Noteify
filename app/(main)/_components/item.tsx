"use client"

import { Id } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight, LucideIcon, PlusCircleIcon } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

import React from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

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
    const create = useMutation(api.documents.create);
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

