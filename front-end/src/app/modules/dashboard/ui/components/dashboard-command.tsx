import { CommandResponsiveDialog,CommandInput } from "@/components/ui/command"
import { CommandItem, CommandList } from "cmdk";
import { Dispatch,SetStateAction } from "react"
interface Props{
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}
export const DashboardCommand = ({open,setOpen}:Props) => {
    return(
        <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Search agents..." className="w-full" />
            <CommandList>
                <CommandItem>
                    Test
                </CommandItem>
                <CommandItem>
                    Test2
                </CommandItem>
            </CommandList>
        </CommandResponsiveDialog>
    )
}