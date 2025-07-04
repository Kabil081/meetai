"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardNavbar from "@/app/modules/dashboard/ui/components/dashboard-navbar";
import { DashboardSidebar } from "@/app/modules/dashboard/ui/components/dashboard-sidebar";
import { authClient } from "@/lib/auth-client";
interface Props {
    children: React.ReactNode;  
} 
const Layout=({children}:Props)=>{
    authClient.useSession();
    return(
        <SidebarProvider>
                <DashboardSidebar/>
                <main className="flex flex-col h-screen w-screen bg-muted">
                    <DashboardNavbar/>
                    {children}
                </main>
        </SidebarProvider>
    )
}
export default Layout;