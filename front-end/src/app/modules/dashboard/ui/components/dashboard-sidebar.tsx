'use client';
import {
      Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarInset,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarRail,
    SidebarSeparator,
    SidebarTrigger,
    useSidebar
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { VideoIcon, BotIcon, StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-context-menu";
import { usePathname } from "next/navigation";
import DashboardUserButton from "./dashboard-user-button";
const firstSection=[
    {
        label:"Meetings",
        icon:VideoIcon,
        href:"/meetings"
    },
    {
        label:"Agents",
        icon:BotIcon,
        href:"/agents"
    }
]
const secondSection=[
    {
        label:"Upgrade",
        icon:StarIcon,
        href:"/upgrade"
    }
]
export const DashboardSidebar = () => {
    const pathname="";
    return (
        <Sidebar className="bg-[oklch()]">
            <SidebarHeader className="text-sidebar-accent-foreground">
                <Link href="/" className="flex items-center gap-2 px-2 pt-2">
                    <Image src="/logo.svg" height={36} width={36} alt="Meet.AI"/>
                    <p className="text-2xl font-semibold">Meet.AI</p>
                </Link>
            </SidebarHeader>
            <div className="px=4 py-2">
                <Separator className="opacity-100 text-[#5D6B68]"/>
            </div>
           
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {firstSection.map((item) => (
                                <SidebarMenuItem key={item.href} >
                                    <SidebarMenuButton asChild className={cn(
                                    "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50 ",
                                    pathname===item.href && "bg-linear-to-r/oklch border border-sidebar-accent/50 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50"
                                )}
                                >
                                        <Link href={item.href}>
                                            <item.icon className="h-4 w-4"/>
                                            <span className="ml-2 text-sm font-medium tracking-light">{item.label}</span>  
                                        </Link> 
                                    </SidebarMenuButton>
                             </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondSection.map((item) => (
                                <SidebarMenuItem key={item.href} >
                                    <SidebarMenuButton asChild className={cn(
                                    "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50 ",
                                    pathname===item.href && "bg-linear-to-r/oklch border border-sidebar-accent/50 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50"
                                )}
                                >
                                        <Link href={item.href}>
                                            <item.icon className="h-4 w-4"/>
                                            <span className="ml-2 text-sm font-medium tracking-light">{item.label}</span>  
                                        </Link> 
                                    </SidebarMenuButton>
                             </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <DashboardUserButton/>
            </SidebarFooter>
        </Sidebar>
    );
}