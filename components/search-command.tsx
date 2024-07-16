"use client"
import { useState,useEffect } from "react"
import {useRouter} from "next/navigation"
import { File } from "lucide-react"
import { useQuery } from "convex/react"
import { useUser } from "@clerk/clerk-react"
import {SearchBox} from "./../hooks/search-bar"
import { CommandDialog,CommandEmpty,CommandInput,CommandItem,CommandList,CommandGroup } from "./ui/command"
import { api } from "@/convex/_generated/api"

export const SearchCommand=()=>{
    return <>
    </>
}