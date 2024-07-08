"use client";
import { useUser } from "@clerk/clerk-react";
import Image from "next/image";
import { toast } from "sonner"
import emptyFolder from "@/public/EmptyDoc.png"
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
const DocumentPage = () => {
    const { user, } = useUser();
    const create = useMutation(api.documents.create);

    const CreateNote = async () => {
        const promise = create({ title: "Untitled" });
        toast.promise(promise, {
            loading: "Creating new Note....",
            success: "Succesfully created a new note",
            error: "Failed to create a note"
        });
    }
    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4 ">


            <Image src={emptyFolder} height={500} width={500} alt="xxx" />

            <p className="text-3xl font-medium">Welcome to Om{user?.fullName}&apos;s Noteify </p>
            <Button onClick={CreateNote}><PlusCircle className="w-4 h-4 mr-2" /> Create a Note</Button>
        </div>



    )
}
export default DocumentPage