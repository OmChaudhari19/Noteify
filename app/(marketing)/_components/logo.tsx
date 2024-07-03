import Image from "next/image"
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"],
})

const Logo = () => {
    return (
        <div className=" md:flex items-center gap-x-2 hidden">
            <Image src="/Modified_Logo.png" height={40} width={40} alt="logo" />
            {/* <p className={cn("font-semibold", font.className)}>Noteify</p> */}
        </div>
    )
}
export default Logo