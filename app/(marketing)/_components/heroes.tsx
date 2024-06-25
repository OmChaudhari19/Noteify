"use client"
import Image from "next/image"
import NextLogo from "../../../public/next.svg"
const Heroes = () => {
    return (
        <div className="bg-red-500 flex flex-col max-w-5xl items-center justify-center">
            <div className="flex items-center">
                <div className="relative w-[300] h-[300] sm:w-[350] sm:h-[350] md:w-[400] md:h-[400]">
                    <Image src={NextLogo} alt="Image" className="object-contain" />
                </div>
                <div className="relative w-[400] h-[400] hidden md:w-[400] md:block">
                    <Image src={NextLogo} alt="Image" className="object-contain" />
                </div>
            </div>
        </div>
    )
}
export default Heroes