import { CommandDialog,CommandInput } from "@/components/ui/command"
import { CommandItem, CommandList } from "cmdk";
import { Dispatch,SetStateAction } from "react"
interface Props{
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}
export const DashboardCommand = ({open,setOpen}:Props) => {
    return(
        <CommandDialog open={open} onOpenChange={setOpen} className="w-full max-w-2xl">
            <CommandInput placeholder="Search agents..." className="w-full" />
            <CommandList>
                <CommandItem>
                    Test
                </CommandItem>
            </CommandList>
        </CommandDialog>
    )
}