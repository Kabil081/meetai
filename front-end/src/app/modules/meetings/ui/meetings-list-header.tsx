'use client';
import { Button } from "@/components/ui/button";
import { DashboardCommand } from "@/app/modules/dashboard/ui/components/dashboard-command"; 
import { useState } from "react";
import { CirclePlus, XCircle, XCircleIcon } from "lucide-react";
import { NewMeetingsDialog } from "./new-meetings-dialog";
export const MeetingsListHeader=()=>{
    const [isDialogOpen,setIsDialogOpen]=useState(false);
    return(
    <>
        <NewMeetingsDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}/>
        <div className="px-4 py-4 md:px-8 md:py-6 flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
                <h5 className="font-medium text-xlg">My Meetings</h5>
                <Button onClick={()=>setIsDialogOpen(true)}>
                    <CirclePlus/>
                    New Meeting
                </Button>
            </div>
        </div>
    </>
  );
}