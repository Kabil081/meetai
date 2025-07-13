import Link from "next/link";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
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
} from "@/components/ui/dropdown-menu"
import { ChevronRightIcon,TrashIcon,PencilIcon,MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props{
    agentId:string,
    agentName:string,
    onEdit:()=>void,
    onRemove:()=>void
}
export const AgentIdViewHeader=({agentId,agentName,onEdit,onRemove}:Props)=>{
    return(
        <div className="flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbLink asChild className="font-medium text-xl">
                        <Link href="/agents">
                            My Agents
                        </Link>
                    </BreadcrumbLink>
                    <BreadcrumbSeparator>
                        <ChevronRightIcon/>
                    </BreadcrumbSeparator>
                    <BreadcrumbLink>
                        <Link href={`/agents/${agentId}`}>
                        {agentName}
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbList>
            </Breadcrumb>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger>
                    <MoreVertical/>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                        <Button variant="ghost" onClick={onEdit}>
                            <PencilIcon className="size-4 text-black"/>
                            Edit
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                    <Button variant="ghost" onClick={onRemove}>
                        <TrashIcon className="size-4 text-black"/>
                        Delete
                    </Button>
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}