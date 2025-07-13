'use client';
import { Button } from "@/components/ui/button";
import { DashboardCommand } from "@/app/modules/dashboard/ui/components/dashboard-command"; 
import { useState } from "react";
import { CirclePlus, XCircle, XCircleIcon } from "lucide-react";
import { NewAgentsDialog } from "./new-agents-dialog";
import {AgentsFilter} from "./agents-search-filters"
import { useAgentsFilter } from "../../hooks/use-agents-filters";
export const AgentsListHeader = () => {
  const [Filters,setFilters]=useAgentsFilter();
  const [open, setOpen] = useState(false);
  const isAgentsModified=!!Filters.search;
  const onClearAgents=()=>{
    setFilters({
      search:"",
      page:1
    })
  }
  return (
    <>
        <NewAgentsDialog open={open} onOpenChange={setOpen}/>
        <div className="px-4 py-4 md:px-8 md:py-6 flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
                <h5 className="font-medium text-xlg">My Agents</h5>
                <Button onClick={()=>setOpen(true)}>
                    <CirclePlus/>
                    New Agent
                </Button>
            </div>
            <div className="flex gap-x-2">
              <AgentsFilter/>
              {isAgentsModified && (<Button variant="outline" size="sm" onClick={onClearAgents}><XCircleIcon/> Clear</Button>)}
            </div>
        </div>
    </>
  );
}