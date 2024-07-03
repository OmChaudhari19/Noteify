"use client"
import Image from "next/image"
import NextLogo from "../../../public/25054.jpg"
import Reading from "../../../public/b_5d063cf0c5521.svg"
const Heroes = () => {
    return (
        <div className=" flex flex-col max-w-4xl items-center justify-center -mt-20">
            <div className="flex items-center">
                <div className="relative w-[100] h-[100]  sm:w-[15000] sm:h-[150] md:w-[200] md:h-[200] ">
                    <Image src={Reading} alt="Image" className="object-contain" />
                </div>
            </div>
        </div>
    )
}
export default Heroes