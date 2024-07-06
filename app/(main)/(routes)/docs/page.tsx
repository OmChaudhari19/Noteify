"use client";

import Image from "next/image";
import emptyFolder from "@/public/EmptyDoc.png"
const DocumentPage = () => {

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4 ">

            <div className="w-full flex flex-col items-center justify-center text-3xl">
                <Image src={emptyFolder} height={500} width={500} alt="xxx" />
                No Notes Found
            </div>

        </div>


    )
}
export default DocumentPage