"use client"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Item } from "./item"
import { cn } from "@/lib/utils"
import { FileIcon } from "lucide-react"

interface DocumentListProps {
    parentDocumentId?: Id<"documents">,
    level?: number,
    data?: Doc<"documents">[],
}
const DocumentList = ({ level = 0, parentDocumentId }: DocumentListProps) => {
    const params = useParams();
    const router = useRouter();
    const [isExpanded, setExpanded] = useState<Record<string, boolean>>({});
    const onExpand = (documentId: string) => {
        setExpanded(prev => ({ ...prev, [documentId]: !prev[documentId] }))
    }
    const documents = useQuery(api.documents.getSidebar, { parentDocument: parentDocumentId, })
    const onRedirect = (documentId: string) => {
        router.push(`/docs/${documentId}`)
    }

    if (documents === undefined) {
        return <>
            <Item.Skeleton level={level} />
            {
                level === 0 && <>
                    <Item.Skeleton level={level} />
                    <Item.Skeleton level={level} />
                </>
            }
        </>
    }
    return (
        <>
            <p className={cn("w-full hidden text-sm font-medium text-muted-foreground/80 ", isExpanded && "last:block", level === 0 && "hidden")} style={{ paddingLeft: level ? `${(level * 12) + 25}px` : undefined }}>No Pages Inside</p >
            {documents.map((it) => {
                return <div>
                    <Item id={it._id}
                        onClick={() => { onRedirect(it._id) }}
                        label={it.title}
                        icon={FileIcon}
                        documentIcon={it.icon}
                        active={params.documentId === it._id}
                        level={level}
                        onExpand={() => onExpand(it._id)}
                        expanded={isExpanded[it._id]} />
                    {isExpanded[it._id] && <DocumentList parentDocumentId={it._id} level={level + 1} />}
                </div>
            })}
        </>
    )
}
export default DocumentList