import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAgentsFilter } from "../../hooks/use-agents-filters";
import { useState } from "react";
export const AgentsFilter=()=>{
    const [Filters,setFilters]=useAgentsFilter();
    return(
        <div className="relative">
            <Input
            placeholder="Filter Agents By Name"
            value={Filters.search}
            className="h-9 pl-7 w-[200px] bg-white"
            onChange={(e)=>setFilters({search:e.target.value})}
            />
            <SearchIcon className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>
    )
}