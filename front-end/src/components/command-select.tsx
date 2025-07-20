import { ReactNode,useState } from "react";
import { ChevronDownCircle, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Command,
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandShortcut,
    CommandSeparator,
    CommandResponsiveDialog,
} from "@/components/ui/command";
import {Button} from "@/components/ui/button";
interface Props{
    options:Array<{
        id:string;
        value:string;
        children:ReactNode;
    }>
    onSelect:(value:string)=>void;
    onSearch:(value:string)=>void;
    value?:string;
    placeholder?:string;
    className?:string;
    isSearchable?:boolean;
}
export const CommandSelect=({options,onSearch,onSelect,value,placeholder="select an option",className,isSearchable}:Props)=>{
    const [open,setOpen]=useState(false);
    const selectedOption=options.find((option)=>option.value===value);
    return(
        <>
            <Button
            type="button"
            variant="outline"
            className={cn(
                "h-9 justify-between font-normal px-2",!selectedOption && "text-muted-foreground",className)}
            onClick={()=>setOpen(true)}
            >
                <div>
                    {selectedOption ? selectedOption.children : placeholder}
                </div>
                <ChevronsUpDownIcon/>
            </Button>
            <CommandResponsiveDialog
            shouldFilter={!onSearch}
            open={open}
            onOpenChange={setOpen}
            >
                <CommandInput placeholder="Search..." onValueChange={onSearch}/>  
                <CommandList>
                    <CommandEmpty>
                        <span className="text-muted-foreground text-sm">
                            No options Found.
                        </span>
                    </CommandEmpty>
                    {options.map((option)=>(
                        <CommandItem key={option.id} onSelect={()=>{
                            onSelect(option.value)
                            setOpen(false) 
                        }}>
                            {option.children}
                        </CommandItem>
                    ))}
                </CommandList> 
            </CommandResponsiveDialog>
        </>
    )
}