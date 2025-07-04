import { authClient } from "@/lib/auth-client";
import {
    DropdownMenu,
    DropdownMenuPortal,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
      Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar,AvatarImage } from "@/components/ui/avatar";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { auth } from "@/lib/auth";
import { useRouter } from "next/navigation";
const DashboardUserButton=()=>{
    const {data,isPending}=authClient.useSession();
    const router = useRouter();
    const isMobile = useIsMobile();
    if(isPending || !data){
        return null;
    }
    if(isMobile){
        return(
        <Drawer>
            <DrawerTrigger className="rounded-lg border border-border/10 p-3 w-full  flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden gap-x-2" >
                {data.user.image ? (
                    <Avatar className="h-8 w-8">    
                        <AvatarImage src={data.user.image} alt={data.user.name || "User Avatar"} />
                    </Avatar>   
                ) : (
                    <GeneratedAvatar
                    seed={data.user.name}
                    variant="meta"
                    size={32}
                    />
                )}
                <div className="m-5 flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0 gap-x-2">
                    <p className="text-sm truncate w-full">
                        {data.user.name}
                    </p>
                    <p className="text-xs truncate w-full">
                        {data.user.email}  
                    </p>
                </div>
                <ChevronDownIcon className="size-4 shrink-0"/>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{data.user.name}</DrawerTitle>
                    <DrawerDescription>{data.user.email}</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <Button variant="outline" >
                        Billing
                        <CreditCardIcon className="size-4 ml-2"/>
                    </Button>
                    <Button variant="destructive" className="ml-2" onClick={async () => {
                        await authClient.signOut();
                        router.push("/login");
                    }}>
                        Logout
                        <LogOutIcon className="size-4 ml-2"/>   
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
        );
    }
    return(
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
                {data.user.image ? (
                    <Avatar className="h-8 w-8">    
                        <AvatarImage src={data.user.image} alt={data.user.name || "User Avatar"} />
                    </Avatar>   
                ) : (
                    <GeneratedAvatar
                    seed={data.user.name}
                    variant="meta"
                    size={32}
                    />
                )}
                <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
                    <p className="text-sm truncate w-full">
                        {data.user.name}
                    </p>
                    <p className="text-xs truncate w-full">
                        {data.user.email}  
                    </p>
                </div>
                <ChevronDownIcon className="size-4 shrink-0"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="right" className="w-72 S">
                <DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                        <span>{data.user.name}</span>
                        <span>{data.user.email}</span>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem
                
                    className="cursor-pointer">
                       Billing
                    <CreditCardIcon className="size-4"/>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={async () => {
                        await authClient.signOut();
                        router.push("/login");
                    }}
                >
                       Logout
                    <LogOutIcon className="size-4"/>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default DashboardUserButton;