"use client"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Id } from "@/convex/_generated/dataModel"
import { toast, Toaster } from "sonner"
import { Spinner } from "@/components/spinner"
import { Input } from "@/components/ui/input"
import { ArchiveRestore, Delete, Search, Trash2Icon } from "lucide-react"
import { cn } from "@/lib/utils"
import { ConfirmDilog } from "@/components/modals/alert-modal"
const TrashBox = () => {
    const router = useRouter();
    const params = useParams();
    const documents = useQuery(api.documents.fetchArchive);
    const restore = useMutation(api.documents.restore);
    const remove = useMutation(api.documents.remove);
    const [search, setSearch] = useState("");
    const filterDocs = documents?.filter((doc) => {
        return doc.title.toLowerCase().includes(search.toLowerCase());
    })

    const onClick = (documentId: string) => {
        router.push(`/docs/${documentId}`);
    }

    const onRestore = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>, documentId: Id<"documents">) => {
        e.preventDefault();
        e.stopPropagation();
        const promise = restore({ id: documentId })
        toast.promise(promise, {
            loading: "Restoring your Notes....",
            success: "Successfully Restored the Notes",
            error: "Something went wrong while restoring...."
        })
    }
    const onRemove = async (documentId: Id<"documents">) => {
        const promise = remove({ id: documentId })
        toast.promise(promise, {
            loading: "Deleting your Notes....",
            success: "Successfully Deleted the Notes",
            error: "Something went wrong while Deleting...."
        })

        if (params.documentId === documentId) {
            router.replace("/docs")
        }
    }

    if (document === undefined) {
        return <div className="h-full flex items-center justify-center p-4">
            <Spinner size="lg" />
        </div>
    }
    return (
        <div className="text-sm">
            <div className="flex items-center gap-x-2 p-2">
                <Search className="h-4 w-4 " />
                <Input value={search} onChange={(e) => { setSearch(e.target.value) }} placeholder="Search your Note" className="h-7 px-2 focus-visible:ring-transparent bg-secondary w-full" />
            </div>
            <div className="mt-2 px-1 pb-1">
                <p className={cn("hidden last:block text-xs text-center text-muted-foreground pb-2")}>
                    No Documents Found
                </p>
                {filterDocs?.map((doc) => {
                    return <div key={doc._id} role="button" onClick={() => onClick(doc._id)}
                        className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center
                    text-primary justify-between">
                        <span className="truncate pl-2">{doc.title}</span>
                        <div className="flex gap-x-2 items-center justify-center">
                            <div className="rounded-sm p-2 hover:bg-neutral-200" role="button" onClick={(e) => onRestore(e, doc._id)}>
                                <ArchiveRestore className="text-muted-foreground h-4 w-4" />
                            </div>
                            <ConfirmDilog onConfirm={() => onRemove(doc._id)}>

                                <div className="rounded-sm p-2 hover:bg-neutral-200" role="button" >
                                    <Trash2Icon className="text-muted-foreground h-4 w-4" />
                                </div>
                            </ConfirmDilog>

                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}
export default TrashBox