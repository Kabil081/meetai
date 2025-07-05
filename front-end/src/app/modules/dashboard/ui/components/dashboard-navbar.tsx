'use client';
import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PanelLeftClose, PanelLeftIcon, PanelRightClose } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { SearchIcon } from "lucide-react";
import { DashboardCommand } from "./dashboard-command";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
const DashboardNavbar=()=>{
    const {state,toggleSidebar,open,isMobile}=useSidebar();
    const Router=useRouter();
    const [openCommand, setOpenCommand] = useState(false);
    useEffect(() => {
        const down=(e:KeyboardEvent)=>{
            if(e.key=="k" && (e.metaKey || e.ctrlKey) && !isMobile){
                e.preventDefault();
                setOpenCommand(!openCommand);
            }
        }
        document.addEventListener("keydown", down);
        return () => {
            document.removeEventListener("keydown", down);
        }
    }, []);
    return(
        <>
        <DashboardCommand open={openCommand} setOpen={setOpenCommand}/>
        <nav className="flex items-center px-4 py-3 gap-x-2 border-b bg-background">
            <Button variant="outline" className="size-12 cursor-pointer" onClick={toggleSidebar}>
                {open?<PanelLeftClose className="h-12 w-12"/>:<PanelRightClose className="h-12 w-12"/>}
            </Button>
            <Button className="justify-start text-muted-foreground gap-x-2 h-12 w-[240px] hover:text-muted-foreground" variant="outline" onClick={()=>setOpenCommand(!openCommand)}>
                <SearchIcon />
                Search Agents
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center rounded border bg-muted px-1 text-[10px] text-muted-foreground font-medium font-mono">
                    <span className="text-xs">&#8984;</span>
                    K
                </kbd>
            </Button>
        </nav>
        </>
    )
}
export default DashboardNavbar;