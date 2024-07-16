"use client"
import React, { useEffect } from "react"
import { cn } from "@/lib/utils";
import { ArchiveIcon, ChevronsLeft, MenuIcon, Plus, PlusCircle, Search, Settings, Trash } from "lucide-react"
import { usePathname } from "next/navigation";
import { useRef, ElementRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import UserItems from "@/app/(main)/_components/userItems"
import { Item } from "./item";
import { toast } from "sonner";
import DocumentList from "./documentList";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import TrashBox from "./trashbox";
const Navigation = () => {
    const pathname = usePathname();
    const isMobile = useMediaQuery('(max-width: 768px)')
    // const documents = useQuery(api.documents.get);
    const create = useMutation(api.documents.create);
    const isResizingRef = useRef(false);
    const sideBarRef =
        useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [isResetting, setisResetting] = useState(false);
    const [isCollapsed, setisCollapsed] = useState(isMobile);

    useEffect(() => {
        if (isMobile) collapse();
        else resetWidth();
    }, [isMobile])


    const handleMouseDown = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.preventDefault();
        event.stopPropagation();
        isResizingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWidth = e.clientX;
        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;
        if (sideBarRef.current && navbarRef.current) {
            sideBarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty("left", `${newWidth}px`);
            navbarRef.current.style.setProperty("width", `calc(100%-${newWidth})px`);

        }
    };

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }

    const resetWidth = () => {
        if (sideBarRef.current && navbarRef.current) {
            setisCollapsed(false);
            setisResetting(true);
            sideBarRef.current.style.width = isMobile ? "100%" : "240px";
            navbarRef.current.style.setProperty("width", isMobile ? "0" : "calc(100%-240px)")
            navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240%");
            setTimeout(() => setisResetting(false), 300);
        }
    }
    const collapse = () => {
        if (sideBarRef.current && navbarRef.current) {
            setisCollapsed(true);
            setisResetting(true);
            sideBarRef.current.style.width = "0";
            navbarRef.current.style.setProperty("width", "100%")
            navbarRef.current.style.setProperty("left", "0");
            setTimeout(() => setisResetting(false), 300);
        }
    }

    const handleCreate = () => {
        const promise = create({ title: "Untitled" });
        toast.promise(promise, {
            loading: "Creating a new Note",
            success: "New note created successfully",
            error: "Error creating a note",
        })
    }
    return (
        <>
            <aside ref={sideBarRef} className={cn("group/sidebar bg-[#c1dedd] dark:dark:bg-[#252424] h-full bg-secondary overflow-y-auto relative flex flex-col w-60 z-[99999]", isResetting && "transition-all ease-in-out duration-300", isMobile && "w-0")}>
                <div role="button" onClick={collapse} className={cn("h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 absolute top-2 right-2 opacity-0 group-hover/sidebar:opacity-100 transition", isMobile && "opacity-100")}>
                    <ChevronsLeft className="h-6 w-6 " />
                </div>
                <div>
                    <UserItems />
                    <Item label="Search" icon={Search} isSearch onClick={() => { }} />
                    <Item label="Settings" icon={Settings} onClick={() => { }} />
                    <Item onClick={handleCreate} label="New Page" icon={PlusCircle} />
                </div>
                <div className="mt-4 overflow-auto">
                    {/* {documents?.map((it) => {
                        return <p key={it._id}>{it.title}</p>
                    })} */}
                    <DocumentList />
                    <Item onClick={handleCreate} label="Add a Page" icon={Plus} />
                    <Popover>
                        <PopoverTrigger className=" w-full mt-4">
                            <Item onClick={() => { }} icon={Trash} label="Trash Box" />
                        </PopoverTrigger>
                        <PopoverContent side={isMobile ? "bottom" : "right"} className="w-72 p-0">
                            <TrashBox />
                        </PopoverContent>
                    </Popover>
                </div>
                {/* <div className="w-full text-muted-foreground font-medium px-4 py-1 flex items-center bg-primary/5  border-neutral-400 rounded-sm ">
                    Trash Box
                    <ArchiveIcon className=" ml-auto h-5 w-5 text-muted-foreground" />
                </div> */}
                <div onMouseDown={handleMouseDown}
                    onClick={resetWidth}
                    className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 right-0 top-0  bg-primary/10" />
            </aside>
            <div ref={navbarRef} className={cn("absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]", isResetting && "transition-all ease-in-out duration-300", isMobile && "left-0 w-full")}>
                <nav className="bg-transparent px-3 py-2 w-full">
                    {isCollapsed && <MenuIcon role="button" onClick={resetWidth} className="h-6 w-6 text-muted-foreground" />}
                </nav>
            </div>
        </>
    )
}
export default Navigation